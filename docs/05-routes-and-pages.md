# 05. Карта страниц сайта

## Публичные страницы

### Главная
| URL | Файл | Описание |
|---|---|---|
| `/` | `app/page.tsx` | Главная: Hero, преимущества, каталог, брендирование, шаги, портфолио, клиенты, FAQ, форма |

### Каталог
| URL | Файл | Описание |
|---|---|---|
| `/catalog/` | `app/catalog/page.tsx` | Обзор всех 8 категорий |
| `/catalog/futbolki/` | `app/catalog/futbolki/page.tsx` | Футболки с логотипом |
| `/catalog/hudi/` | `app/catalog/hudi/page.tsx` | Худи на заказ |
| `/catalog/svitshoty/` | `app/catalog/svitshoty/page.tsx` | Свитшоты |
| `/catalog/longslivy/` | `app/catalog/longslivy/page.tsx` | Лонгсливы |
| `/catalog/sumki/` | `app/catalog/sumki/page.tsx` | Сумки и шопперы |
| `/catalog/zhiletki/` | `app/catalog/zhiletki/page.tsx` | Жилетки |
| `/catalog/kurtki/` | `app/catalog/kurtki/page.tsx` | Куртки |
| `/catalog/dozhdeviki/` | `app/catalog/dozhdeviki/page.tsx` | Дождевики |

### Брендирование
| URL | Файл | Описание |
|---|---|---|
| `/branding/` | `app/branding/page.tsx` | Обзор всех 9 методов брендирования |
| `/branding/vyshivka/` | `app/branding/vyshivka/page.tsx` | Машинная вышивка |
| `/branding/shevrony/` | `app/branding/shevrony/page.tsx` | Шевроны (нашивки) |
| `/branding/shelkografiya/` | `app/branding/shelkografiya/page.tsx` | Шелкография |
| `/branding/dtf-pechat/` | `app/branding/dtf-pechat/page.tsx` | DTF-печать |
| `/branding/dtg-pechat/` | `app/branding/dtg-pechat/page.tsx` | DTG-печать |
| `/branding/sublimaciya/` | `app/branding/sublimaciya/page.tsx` | Сублимационная печать |
| `/branding/tisnenie/` | `app/branding/tisnenie/page.tsx` | Тиснение |
| `/branding/gravirovka/` | `app/branding/gravirovka/page.tsx` | Гравировка |
| `/branding/birki/` | `app/branding/birki/page.tsx` | Брендированные бирки |

### Портфолио
| URL | Файл | Описание |
|---|---|---|
| `/portfolio/` | `app/portfolio/page.tsx` | Список 9 кейсов |
| `/portfolio/[slug]/` | `app/portfolio/[slug]/page.tsx` | Динамическая страница кейса |

Все slug'и кейсов определены в `lib/portfolio.ts`. Страницы генерируются статически через `generateStaticParams`.

### Остальные разделы
| URL | Файл | Описание |
|---|---|---|
| `/about/` | `app/about/page.tsx` | О компании: производство, команда, факты |
| `/contacts/` | `app/contacts/page.tsx` | Контакты, форма заявки |
| `/suvenirnaya-produkciya/` | `app/suvenirnaya-produkciya/page.tsx` | Направление сувенирной продукции, ссылка на upgifts.ru |
| `/privacy/` | `app/privacy/page.tsx` | Политика обработки персональных данных |
| `/requisites/` | `app/requisites/page.tsx` | Реквизиты компании |

---

## Служебные и системные страницы

### Системные
| URL | Файл | Описание |
|---|---|---|
| `/sitemap.xml` | `app/sitemap.ts` | Динамический sitemap, генерируется Next.js |
| `/robots.txt` | `app/robots.ts` | Правила для роботов |
| `/404` | `app/not-found.tsx` | Страница «Страница не найдена» |

### Административная часть (не индексируется)
| URL | Файл | Описание |
|---|---|---|
| `/admin/login/` | `app/admin/login/page.tsx` | Страница входа в административную часть |
| `/admin/catalog-editor/` | `app/admin/catalog-editor/page.tsx` | Редактор каталога, изображений |

### API-эндпоинты (не страницы)
| URL | Метод | Описание |
|---|---|---|
| `/api/request` | `POST` | Приём заявок с формы, отправка email |
| `/api/admin/login` | `POST` | Авторизация в административную часть |
| `/api/admin/logout` | `POST` | Выход (сброс cookie) |
| `/api/admin/upload` | `POST` | Загрузка изображения в MinIO/S3 |
| `/api/admin/images` | `GET` | Список изображений в MinIO/S3 |
| `/api/admin/images` | `DELETE` | Удаление изображения из MinIO/S3 |

---

## Что находится в sitemap, что нет

### В sitemap.xml
- `/` — главная
- `/catalog/` и все 8 категорий
- `/branding/` и все 9 методов
- `/portfolio/` и все динамические страницы кейсов
- `/about/`
- `/contacts/`
- `/suvenirnaya-produkciya/`
- `/privacy/`
- `/requisites/`

### НЕ в sitemap
- `/admin/*` — защищённая административная часть
- `/api/*` — API-эндпоинты
- `robots.txt` блокирует `/admin/` и `/api/admin/`

---

## Страницы с noindex

Следующие страницы имеют `robots: { index: false }` и не должны индексироваться:
- `/admin/login/`
- `/admin/catalog-editor/`

---

## Приоритеты в sitemap

| Приоритет | Страницы |
|---|---|
| 1.0 | Главная `/` |
| 0.9 | `/catalog/`, `/branding/`, `/portfolio/` |
| 0.8 | Все страницы категорий каталога и брендирования, `/suvenirnaya-produkciya/` |
| 0.7 | Страницы кейсов портфолио, `/about/`, `/contacts/` |
| 0.3 | `/privacy/`, `/requisites/` |
