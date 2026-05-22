# 04. Переменные окружения

Переменные окружения хранятся в файле `.env.local` в корне проекта. Этот файл **нельзя коммитить** в git — он содержит секреты. Файл уже добавлен в `.gitignore`.

Шаблон для создания: `.env.example`

---

## Пример .env.local (без реальных секретов)

```env
# Домен сайта
NEXT_PUBLIC_SITE_URL=https://teeon.ru

# Яндекс.Метрика
NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678

# Администратор
ADMIN_USERNAME=admin
ADMIN_PASSWORD=замените_на_надёжный_пароль
ADMIN_SESSION_SECRET=замените_на_случайную_строку_32_символа

# Режим отправки заявок
LEAD_EMAIL_MODE=smtp

# SMTP-сервер
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=замените_на_пароль_приложения
SMTP_SECURE=false

# Адреса для заявок
LEAD_TO_EMAIL=manager@teeon.ru
LEAD_FROM_EMAIL=noreply@teeon.ru

# MinIO / S3 (хранилище изображений)
S3_ENDPOINT=http://127.0.0.1:9000
S3_REGION=us-east-1
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=замените_на_реальный_ключ
S3_BUCKET=teeon-images
NEXT_PUBLIC_S3_PUBLIC_URL=http://127.0.0.1:9000/teeon-images
```

---

## Описание каждой переменной

### NEXT_PUBLIC_SITE_URL
**Обязательна.** Домен сайта. Используется в sitemap.xml, canonical-ссылках и Open Graph.

```
NEXT_PUBLIC_SITE_URL=https://teeon.ru
```

Для локальной разработки:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> Переменные с префиксом `NEXT_PUBLIC_` доступны в браузере. Не помещайте в них секреты.

---

### NEXT_PUBLIC_YANDEX_METRIKA_ID
ID счётчика Яндекс.Метрики. Создаётся на metrika.yandex.ru. Если пусто — счётчик не подключается.

```
NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678
```

---

### ADMIN_USERNAME
Логин для входа в административную часть сайта (`/admin/login/`).

```
ADMIN_USERNAME=admin
```

---

### ADMIN_PASSWORD
Пароль для входа в административную часть. Используйте надёжный пароль (минимум 16 символов, разные регистры, цифры, символы).

```
ADMIN_PASSWORD=замените_на_надёжный_пароль
```

> **Никогда не записывайте реальный пароль в документацию, README или код.**

---

### ADMIN_SESSION_SECRET
Секретный ключ для подписи cookie-сессии администратора. Должен быть случайной строкой длиной не менее 32 символов.

Как сгенерировать:
```bash
openssl rand -base64 32
```

```
ADMIN_SESSION_SECRET=замените_на_результат_команды_openssl
```

> **Если этот секрет утечёт — злоумышленник сможет подделать сессию. Храните его только в `.env.local` и на сервере в защищённых переменных окружения.**

---

### LEAD_EMAIL_MODE
Режим отправки заявок с формы. Три значения:

| Значение | Поведение |
|---|---|
| `dev` (по умолчанию) | Сохраняет заявки в `.tmp/request-submissions/` (JSON-файлы). Отправка по email не происходит. |
| `ethereal` | Отправляет на тестовый сервис Ethereal Email. В ответе API возвращается `previewUrl` — ссылка для просмотра письма в браузере. |
| `smtp` | Отправляет через реальный SMTP-сервер. Требует заполненных SMTP-переменных. |

```
LEAD_EMAIL_MODE=dev
```

---

### SMTP_HOST
Адрес SMTP-сервера. Заполнять при `LEAD_EMAIL_MODE=smtp`.

```
SMTP_HOST=smtp.gmail.com
```

---

### SMTP_PORT
Порт SMTP. Обычно 587 (STARTTLS) или 465 (SSL).

```
SMTP_PORT=587
```

---

### SMTP_USER
Логин (email-адрес) для авторизации на SMTP-сервере.

```
SMTP_USER=your-email@gmail.com
```

---

### SMTP_PASS
Пароль для SMTP. Для Gmail используйте «пароль приложения», а не основной пароль аккаунта.

```
SMTP_PASS=замените_на_пароль_приложения
```

> **Не вставляйте реальный пароль в документацию или README.**

---

### SMTP_SECURE
`true` — использовать SSL (порт 465). `false` — использовать STARTTLS (порт 587).

```
SMTP_SECURE=false
```

---

### LEAD_TO_EMAIL
Email-адрес, на который приходят заявки с сайта. Заполнять при `LEAD_EMAIL_MODE=smtp`.

```
LEAD_TO_EMAIL=manager@teeon.ru
```

---

### LEAD_FROM_EMAIL
Email-адрес отправителя (в поле «От кого» в письме). Заполнять при `LEAD_EMAIL_MODE=smtp`.

```
LEAD_FROM_EMAIL=noreply@teeon.ru
```

---

### S3_ENDPOINT
URL S3-совместимого хранилища. Для MinIO локально — `http://127.0.0.1:9000`.

```
S3_ENDPOINT=http://127.0.0.1:9000
```

---

### S3_REGION
Регион S3. Для MinIO — `us-east-1` (любое значение).

```
S3_REGION=us-east-1
```

---

### S3_ACCESS_KEY / S3_SECRET_KEY
Ключи доступа к S3/MinIO.

```
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=замените_на_реальный_ключ
```

---

### S3_BUCKET
Имя бакета в S3/MinIO. Должен быть создан заранее с публичным доступом на чтение.

```
S3_BUCKET=teeon-images
```

---

### NEXT_PUBLIC_S3_PUBLIC_URL
Публичный URL бакета — используется для формирования ссылок на загруженные изображения.

```
NEXT_PUBLIC_S3_PUBLIC_URL=http://127.0.0.1:9000/teeon-images
```

---

## Правила безопасности

1. Файл `.env.local` **никогда не коммитить** в git
2. Реальные пароли и секреты **не писать** в README, документацию или комментарии к коду
3. На production-сервере переменные задаются через панель управления хостинга, а не через файл
4. Если секрет утёк (попал в git, в переписку) — немедленно сгенерировать новый и заменить
5. `ADMIN_SESSION_SECRET` нельзя менять без сброса всех активных сессий (администраторы разлогинятся)
