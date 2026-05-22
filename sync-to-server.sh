#!/usr/bin/env bash
# Запускать на ЛОКАЛЬНОЙ машине (Linux/macOS).
# Копирует указанный проект на удалённый сервер через rsync поверх SSH.
# Исключения берутся из .gitignore проекта.

set -euo pipefail

# ============ НАСТРОЙКИ — ПРАВЬ ЗДЕСЬ ============
# Папка на локальной машине, ОТКУДА копируем (полный путь):
SRC="/Users/stanislav/path/to/project"

# Куда копируем:
SSH_HOST="ivan@185.225.34.60"
SSH_PORT="22"
DEST_DIR="/home/ivan/teeon"
# =================================================

# --- Проверки ---
if [[ ! -d "$SRC" ]]; then
  echo "Ошибка: исходная папка не найдена: $SRC" >&2
  exit 1
fi

PROJECT_NAME="$(basename "$(realpath "$SRC")")"

# --- Фильтры исключений ---
FILTER_ARGS=()
if [[ -f "$SRC/.gitignore" ]]; then
  FILTER_ARGS+=(--filter=":- .gitignore")
fi
FILTER_ARGS+=(
  --exclude=".git/"
  --exclude=".DS_Store"
  --exclude="*.swp"
)

# --- Создаём папку назначения на сервере ---
ssh -p "$SSH_PORT" "$SSH_HOST" "mkdir -p '$DEST_DIR/$PROJECT_NAME'"

# --- Синхронизация ---
rsync -avzh --progress \
  -e "ssh -p $SSH_PORT" \
  "${FILTER_ARGS[@]}" \
  "$SRC"/ "$SSH_HOST:$DEST_DIR/$PROJECT_NAME/"

echo
echo "Готово: $SRC  ->  $SSH_HOST:$DEST_DIR/$PROJECT_NAME/"
