# 13. Медиа и контент

## Видео в секции Hero

### Как заменить

1. Подготовить видео формата MP4 (кодек H.264)
2. Скопировать в: `public/videos/hero-production.mp4`
3. Подготовить постер (изображение первого кадра или кастомное): `public/images/hero-poster.jpg` или `public/images/hero/hero-poster.jpg`
4. В компоненте `components/Hero/Hero.tsx` проверить пути:
   ```tsx
   <video poster="/images/hero-poster.jpg">
     <source src="/videos/hero-production.mp4" type="video/mp4" />
   </video>
   ```
5. Проверить: `npm run build`

### Технические требования к видео

- Формат: MP4 (H.264)
- Длительность: 10–30 секунд (видео зациклено)
- Разрешение: 1920×1080 или 1280×720
- Размер: не более 10 МБ (для быстрой загрузки)
- Содержание: производственный процесс (пошив, нанесение, готовая продукция)
- Видео должно работать без звука (атрибут `muted`)

> **Не использовать стоковые видео и чужие материалы без права использования в коммерческих целях.**

---

## Фотографии товаров (каталог)

> **Важно:** изображение добавляется **только к варианту модели**, не к категории и не к модели в целом. Это позволяет показывать разные фото при переключении вариантов на публичной странице.

### Через админку (рекомендуется)

1. Откройте `/admin/catalog-editor/` → вкладка «Каталог».
2. Выберите категорию → модель → вариант («Редактировать»).
3. В поле **«Изображение варианта»** загрузите файл или вставьте URL.
4. Нажмите **«Сохранить вариант»** → **«Сохранить изменения»** (модель).
5. Файл сохранится в `public/uploads/catalog/`.

### Через код (production)

Добавьте `image` в нужный вариант в `lib/catalogModels.ts`:

```ts
variants: [
  {
    id: 'var-basic',
    name: 'Standard 160 г/м²',
    image: '/uploads/catalog/basic-160.jpg',  // ← поле варианта
    ...
  }
]
```

**Категория (`CategoryModels`) и модель (`CatalogModel`) не имеют поля изображения в UI.** `coverImage` у модели — deprecated optional, существует только для обратной совместимости.

### Куда класть файлы (ручная загрузка)
```
public/uploads/catalog/<filename>.jpg
```

### Технические требования

- Формат: JPEG (рекомендуется) или WebP
- Размер: 800×600 px или 400×300 px
- Соотношение сторон: 4:3
- Фон: белый или светло-серый (нейтральный)
- Качество JPEG: 80–85%
- Максимум: 10 МБ на файл

### Технические требования

- Формат: JPEG (рекомендуется) или WebP
- Размер: 800×600 px или 400×300 px
- Соотношение сторон: 4:3
- Фон: белый или светло-серый (нейтральный)
- Качество JPEG: 80–85%

---

## Фотографии брендирования (варианты нанесения)

