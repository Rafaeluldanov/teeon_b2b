# Статус документации

**Дата создания:** 19.05.2026  
**Создано:** 18 документов + этот файл  
**Язык:** Русский  
**Секреты:** Не раскрыты (ADMIN_PASSWORD, ADMIN_SESSION_SECRET, SMTP_PASS — только названия переменных)

---

## Список созданных документов

| Файл | Статус | Актуальность |
|---|---|---|
| `README.md` | ✅ Создан | Актуален |
| `01-project-overview.md` | ✅ Создан | Актуален |
| `02-tech-stack-and-structure.md` | ✅ Создан | Актуален |
| `03-installation-and-local-run.md` | ✅ Создан | Актуален |
| `04-environment-variables.md` | ✅ Создан | Актуален |
| `05-routes-and-pages.md` | ✅ Создан | Актуален |
| `06-header-footer-navigation.md` | ✅ Создан | Актуален |
| `07-catalog-and-product-models.md` | ✅ Создан | Актуален |
| `08-branding-section.md` | ✅ Создан | Актуален |
| `09-admin-guide.md` | ✅ Создан | Актуален |
| `10-request-form-and-leads.md` | ✅ Создан | Актуален |
| `11-seo-and-yandex.md` | ✅ Создан | Актуален |
| `12-qa-and-testing.md` | ✅ Создан | Актуален |
| `13-media-content-guide.md` | ✅ Создан | Актуален |
| `14-deployment-guide.md` | ✅ Создан | Актуален |
| `15-troubleshooting.md` | ✅ Создан | Актуален |
| `16-publication-checklist.md` | ✅ Создан | Актуален |
| `17-handover-summary.md` | ✅ Создан | Актуален |

---

## Что потребует обновления

### После подключения production CMS/backend

| Документ | Что обновить |
|---|---|
| `07-catalog-and-product-models.md` | Добавить инструкцию по работе с новой CMS |
| `09-admin-guide.md` | Описать новый admin-интерфейс с серверным хранением |
| `13-media-content-guide.md` | Обновить инструкции по загрузке фото через CMS |
| `17-handover-summary.md` | Обновить статус после замены заглушек |

### После деплоя на production

| Документ | Что обновить |
|---|---|
| `03-installation-and-local-run.md` | Добавить production URL |
| `05-routes-and-pages.md` | Заменить `localhost` на реальный домен в примерах |
| `14-deployment-guide.md` | Добавить конкретные настройки выбранного хостинга |

### После замены заглушек

| Документ | Что обновить |
|---|---|
| `01-project-overview.md` | Убрать пункты из раздела «Заглушки» |
| `16-publication-checklist.md` | Отметить выполненные пункты |
| `17-handover-summary.md` | Обновить таблицу статуса |

---

## Заглушки в проекте (актуальные на 19.05.2026)

| Заглушка | Файл | Статус |
|---|---|---|
| Телефон +7 (999) 000-00-00 | `lib/contacts.ts` | ⏳ Требует замены |
| Email info@teeon.ru | `lib/contacts.ts` | ⏳ Проверить |
| Telegram @teeon_merch | `lib/contacts.ts` | ⏳ Требует замены |
| Адрес производства | `lib/contacts.ts` | ⏳ Требует замены |
| ИНН, ОГРН | `lib/contacts.ts` | ⏳ Требует замены |
| Политика ПД | `app/privacy/page.tsx` | ⏳ Требует замены |
| OG-изображение | `public/og-default.svg` | ⏳ Требует замены |
| Видео Hero | `public/videos/` | ⏳ Требует добавления |
| Фото товаров | `lib/productOptions.ts` | ⏳ Требует добавления |
| Фото кейсов | `lib/portfolio.ts` | ⏳ Требует добавления |
| Карта в контактах | `app/contacts/page.tsx` | ⏳ Требует добавления |
| Логотипы клиентов | `components/Clients/Clients.tsx` | ⏳ Требует замены |

---

## Команды, запущенные при создании документации

```bash
npm run lint    # ✅ 0 ошибок
npm run build   # ✅ Успешно, все страницы собраны
```

---

## Примечания

- Документация в папке `docs/` не влияет на сборку и тесты
- Файлы `*.md` не включены в sitemap автоматически
- В документации намеренно не указаны реальные пароли и секреты
- MinIO-бинарник (`./minio`) находится в корне проекта
