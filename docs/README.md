# Документация TEEON B2B

Сайт производственной компании TEEON — пошив промо-одежды, корпоративного мерча и брендированных изделий под ключ.

---

## Для кого эта документация

| Роль | Что читать в первую очередь |
|---|---|
| **Владелец** | [01-project-overview](01-project-overview.md) · [16-publication-checklist](16-publication-checklist.md) · [17-handover-summary](17-handover-summary.md) |
| **Разработчик** | [02-tech-stack-and-structure](02-tech-stack-and-structure.md) · [03-installation-and-local-run](03-installation-and-local-run.md) · [04-environment-variables](04-environment-variables.md) |
| **Контент-менеджер** | [07-catalog-and-product-models](07-catalog-and-product-models.md) · [08-branding-section](08-branding-section.md) · [13-media-content-guide](13-media-content-guide.md) |
| **Команда поддержки** | [09-admin-guide](09-admin-guide.md) · [10-request-form-and-leads](10-request-form-and-leads.md) · [15-troubleshooting](15-troubleshooting.md) |

---

## Список документов

| Файл | Содержание |
|---|---|
| [01-project-overview.md](01-project-overview.md) | Что за сайт, что готово, что заглушки |
| [02-tech-stack-and-structure.md](02-tech-stack-and-structure.md) | Стек, структура папок, где что лежит |
| [03-installation-and-local-run.md](03-installation-and-local-run.md) | Установка, запуск, все команды |
| [04-environment-variables.md](04-environment-variables.md) | Все переменные окружения с описанием |
| [05-routes-and-pages.md](05-routes-and-pages.md) | Карта всех страниц сайта |
| [06-header-footer-navigation.md](06-header-footer-navigation.md) | Header, Footer, навигация |
| [07-catalog-and-product-models.md](07-catalog-and-product-models.md) | Каталог, модели, варианты, характеристики |
| [08-branding-section.md](08-branding-section.md) | Технологии брендирования |
| [09-admin-guide.md](09-admin-guide.md) | Как пользоваться админкой |
| [10-request-form-and-leads.md](10-request-form-and-leads.md) | Форма заявки, отправка, SMTP |
| [11-seo-and-yandex.md](11-seo-and-yandex.md) | SEO, sitemap, JSON-LD, Яндекс |
| [12-qa-and-testing.md](12-qa-and-testing.md) | Тесты, QA, чек-листы |
| [13-media-content-guide.md](13-media-content-guide.md) | Фото, видео, медиаконтент |
| [14-deployment-guide.md](14-deployment-guide.md) | Деплой на сервер |
| [15-troubleshooting.md](15-troubleshooting.md) | Типичные ошибки и решения |
| [16-publication-checklist.md](16-publication-checklist.md) | Чек-лист перед публикацией |
| [17-handover-summary.md](17-handover-summary.md) | Краткая памятка для передачи проекта |
| [DOCUMENTATION_STATUS.md](DOCUMENTATION_STATUS.md) | Статус документации |

---

## Быстрые ссылки

### Запуск локально
```bash
npm install
npm run dev        # http://localhost:3000
```

### Админка
- Страница входа: `http://localhost:3000/admin/login/`
- Редактор: `http://localhost:3000/admin/catalog-editor/`
- Логин/пароль — из `.env.local` (`ADMIN_USERNAME` / `ADMIN_PASSWORD`)

### Основные команды
```bash
npm run dev        # Запуск в режиме разработки
npm run build      # Production-сборка
npm run lint       # Проверка ESLint
npm run test:form  # Тест формы заявки
npm run test:e2e   # E2E-тесты (Playwright)
npm run seo:audit  # SEO-аудит (нужен запущенный сервер)
```

### Где что менять
- Контакты → `lib/contacts.ts`
- Категории каталога → `lib/catalog.ts`
- Методы брендирования → `lib/branding.ts`
- Портфолио → `lib/portfolio.ts`
- SEO и домен → `lib/seo.ts` + `.env.local`
- Переменные окружения → `.env.local` (не коммитить!)
