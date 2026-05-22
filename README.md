# TEEON B2B — Сайт производственной компании

> **Документация:** [docs/README.md](docs/README.md) — полная документация для владельца, разработчика и контент-менеджера.

Next.js 14.2.5 · React 18 · TypeScript · App Router · CSS Modules

## Запуск проекта

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint check
```

## Переменные окружения

Создайте файл `.env.local` в корне проекта:

```env
# Домен сайта — замените перед публикацией
NEXT_PUBLIC_SITE_URL=https://teeon.ru

# ID счётчика Яндекс.Метрики — заполните после создания счётчика на metrika.yandex.ru
NEXT_PUBLIC_YANDEX_METRIKA_ID=
```

## Структура проекта

```
app/
  layout.tsx             — корневой layout, metadata, JsonLd, YandexMetrika
  page.tsx               — главная страница
  sitemap.ts             — динамический sitemap.xml
  robots.ts              — robots.txt
  catalog/               — 8 страниц категорий каталога
  branding/              — 9 страниц способов брендирования
  portfolio/             — список кейсов + [slug] динамические страницы
  about/                 — страница «О компании»
  contacts/              — контакты + форма заявки
  privacy/               — политика обработки ПД (заглушка)
  requisites/            — реквизиты компании (заглушка)
  suvenirnaya-produkciya/ — внутренняя страница направления «Сувенирная продукция»
                            ведёт в каталог UP Gifts (https://upgifts.ru/)

components/              — все UI-компоненты
lib/
  catalog.ts             — данные 8 категорий каталога
  branding.ts            — данные 9 методов брендирования
  portfolio.ts           — данные 9 портфельных кейсов
  contacts.ts            — контактная информация
  company.ts             — данные о компании
  gifts.ts               — данные раздела «Сувенирная продукция» и ссылка на UP Gifts
  seo.ts                 — siteConfig (URL, title, description, OG-image)
  schema.ts              — функции генерации JSON-LD схем
```

## Заглушки, которые нужно заменить перед публикацией

| Что                        | Где                              | Что сделать                                     |
|---------------------------|----------------------------------|-------------------------------------------------|
| Телефон                   | `lib/contacts.ts`                | Заменить `+7 (999) 000-00-00` на реальный       |
| Email                     | `lib/contacts.ts`                | Проверить `info@teeon.ru`                       |
| Адрес производства        | `lib/contacts.ts` → `address`    | Указать реальный адрес                          |
| Telegram                  | `lib/contacts.ts` → `telegram`   | Указать реальный `@username`                    |
| Юридические реквизиты     | `lib/contacts.ts` → `legalInfo`  | ИНН, ОГРН, расчётный счёт, банк                |
| Политика ПД               | `app/privacy/page.tsx`           | Заменить шаблон на юридически проверенный текст |
| OG-изображение            | `public/og-default.svg`          | Заменить на реальный баннер 1200×630            |
| Фото продукции            | компоненты каталога              | Добавить `<Image>` вместо placeholder-div       |
| Фото кейсов               | компоненты портфолио             | Добавить реальные фотографии кейсов             |
| Карта в контактах         | `app/contacts/page.tsx`          | Встроить Яндекс.Карты или другую карту          |
| URL UP Gifts              | `lib/gifts.ts` → `externalUrl`   | Сейчас `https://upgifts.ru/` — скорректировать при необходимости |
| Яндекс.Метрика            | `.env.local`                     | Добавить `NEXT_PUBLIC_YANDEX_METRIKA_ID`        |
| Домен                     | `.env.local`                     | Добавить `NEXT_PUBLIC_SITE_URL`                 |

## Как заменить видео в Hero

1. Положить файл видео: `public/videos/hero-production.mp4`
2. Положить постер: `public/images/hero-poster.jpg`
3. Проверить сборку: `npm run build`

> Не использовать чужие видео и фотографии без прав.

## Как добавить изображения образцов

### Для каталога
- Путь: `public/images/catalog/<slug>/<filename>.jpg`
- Например: `public/images/catalog/futbolki/oversize.jpg`
- Затем прописать `imageSrc` в `lib/catalogSamples.ts`

### Для брендирования
- Путь: `public/images/branding/<slug>/<filename>.jpg`
- Например: `public/images/branding/vyshivka/3d-cap.jpg`
- Затем прописать `imageSrc` в `lib/brandingSamples.ts`

## Редактирование характеристик товаров

- Основные данные о вариантах изделий: `lib/productOptions.ts`
- Вкладки образцов каталога: `lib/catalogSamples.ts`
- Варианты нанесения брендирования: `lib/brandingSamples.ts`
- Прототип визуального редактора: `/admin/catalog-editor/`

### Прототип редактора
Доступен по адресу `/admin/catalog-editor/` (не в Header/Footer/sitemap). Позволяет:
- просматривать и редактировать характеристики вариантов изделий;
- сохранять изменения в `localStorage` браузера;
- экспортировать JSON для ручного переноса в `lib/productOptions.ts`;
- импортировать JSON из внешнего источника.

**Ограничение:** изменения сохраняются только в браузере и не публикуются автоматически. Страница имеет `robots: noindex` и отсутствует в sitemap.

### Для настоящей admin-панели нужно
- CMS (Strapi, Sanity, Contentful) или кастомный backend с авторизацией;
- хранение характеристик в базе данных;
- загрузка фотографий изделий через UI;
- управление цветами, материалами и SEO-данными;
- синхронизация с публичным сайтом без ручного деплоя.

## Защищённая админка

Административная часть закрыта логином и паролем через Next.js Middleware и httpOnly-куки.

- Редактор каталога: `/admin/catalog-editor/`
- Страница входа: `/admin/login/`
- Страницы `/admin/*` имеют `robots: noindex` и не индексируются

### Настройка доступа

Создайте `.env.local` в корне проекта и заполните:

```env
ADMIN_USERNAME=ваш_логин
ADMIN_PASSWORD=ваш_пароль
ADMIN_SESSION_SECRET=ваш_32_символьный_секрет
```

Сгенерировать секрет: `openssl rand -base64 32`

**Важно:** `.env.local` нельзя коммитить в репозиторий.

### Выход из админки

На странице `/admin/catalog-editor/` есть кнопка «Выйти» в верхней панели.

### Ограничения текущей реализации

Текущий редактор сохраняет изменения только в `localStorage` браузера и не публикует их автоматически.  
Для production-admin-панели нужна CMS/backend/база данных с постоянным хранением данных.

## Структура моделей и вариантов изделий

### lib/productOptions.ts

Файл содержит полные данные по 8 категориям (futbolki, hudi, svitshoty, longslivy, sumki, zhiletki, kurtki, dozhdeviki).

**Структура данных:**
```
ProductOptionsMap = Record<categorySlug, ProductModelGroup[]>

ProductModelGroup {
  categorySlug, modelId, modelTitle, modelDescription
  options: ProductOption[]
}

ProductOption {
  id, title, shortDescription, imageLabel, imageSrc?
  materialOptions: string[]
  densityOptions: string[]       // [] для сумок, жилеток, курток, дождевиков
  colorOptions: ProductColor[]   // { name, hex }
  sizeOptions: string[]
  brandingOptions: string[]
  printPositions: string[]
  quantityOptions: string[]
  priceFactors: string[]
  characteristics: string[]      // 3–5 характеристик
  useCases: string[]             // 3–4 сценария применения
}
```

**Правило для densityOptions:** всегда дискретные значения (`'180 г/м²'`), никогда не диапазоны (`'160–180 г/м²'`). Для сумок, жилеток, курток, дождевиков — пустой массив `[]`.

### Компонент ProductModelExplorer

`components/ProductModelExplorer/ProductModelExplorer.tsx` — заменяет оба компонента CatalogSampleTabs и ProductConfigurator на страницах категорий каталога.

**Возможности:**
- Вкладки по группам моделей
- Карточки вариантов с плейсхолдерами изображений
- Панель конфигурации: материал, плотность, цвет (свотчи), размеры, тираж, брендирование, расположение логотипа, комментарий
- Мультипозиционная корзина расчёта (`teeon_quote_items` в localStorage)
- Счётчик добавленных позиций с переходом к форме
- Читает admin-переопределения из `teeon_admin_product_options`

**Данные передаются в форму заявки** при переходе по `/#request` — RequestForm автоматически заполняет поле «Комментарий» всеми выбранными позициями.

### Как добавить фотографии изделий

1. Положить фото: `public/images/catalog/<slug>/<variant-id>.jpg` (рекомендуется 400×300 px)
2. Прописать в `lib/productOptions.ts` для нужного варианта:
   ```ts
   imageSrc: '/images/catalog/futbolki/basic-160.jpg',
   ```
3. Запустить `npm run build` для проверки

### Редактор каталога — новые возможности

Страница `/admin/catalog-editor/` теперь поддерживает:
- **Добавление модели** — кнопка «+ Добавить модель» в сайдбаре
- **Удаление модели** — кнопка «Удалить модель» в основной панели
- **Добавление варианта** — кнопка «+ Добавить вариант» в сайдбаре
- **Удаление варианта** — кнопка «Удалить вариант» в основной панели
- **Редактор цветов** — визуальные свотчи с полями `hex` и `name`, добавление/удаление цветов
- Редактирование полей `characteristics` и `useCases`
- Редактирование `modelTitle` и `modelDescription` прямо в панели

## Документация

Полная документация находится в папке [`docs/`](docs/):

| Документ | Содержание |
|---|---|
| [docs/README.md](docs/README.md) | Навигация по документации |
| [docs/01-project-overview.md](docs/01-project-overview.md) | Обзор проекта, заглушки |
| [docs/03-installation-and-local-run.md](docs/03-installation-and-local-run.md) | Установка и запуск |
| [docs/04-environment-variables.md](docs/04-environment-variables.md) | Все переменные окружения |
| [docs/09-admin-guide.md](docs/09-admin-guide.md) | Руководство по админке |
| [docs/14-deployment-guide.md](docs/14-deployment-guide.md) | Деплой на сервер |
| [docs/16-publication-checklist.md](docs/16-publication-checklist.md) | Чек-лист перед публикацией |

---

> ⚠️ **Безопасность:** файл `.env.local` содержит секреты (пароли, API-ключи). Никогда не коммитьте его в git. Не записывайте реальные пароли в README, документацию или код.

---

## Ключевые страницы

- `/` — главная
- `/catalog/` — каталог (футболки, худи, свитшоты, лонгсливы, сумки, жилетки, куртки, дождевики)
- `/branding/` — брендирование (вышивка, шевроны, шелкография, DTF, DTG, сублимация, тиснение, гравировка, бирки)
- `/portfolio/` — кейсы (9 реализованных проектов)
- `/about/` — о компании
- `/contacts/` — контакты и форма заявки
- `/privacy/` — политика обработки персональных данных
- `/requisites/` — реквизиты компании
- `/suvenirnaya-produkciya/` — внутренняя страница сувенирного направления (ведёт на upgifts.ru)