Подробности — в [08-branding-section.md → Изображения вариантов нанесения](./08-branding-section.md#изображения-вариантов-нанесения) и в выделенном разделе ниже («Изображения вариантов нанесения (branding samples)»).

### Куда класть
```
public/branding-samples/<method-slug>/<file>.webp
```

Примеры:
```
public/branding-samples/vyshivka/vyshivka-cap.webp
public/branding-samples/shelkografiya/silk-classic.webp
public/branding-samples/dtf-pechat/dtf-fullcolor.webp
```

### Как прописать

В `lib/brandingSamples.ts` уже описаны 46 вариантов; для 39 из них прописан `imageSrc` и файл лежит на диске. Если добавляешь новый вариант — структура такая (тип `BrandingSample`):

```ts
{
  title: '3D-вышивка с подъёмом',
  description: '…',
  imageLabel: '3D-вышивка с подъёмом',
  imageSrc: '/branding-samples/vyshivka/vyshivka-3d.webp', // опционально
  effect: '…',
  bestFor: ['…'],
  materials: ['…'],
  limitations: ['…'],
  relatedProducts: ['hudi'],
}
```

Источник и лицензию каждого добавленного файла записываем в [docs/BRANDING_IMAGE_SOURCES.md](./BRANDING_IMAGE_SOURCES.md) и [public/branding-samples/sources.json](../public/branding-samples/sources.json).

---

## Фотографии портфолио

Структура и данные кейсов — в `lib/portfolio.ts`.

Для каждого кейса можно добавить изображения. Расположение:
```
public/images/portfolio/<slug>/<filename>.jpg
```

Пример:
```
public/images/portfolio/uniforma-restoran-brio/main.jpg
public/images/portfolio/uniforma-restoran-brio/detail-1.jpg
```

Прописать в данных кейса в `lib/portfolio.ts`.

---

## Фотографии в секции «О нас»

Компонент `components/About/About.tsx` содержит 3 placeholder-фото:
- «📷 Швейный цех»
- «📷 Оборудование для брендирования»
- «📷 Готовая партия»

После добавления реальных фото — заменить `img-placeholder` div'ы на компонент `<Image>` от Next.js:
```tsx
import Image from 'next/image';

<Image
  src="/images/hero/production-workshop.jpg"
  alt="Швейный цех TEEON"
  width={600}
  height={400}
/>
```

---

## Загрузка через MinIO (через админку)

Изображения можно загружать напрямую через административную часть:

1. Открыть `/admin/catalog-editor/` → таб «Изображения»
2. Выбрать папку (Каталог / Брендирование / Hero / Портфолио)
3. Перетащить файл в зону загрузки или кликнуть
4. После загрузки скопировать URL через кнопку «📋 URL»
5. Вставить URL в соответствующий файл данных (`lib/productOptions.ts`, `lib/catalogModels.ts` и др.)

При переходе на production S3 — изменить переменные `S3_ENDPOINT` и `NEXT_PUBLIC_S3_PUBLIC_URL`.

---

## OG-изображение

Файл: `public/og-default.svg`

Текущее состояние: заглушка (SVG-плейсхолдер).

Что нужно сделать:
- Создать изображение 1200×630 px с логотипом и описанием компании
- Сохранить как `/public/og-default.png` или `/public/og-default.jpg`
- Обновить путь в `lib/seo.ts`: `ogImage: '/og-default.png'`

OG-изображение используется при шеринге сайта в соцсетях и мессенджерах.

---

## Favicon

Файл: `public/favicon.ico` (если есть)

Если favicon ещё не добавлен:
1. Создать иконку в форматах: `favicon.ico` (16×16, 32×32), `apple-touch-icon.png` (180×180)
2. Разместить в `public/`
3. При необходимости добавить в `app/layout.tsx` через `metadata.icons`

---

## Фотографии портфолио

### Через админку (рекомендуется)

1. Откройте `/admin/catalog-editor/` → вкладка «Портфолио».
2. Выберите нужный кейс.
3. Загрузите **главное изображение** (cover) — появится в карточке на `/portfolio/` и в верхней части страницы кейса.
4. Добавьте **галерею** — несколько фото, которые показываются внутри страницы кейса.
5. Добавьте **изделия в заказе** с фото каждого изделия.
6. Нажмите **«Сохранить кейс»**.

Файлы сохраняются в `public/uploads/portfolio/`.

### Через код (production)

Расширьте тип в `lib/portfolio.ts`:
```ts
export const portfolioCases: PortfolioCase[] = [
  {
    slug: 'hudi-futbolki-komanda',
    // ... существующие поля
    coverImage: '/uploads/portfolio/hudi-cover.jpg',     // ← главное фото
    galleryImages: [                                      // ← галерея
      '/uploads/portfolio/hudi-01.jpg',
      '/uploads/portfolio/hudi-02.jpg',
    ],
  },
]
```

### localStorage-ключ: `teeon_admin_portfolio_cases`

Все изменения из вкладки «Портфолио» в админке сохраняются в `localStorage` под ключом `teeon_admin_portfolio_cases`. Публичные страницы читают этот ключ на клиенте.

---

## Правила использования контента

1. Используйте только **собственные фото и видео** или материалы с лицензией, разрешающей коммерческое использование
2. Стоковые фото с Shutterstock, Getty Images и аналогов — только при наличии лицензии
3. Фото из интернета без источника — **запрещено** (нарушение авторских прав)
4. Видео с YouTube / Vimeo — только с разрешения автора

---

## Рекомендации по именованию файлов

- Только латинские буквы, цифры, дефисы: `basic-white-160.jpg`
- Без пробелов, кириллицы, спецсимволов
- Понятные описательные имена: `hoodie-oversize-black.jpg`
- Строчные буквы
- Без транслитерации кириллицы: `kurtka.jpg` → `jacket-bomber.jpg`

---

## Что заменить перед публикацией

| Заглушка | Действие |
|---|---|
| `public/videos/hero-production.mp4` | Добавить реальное видео производства |
| `public/images/hero-poster.jpg` | Добавить постер видео |
| Фото товаров в каталоге | Заменить placeholder-div на реальные `<Image>` |
| Фото кейсов в портфолио | Добавить реальные фото проектов |
| Фото производства в «О нас» | 3 фото: цех, оборудование, готовая партия |
| `public/og-default.svg` | Реальный баннер 1200×630 px |

---

## Изображения вариантов нанесения (branding samples)

Отдельная категория медиа — фото для раздела `/branding/<method>/`. Подробности в [08-branding-section.md](./08-branding-section.md#изображения-вариантов-нанесения).

| Где лежит | Откуда подгружается | Что делать |
|---|---|---|
| `public/branding-samples/<method>/*.webp` | Путь захардкожен в `lib/brandingSamples.ts` (`imageSrc`) | Положить файл с именем из [BRANDING_IMAGE_TODO.md](./BRANDING_IMAGE_TODO.md) |
| `public/uploads/branding/*` | Подставляется через `/api/admin/upload` из админки | Загрузить через `/admin/catalog-editor/` → «Нанесение» |

**Состояние на 2026-05-25:** 39 из 46 фото загружены (все Unsplash License), 7 ждут собственной съёмки TEEON.
**Полный список и статус по каждому файлу:** [BRANDING_IMAGE_TODO.md](./BRANDING_IMAGE_TODO.md) (что осталось) и [BRANDING_IMAGE_SOURCES.md](./BRANDING_IMAGE_SOURCES.md) (что уже есть).

⚠ Все изображения должны храниться локально (`public/`), hotlink на внешние CDN запрещён. Перед добавлением — убедиться, что лицензия источника допускает коммерческое использование (Unsplash, Pexels, Pixabay, Wikimedia CC0–CC-BY, собственные фото). Запрещено: случайные картинки из Google, превью со стоков с водяными знаками, фото с чужими логотипами, фото конкурентов.
