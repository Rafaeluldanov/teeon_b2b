# 02. Технический стек и структура проекта

## Стек технологий

| Технология | Версия | Роль |
|---|---|---|
| **Next.js** | 14.2.5 | Фреймворк, App Router, SSG/SSR, API Routes |
| **React** | 18 | UI-компоненты |
| **TypeScript** | 5 | Типизация |
| **CSS Modules** | — | Стили компонентов (изолированные классы) |
| **Node.js** | 20+ | Среда выполнения |
| **nodemailer** | 8 | Отправка писем с заявками |
| **@aws-sdk/client-s3** | — | S3-совместимое хранилище изображений (MinIO) |
| **Playwright** | 1.60+ | E2E-тестирование |

---

## App Router

Проект использует Next.js **App Router** (папка `app/`). Каждая папка — отдельный маршрут. Файл `page.tsx` внутри папки = страница. Файл `route.ts` = API-эндпоинт.

Особенности:
- Server Components по умолчанию (без `'use client'` = серверный компонент)
- `'use client'` добавляется только там, где нужен React state или браузерные API
- `layout.tsx` — общий шаблон для группы страниц
- `metadata` экспортируется из каждой страницы для SEO

---

## Структура папок

```
Teeon B2b/
├── app/                    ← Страницы и API (Next.js App Router)
│   ├── layout.tsx          ← Корневой layout (Header, Footer, JsonLd, YandexMetrika)
│   ├── page.tsx            ← Главная страница
│   ├── globals.css         ← Глобальные стили
│   ├── sitemap.ts          ← Динамический sitemap.xml
│   ├── robots.ts           ← robots.txt
│   ├── not-found.tsx       ← Страница 404
│   ├── catalog/            ← Каталог: /catalog/ + 8 категорий
│   ├── branding/           ← Брендирование: /branding/ + 9 методов
│   ├── portfolio/          ← Портфолио: /portfolio/ + [slug]
│   ├── about/              ← /about/
│   ├── contacts/           ← /contacts/
│   ├── privacy/            ← /privacy/
│   ├── requisites/         ← /requisites/
│   ├── suvenirnaya-produkciya/ ← /suvenirnaya-produkciya/
│   ├── admin/              ← Защищённая административная часть
│   │   ├── login/          ← /admin/login/
│   │   └── catalog-editor/ ← /admin/catalog-editor/
│   └── api/                ← API-маршруты
│       ├── request/        ← POST /api/request (форма заявки)
│       └── admin/          ← POST /api/admin/login, /logout, /upload, /images
│
├── components/             ← Все UI-компоненты
│   ├── Header/             ← Шапка сайта с навигацией
│   ├── Footer/             ← Подвал
│   ├── Hero/               ← Главный баннер
│   ├── Advantages/         ← Блок преимуществ
│   ├── About/              ← Блок «О нас»
│   ├── CatalogSection/     ← Секция каталога на главной
│   ├── BrandingSection/    ← Секция брендирования на главной
│   ├── WorkSteps/          ← Блок «Как мы работаем»
│   ├── Portfolio/          ← Портфолио на главной
│   ├── Clients/            ← Логотипы клиентов
│   ├── FAQ/                ← Аккордеон вопросов и ответов
│   ├── SeoText/            ← SEO-текст внизу главной
│   ├── RequestForm/        ← Форма заявки
│   ├── CategoryPageContent/   ← Контент страницы категории каталога
│   ├── BrandingPageContent/   ← Контент страницы брендирования
│   ├── ProductModelExplorer/  ← Конфигуратор изделий (вкладки + настройки)
│   ├── ModelVariantBlock/     ← Блок варианта модели с кнопкой расчёта
│   ├── PortfolioCasePage/     ← Страница отдельного кейса
│   ├── AboutPage/          ← Страница «О компании»
│   ├── StubPage/           ← Заглушка страницы (для privacy/requisites)
│   ├── AdminCatalogEditor/ ← Редактор каталога в админке
│   ├── AdminImageUploader/ ← Загрузчик изображений в MinIO/S3
│   ├── JsonLd/             ← Компонент JSON-LD разметки
│   └── YandexMetrika/      ← Счётчик Яндекс.Метрики
│
├── lib/                    ← Данные и утилиты
│   ├── catalog.ts          ← 8 категорий каталога (описания, SEO, задачи)
│   ├── branding.ts         ← 9 методов брендирования
│   ├── portfolio.ts        ← 9 кейсов портфолио
│   ├── productOptions.ts   ← Модели и варианты изделий (материалы, цвета, плотности)
│   ├── catalogModels.ts    ← Структурированные данные моделей для конфигуратора
│   ├── catalogSamples.ts   ← Образцы для вкладок каталога
│   ├── brandingSamples.ts  ← Образцы работ брендирования
│   ├── contacts.ts         ← Контактная информация (телефон, email, адрес, реквизиты)
│   ├── company.ts          ← Данные о компании (факты, цифры)
│   ├── gifts.ts            ← Данные раздела «Сувенирная продукция»
│   ├── seo.ts              ← siteConfig (URL, title, description)
│   ├── schema.ts           ← Генераторы JSON-LD схем
│   ├── mail.ts             ← Отправка email с заявками (nodemailer)
│   ├── storage.ts          ← S3/MinIO клиент (загрузка изображений)
│   └── adminAuth.ts        ← Аутентификация администратора (HMAC-SHA256)
│
├── public/                 ← Статические файлы
│   ├── images/
│   │   ├── catalog/        ← Фото товаров по категориям
│   │   ├── branding/       ← Фото работ брендирования
│   │   └── hero/           ← Изображения для Hero
│   ├── videos/             ← Видео для Hero (hero-production.mp4)
│   └── og-default.svg      ← OG-изображение по умолчанию
│
├── scripts/                ← Вспомогательные скрипты
│   ├── seo-audit.mjs       ← SEO-аудит (26 страниц)
│   └── test-request-form.mjs ← Тест формы заявки (3 сценария)
│
├── tests/                  ← E2E-тесты
│   └── e2e/
│       ├── forms.spec.ts       ← Тесты форм
│       ├── navigation.spec.ts  ← Тесты навигации
│       ├── product-selection.spec.ts ← Тесты конфигуратора
│       └── seo.spec.ts         ← SEO-тесты
│
├── docs/                   ← Документация проекта (этот раздел)
├── middleware.ts            ← Защита /admin/* маршрутов
├── next.config.mjs         ← Конфигурация Next.js
├── playwright.config.ts    ← Конфигурация E2E-тестов
├── tsconfig.json           ← Конфигурация TypeScript
├── .env.example            ← Шаблон переменных окружения
├── .env.local              ← Локальные переменные (не коммитить!)
├── QA_REPORT.md            ← Отчёт QA-проверки
└── SEO_AUDIT_REPORT.md     ← Отчёт SEO-аудита
```

