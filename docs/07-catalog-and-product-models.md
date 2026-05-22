# 07. Каталог и модели товаров

## Общая структура данных каталога

Каталог построен на трёх уровнях:

```
Категория (8 штук)
  └── Модель (несколько в каждой категории)
        └── Вариант (несколько в каждой модели)
              ├── Материалы
              ├── Плотности
              ├── Цвета
              ├── Размеры
              ├── Брендирование
              └── Характеристики
```

---

## Файлы данных каталога

| Файл | Содержание |
|---|---|
| `lib/catalog.ts` | Основные данные категорий: название, SEO, описание, задачи, доступные методы брендирования |
| `lib/productOptions.ts` | Варианты изделий: материалы, плотности, цвета, размеры, брендирование (используется конфигуратором) |
| `lib/catalogModels.ts` | Структурированные модели: slug, название, варианты (используется компонентом `ModelVariantBlock`) |
| `lib/catalogSamples.ts` | Образцы для вкладок-карточек на страницах категорий |

---

## lib/catalog.ts — категории

8 категорий: `futbolki`, `hudi`, `svitshoty`, `longslivy`, `sumki`, `zhiletki`, `kurtki`, `dozhdeviki`

Структура каждой категории:
```ts
{
  slug: 'futbolki',
  name: 'Футболки',
  nameGenitive: 'футболок',
  h1: 'Футболки с логотипом на заказ',
  shortDesc: '...',   // Для карточки на главной
  pageDesc: '...',    // Для страницы категории
  tasks: ['...'],     // Задачи/сценарии применения
  branding: [{ name, slug }],  // Доступные методы нанесения
  customizable: ['...'],       // Что можно настроить
  pricingNote: '...',
  productExamples: [{ name, fabric, color }],
  related: ['hudi', ...],      // Связанные категории
  seo: { title, description }  // SEO-мета для страницы
}
```

---

## lib/productOptions.ts — конфигуратор

Содержит данные для конфигуратора изделий. Структура:

```
ProductOptionsMap = {
  futbolki: ProductModelGroup[],
  hudi: ProductModelGroup[],
  ...
}

ProductModelGroup {
  categorySlug: string
  modelId: string
  modelTitle: string         // Название модели (например, «Базовая»)
  modelDescription: string
  options: ProductOption[]   // Варианты этой модели
}

ProductOption {
  id: string
  title: string              // Название варианта
  shortDescription: string
  imageLabel: string         // Текст заглушки (пока нет фото)
  imageSrc?: string          // Путь к фото: '/images/catalog/futbolki/basic.jpg'
  materialOptions: string[]  // ['100% хлопок', 'Пике', 'Смеска 80/20']
  densityOptions: string[]   // ['160 г/м²', '180 г/м²'] — только дискретные значения!
  colorOptions: ProductColor[] // [{ name: 'Белый', hex: '#ffffff' }]
  sizeOptions: string[]      // ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  brandingOptions: string[]
  printPositions: string[]
  quantityOptions: string[]
  priceFactors: string[]
  characteristics: string[]  // 3–5 ключевых характеристик
  useCases: string[]         // 3–4 сценария применения
}
```

### Важное правило — densityOptions

**Всегда дискретные значения, никогда не диапазоны:**
```ts
// ✅ Правильно:
densityOptions: ['160 г/м²', '180 г/м²', '200 г/м²']

// ❌ Неправильно:
densityOptions: ['160–180 г/м²', '180–200 г/м²']
```

**Для сумок, жилеток, курток, дождевиков — пустой массив:**
```ts
densityOptions: []
```

---

## lib/catalogModels.ts — модели конфигуратора

Используется компонентом `ModelVariantBlock`. Структура:

```
CatalogModelsMap = {
  futbolki: {
    categoryName: 'Футболки',
    models: CatalogModel[]
  },
  ...
}

CatalogModel {
  id, slug, name, shortDescription
  suitableFor: string[]
  brandingOptions: string[]
  configurableOptions: string[]
  features: string[]
  variants: ModelVariant[]
  sortOrder: number
  isActive: boolean
}

ModelVariant {
  id, name, subtitle?, description
  image?: string           // Путь к фото варианта
  features: string[]
  suitableFor: string[]
  colorOptions: ColorOption[]
  materialOptions: string[]
  densityOptions: string[]
  sizeOptions: string[]
  brandingOptions: string[]
  placements: string[]
  configurableOptions: string[]
  sortOrder: number
  isActive: boolean
}
```

---

## Как добавить новую модель

### Через файл данных (рекомендуется для постоянных изменений)

