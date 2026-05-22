# 14. Деплой на сервер

## Подготовка перед деплоем

### Обязательно перед первым деплоем

1. Заменить все заглушки в `lib/contacts.ts` (телефон, адрес, реквизиты)
2. Заполнить `app/privacy/page.tsx` — реальный текст политики ПД
3. Добавить реальные фото и видео (хотя бы минимальный набор)
4. Настроить SMTP для получения заявок
5. Создать счётчик в Яндекс.Метрике

### Переменные окружения для production

На сервере необходимо задать все переменные из `.env.local` через панель управления хостинга (не через файл, если это облачный хостинг вроде Vercel/Render).

**Обязательные:**
```
NEXT_PUBLIC_SITE_URL=https://teeon.ru
ADMIN_USERNAME=<ваш_логин>
ADMIN_PASSWORD=<надёжный_пароль>
ADMIN_SESSION_SECRET=<сгенерировать_openssl_rand_-base64_32>
LEAD_EMAIL_MODE=smtp
SMTP_HOST=<smtp-сервер>
SMTP_PORT=587
SMTP_USER=<email>
SMTP_PASS=<пароль>
SMTP_SECURE=false
LEAD_TO_EMAIL=<куда_приходят_заявки>
LEAD_FROM_EMAIL=<от_кого>
```

**При наличии Яндекс.Метрики:**
```
NEXT_PUBLIC_YANDEX_METRIKA_ID=<id>
```

**При наличии S3/MinIO в облаке:**
```
S3_ENDPOINT=https://<s3-endpoint>
S3_REGION=<region>
S3_ACCESS_KEY=<key>
S3_SECRET_KEY=<secret>
S3_BUCKET=teeon-images
NEXT_PUBLIC_S3_PUBLIC_URL=https://<public-url>
```

---

## Команды деплоя

### Стандартный деплой на VPS/выделенный сервер

```bash
# 1. Получить исходный код
git pull origin main   # или загрузить архив

# 2. Установить зависимости
npm install

# 3. Проверить код
npm run lint

# 4. Собрать production-сборку
npm run build

# 5. Запустить
npm run start
```

`npm run start` запускает Next.js production-сервер на порту 3000. Обычно его ставят за nginx/Apache как reverse proxy.

### Пример конфигурации nginx

```nginx
server {
    listen 80;
    server_name teeon.ru www.teeon.ru;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name teeon.ru www.teeon.ru;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Деплой на Vercel (рекомендуется для простоты)

1. Загрузить проект в GitHub-репозиторий
2. Подключить репозиторий к Vercel (vercel.com)
3. В настройках проекта на Vercel добавить все переменные окружения
4. Vercel автоматически запустит `npm run build` и задеплоит

---

## Что проверить после деплоя

### Технические проверки

```bash
# Проверить sitemap
curl https://teeon.ru/sitemap.xml

# Проверить robots.txt
curl https://teeon.ru/robots.txt

# Проверить HTTP-статус главной
curl -I https://teeon.ru/
```

### Проверки в браузере

- [ ] Главная страница открывается по HTTPS
- [ ] Нет ошибок в консоли браузера
- [ ] Header и Footer отображаются корректно
- [ ] Форма заявки отправляется (проверить на реальной почте)
- [ ] Файл прикрепляется к заявке
- [ ] Админка открывается по адресу `https://teeon.ru/admin/login/`
- [ ] Вход в админку работает с production-кредами

### SEO-проверки

- [ ] `https://teeon.ru/sitemap.xml` — открывается, содержит все URL с правильным доменом
- [ ] `https://teeon.ru/robots.txt` — закрывает `/admin/` и `/api/admin/`
- [ ] Яндекс.Метрика: открыть сайт, убедиться что посещение фиксируется
- [ ] Добавить сайт в Яндекс.Вебмастере, добавить sitemap

### Проверка SMTP

Отправить тестовую заявку с формы и убедиться, что письмо пришло на `LEAD_TO_EMAIL`.

---

## Обновление сайта

После изменений в коде (редактирование текстов, добавление фото):

```bash
npm run build
npm run start   # или перезапустить pm2/systemd-сервис
```

При использовании Vercel — просто сделать push в git, деплой происходит автоматически.

---

## Что заменить перед публикацией (итоговый список)

| Параметр | Что сделать |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Заменить на реальный домен |
| SMTP-настройки | Настроить реальный SMTP |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | Добавить ID счётчика |
| `ADMIN_PASSWORD` | Сменить на надёжный пароль |
| `ADMIN_SESSION_SECRET` | Сгенерировать новый: `openssl rand -base64 32` |
| Контакты в `lib/contacts.ts` | Телефон, email, адрес, Telegram, WhatsApp |
| Реквизиты в `lib/contacts.ts` | ИНН, ОГРН, юридическое название |
| Политика ПД `app/privacy/page.tsx` | Реальный юридически проверенный текст |
| OG-изображение | Реальный баннер 1200×630 px |
| Видео Hero | `public/videos/hero-production.mp4` |
| Фото товаров | В `lib/productOptions.ts` / `lib/catalogModels.ts` |
| Фото портфолио | Реальные фото кейсов |
| Карта в `/contacts/` | Встроить Яндекс.Карты |

---

## Хранение секретов

Никогда не хранить секреты (пароли, API-ключи) в:
- Git-репозитории (даже в приватном)
- README или документации
- Комментариях к коду
- Чатах и переписке без шифрования

На production-сервере секреты хранятся в:
- Переменных окружения (через панель хостинга)
- Защищённых секретах CI/CD (GitHub Secrets, Vercel Environment Variables)
- Файлах `.env` только на изолированном сервере с ограниченным доступом