---

## Где находятся данные

| Данные | Файл |
|---|---|
| Категории каталога (названия, описания, SEO) | `lib/catalog.ts` |
| Модели и варианты изделий (материалы, цвета, плотности) | `lib/productOptions.ts` |
| Структурированные модели конфигуратора | `lib/catalogModels.ts` |
| Образцы вкладок каталога | `lib/catalogSamples.ts` |
| Методы брендирования | `lib/branding.ts` |
| Образцы работ брендирования | `lib/brandingSamples.ts` |
| Кейсы портфолио | `lib/portfolio.ts` |
| Контакты, реквизиты | `lib/contacts.ts` |
| Данные о компании | `lib/company.ts` |
| Сувенирная продукция | `lib/gifts.ts` |
| SEO-конфиг, домен | `lib/seo.ts` |
| JSON-LD схемы | `lib/schema.ts` |

---

## Стили

- Глобальные стили (переменные, утилиты, базовые классы) — `app/globals.css`
- Стили каждого компонента — рядом с компонентом: `ComponentName/ComponentName.module.css`
- CSS Modules обеспечивают изоляцию стилей (классы не конфликтуют между компонентами)
- Цвет бренда: `#E8571A` (оранжевый акцент)
- Основной тёмный: `#0f172a`

---

## Тесты и отчёты

| Файл | Описание |
|---|---|
| `tests/e2e/forms.spec.ts` | Тесты отправки форм, honeypot, загрузки файлов |
| `tests/e2e/navigation.spec.ts` | Тесты навигации Header и переходов |
| `tests/e2e/product-selection.spec.ts` | Тесты конфигуратора и корзины расчёта |
| `tests/e2e/seo.spec.ts` | Тесты H1, meta, JSON-LD, sitemap, robots, noindex |
| `QA_REPORT.md` | Полный отчёт последней QA-проверки |
| `SEO_AUDIT_REPORT.md` | Полный отчёт SEO-аудита |