1. Открыть `lib/productOptions.ts`
2. Найти нужную категорию (например, `futbolki`)
3. Добавить в массив новый объект `ProductModelGroup`:
```ts
{
  categorySlug: 'futbolki',
  modelId: 'premium-polo',           // Уникальный ID
  modelTitle: 'Поло Премиум',
  modelDescription: 'Рубашка-поло...',
  options: [
    {
      id: 'polo-pique-200',
      title: 'Пике 200 г/м²',
      shortDescription: '...',
      imageLabel: 'Фото будет добавлено',
      materialOptions: ['100% хлопок-пике'],
      densityOptions: ['200 г/м²', '220 г/м²'],
      colorOptions: [{ name: 'Белый', hex: '#ffffff' }, { name: 'Чёрный', hex: '#000000' }],
      sizeOptions: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      brandingOptions: ['Вышивка', 'DTF-печать'],
      printPositions: ['Грудь слева', 'Спина'],
      quantityOptions: ['до 50 изделий', '50–100 изделий', '100–300 изделий'],
      characteristics: ['Ткань-пике', 'Воротник-поло', 'Планка с пуговицами'],
      useCases: ['Форма персонала', 'Корпоративный стиль'],
      priceFactors: ['Ткань', 'Тираж', 'Нанесение'],
    }
  ]
}
```
4. Сохранить файл
5. Проверить: `npm run build`

### Через админку (временное сохранение в браузере)

1. Открыть `/admin/catalog-editor/`
2. Вкладка «Характеристики» или «Модели и варианты»
3. Выбрать категорию → нажать «+ Добавить модель»
4. Заполнить поля
5. Нажать «Сохранить в браузере»

> Изменения через админку сохраняются только в localStorage текущего браузера и не публикуются для всех пользователей. Для постоянных изменений — редактировать файлы напрямую.

---

## Как добавить вариант к модели

1. В `lib/productOptions.ts` найти нужную `ProductModelGroup`
2. Добавить новый объект в массив `options`
3. Обязательно указать уникальный `id`

---

## Как добавить цвет к варианту

```ts
colorOptions: [
  { name: 'Белый', hex: '#ffffff' },
  { name: 'Чёрный', hex: '#000000' },
  { name: 'Синий', hex: '#1a3a6b' },  // ← добавить новый
]
```

---

## Как работает кнопка «Рассчитать эту модель»

1. Пользователь на странице категории (например, `/catalog/futbolki/`) выбирает модель и вариант
2. Нажимает «Рассчитать» в компоненте `ModelVariantBlock`
3. Выбранный вариант сохраняется в `localStorage` под ключом `teeon_selected_variant`
4. Пользователь переходит к форме заявки (`#request`)
5. `RequestForm` при монтировании читает `localStorage` и заполняет поле «Комментарий» данными выбранного варианта

### Мультипозиционная корзина

Конфигуратор `ProductModelExplorer` поддерживает добавление нескольких позиций:
- Каждая позиция сохраняется в `localStorage` под ключом `teeon_quote_items` (массив)
- В форме отображается список всех выбранных позиций
- После отправки заявки `localStorage` очищается

---

## Как добавить фотографии изделий

### Шаг 1 — положить фото в нужную папку

```
public/images/catalog/<slug>/<filename>.jpg
```

Примеры:
```
public/images/catalog/futbolki/basic-160.jpg
public/images/catalog/hudi/oversize-320.jpg
public/images/catalog/svitshoty/classic-280.jpg
```

Рекомендуемый размер: **800×600 px** (соотношение 4:3) или **400×300 px** для миниатюр.

### Шаг 2 — прописать путь в данных

В `lib/productOptions.ts` для нужного варианта:
```ts
{
  id: 'basic-160',
  title: 'Базовая 160 г/м²',
  imageSrc: '/images/catalog/futbolki/basic-160.jpg',  // ← добавить
  ...
}
```

Или в `lib/catalogModels.ts` для варианта модели:
```ts
{
  id: 'var-basic',
  name: 'Базовая',
  image: '/images/catalog/futbolki/basic-160.jpg',  // ← добавить
  ...
}
```

### Загрузка через MinIO (альтернатива)

Изображения можно загрузить через интерфейс в `/admin/catalog-editor/` → таб «Изображения». После загрузки скопировать URL и вставить в поле `imageSrc` / `image`.

---

## Что нужно для настоящей CMS

Текущая система хранит данные в TypeScript-файлах. Для полноценной редактируемой CMS нужно:
- База данных (PostgreSQL, MongoDB или др.)
- Backend API для чтения/записи данных
- Серверное хранилище изображений с продакшен-S3
- Форма добавления/редактирования в UI с сохранением на сервере
- Синхронизация между изменениями и публичным сайтом без ручного деплоя
