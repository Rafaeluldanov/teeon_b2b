# 03. Установка и локальный запуск

## Требования

- **Node.js** версии 20 или выше
- **npm** (устанавливается вместе с Node.js)
- Файл `.env.local` в корне проекта (создайте из `.env.example`)

Проверить установленную версию:
```bash
node -v    # должно быть v20.x.x или выше
npm -v     # должно быть 9.x.x или выше
```

Скачать Node.js: https://nodejs.org/en (кнопка «LTS»)

---

## Первый запуск

### 1. Установить зависимости
```bash
npm install
```

Выполнять один раз после клонирования репозитория и каждый раз после изменения `package.json`.

### 2. Создать файл переменных окружения
```bash
cp .env.example .env.local
```

Затем открыть `.env.local` и заполнить нужные значения. Минимум для локальной работы:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_USERNAME=ваш_логин
ADMIN_PASSWORD=ваш_пароль
ADMIN_SESSION_SECRET=сгенерировать_командой_openssl_rand_-base64_32
LEAD_EMAIL_MODE=dev
```

### 3. Запустить в режиме разработки
```bash
npm run dev
```

Сайт доступен: **http://localhost:3000**  
Админка: **http://localhost:3000/admin/login/**

---

## Все команды

| Команда | Что делает |
|---|---|
| `npm run dev` | Запуск сервера разработки с hot-reload |
| `npm run build` | Production-сборка (проверяет типы и компилирует) |
| `npm run start` | Запуск production-сборки (только после `npm run build`) |
| `npm run lint` | Проверка кода через ESLint |
| `npm run test:form` | Тест API формы заявки (3 сценария) |
| `npm run test:e2e` | E2E-тесты через Playwright (152 теста) |
| `npm run seo:audit` | SEO-аудит 26 страниц (нужен запущенный сервер) |
| `npm run qa` | Полная проверка: lint + build + seo:audit + test:form |

---

## Описание команд

### npm run dev
Запускает Next.js в режиме разработки. Изменения в файлах применяются автоматически без перезапуска. Это основная команда для разработки.

### npm run build
Компилирует проект для production. Проверяет TypeScript-типы, ESLint-правила и собирает все страницы. Если сборка упала — проект содержит ошибки, которые нужно исправить до деплоя.

### npm run lint
Запускает ESLint — проверяет качество и стиль кода. Должен проходить без ошибок и предупреждений.

### npm run test:form
Тестирует API-эндпоинт формы заявки (`/api/request`) без браузера:
- Тест 1: отправка корректных данных
- Тест 2: отправка с прикреплённым файлом
- Тест 3: отправка в режиме Ethereal Email (получение previewUrl)

Требует запущенного `npm run dev`.

### npm run test:e2e
Запускает E2E-тесты через Playwright (браузерное тестирование). Тестирует навигацию, формы, SEO, конфигуратор, защиту админки.

Требует запущенного `npm run dev`.

### npm run seo:audit
Проверяет 26 страниц на наличие title, description, H1, canonical, OG-тегов, JSON-LD. Сохраняет результат в `SEO_AUDIT_REPORT.md`.

Требует запущенного сервера.

---

## Локальные ссылки

> Работают только при запущенном `npm run dev`

- Главная: http://localhost:3000
- Каталог: http://localhost:3000/catalog/
- Брендирование: http://localhost:3000/branding/
- Портфолио: http://localhost:3000/portfolio/
- Контакты: http://localhost:3000/contacts/
- Вход в админку: http://localhost:3000/admin/login/
- Редактор каталога: http://localhost:3000/admin/catalog-editor/

---

## Частые проблемы при запуске

### «missing required error components» или «Application error»

Устаревший кэш сборки. Решение:
```bash
rm -rf .next
npm run dev
```

### «Cannot find module './948.js'» или подобные ошибки модулей

```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Порт 3000 уже занят

```bash
# Найти и завершить процесс на порту 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

### admin variables not configured

В `.env.local` не заданы `ADMIN_USERNAME`, `ADMIN_PASSWORD` или `ADMIN_SESSION_SECRET`. Добавьте все три переменные и перезапустите сервер.

---

## MinIO (хранилище изображений)

Для работы загрузки изображений в админке нужен запущенный MinIO-сервер. Бинарник MinIO находится в корне проекта (`./minio`).

Запуск:
```bash
MINIO_ROOT_USER=minioadmin MINIO_ROOT_PASSWORD=minioadmin \
./minio server ~/minio-data --console-address ":9001"
```

Консоль MinIO: http://localhost:9001 (minioadmin / minioadmin)

Переменные MinIO в `.env.local`:
```env
S3_ENDPOINT=http://127.0.0.1:9000
S3_REGION=us-east-1
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=teeon-images
NEXT_PUBLIC_S3_PUBLIC_URL=http://127.0.0.1:9000/teeon-images
```
