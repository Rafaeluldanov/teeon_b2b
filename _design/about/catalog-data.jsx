/* Shared catalog data — categories, models, variants
   Mirrors lib/catalog.ts + lib/catalogModels.ts. Reads/writes localStorage. */

const STORAGE_KEY = 'teeon_admin_catalog_models';
const SELECTED_KEY = 'teeon_selected_variant';

/* ------- categories (the 8 SKUs) ------- */
const defaultCategories = [
  {
    slug: 'futbolki', title: 'Футболки', short: 'Хлопок 160–220 г/м²',
    desc: 'Базовая позиция корпоративного мерча. Хлопок и хлопок с эластаном, любая плотность, классический и oversize-крой.',
    badge: 'Категория 01', built_in: true, sortOrder: 1,
    tasks: ['Промо-тиражи и ивенты', 'Welcome-наборы новых сотрудников', 'Форма для розничной точки'],
    brandings: ['Шелкография', 'DTF', 'DTG', 'Вышивка', 'Сублимация'],
    customize: ['Ткань 140–220 г/м²', 'Цвет ткани (16+ вариантов)', 'Тип кроя — slim / regular / oversize', 'Размерный ряд XS–4XL', 'Длина рукава', 'Биркование, упаковка'],
    pricingNote: 'Цена рассчитывается индивидуально по: тиражу, ткани, методу нанесения, числу цветов в макете, упаковке. На образец до тиража — отдельная позиция в смете.',
    related: ['longslivy', 'hudi', 'svitshoty'],
    kind: 'tee', bg: 'paper-2',
  },
  {
    slug: 'hudi', title: 'Худи', short: 'Двунитка/трёхнитка с начёсом',
    desc: 'Тёплая толстовка с капюшоном и карманом-кенгуру. Плотная двунитка или трёхнитка с начёсом, удобная посадка.',
    badge: 'Категория 02', built_in: true, sortOrder: 2,
    tasks: ['Welcome-кит для офиса', 'Сувенир спикерам и амбассадорам', 'Форма для outdoor-команд'],
    brandings: ['Вышивка', 'Шелкография', 'DTF', 'Тиснение', 'Шевроны'],
    customize: ['Двунитка / трёхнитка с начёсом', 'Плотность 280–340 г/м²', 'Цвет + цвет шнурков и подкладки капюшона', 'Карман-кенгуру', 'Манжеты и резинка по низу', 'Размер от XS до 4XL'],
    pricingNote: 'Цена зависит от ткани (двунитка дешевле трёхнитки), плотности, метода нанесения и тиража. Вышивка + DTF на капюшоне — отдельные позиции.',
    related: ['svitshoty', 'futbolki', 'longslivy'],
    kind: 'hoodie', bg: 'yellow',
  },
  {
    slug: 'svitshoty', title: 'Свитшоты', short: 'Без капюшона, плотные 280–340 г',
    desc: 'Свитшоты без капюшона — лаконичная посадка, идеальное полотно под нанесение. Универсальная позиция для команды и сувенира.',
    badge: 'Категория 03', built_in: true, sortOrder: 3,
    tasks: ['Униформа стартапа', 'Тираж для команды на офсайт', 'Подарок партнёрам'],
    brandings: ['Вышивка', 'Шелкография', 'DTF', 'Тиснение'],
    customize: ['Двунитка / трёхнитка', 'Плотность 280–340 г/м²', '16+ цветов на выбор', 'Манжеты с резинкой', 'Карман', 'Размер XS–4XL'],
    pricingNote: 'Цена дороже футболки за счёт большего расхода ткани. Возможна индивидуальная посадка по лекалу — на смету.',
    related: ['hudi', 'futbolki', 'longslivy'],
    kind: 'sweat', bg: 'paper-2',
  },
  {
    slug: 'longslivy', title: 'Лонгсливы', short: 'Слим и oversize, длинный рукав',
    desc: 'Футболка с длинным рукавом. Подходит для межсезонного мерча и как самостоятельная униформа.',
    badge: 'Категория 04', built_in: true, sortOrder: 4,
    tasks: ['Межсезонный мерч', 'Layer под куртку', 'Форма ритейл-точки'],
    brandings: ['Шелкография', 'DTF', 'Вышивка', 'Сублимация'],
    customize: ['Хлопок 160–220 г/м²', 'Slim / regular / oversize', 'Длина рукава (стандарт / манжета)', '16+ цветов', 'Размер XS–4XL'],
    pricingNote: 'Расход ткани больше, чем у футболки — цена выше на 18–22%. Скидки на тиражи от 100 шт.',
    related: ['futbolki', 'svitshoty', 'hudi'],
    kind: 'longsleeve', bg: 'blue',
  },
  {
    slug: 'sumki', title: 'Сумки', short: 'Шопперы и рюкзаки, бязь и оксфорд',
    desc: 'Тканевые шопперы, рюкзаки, сумки на пояс. Бязь, саржа, оксфорд — под любую печать и тираж.',
    badge: 'Категория 05', built_in: true, sortOrder: 5,
    tasks: ['Промо-раздача на event', 'Сувенир спикерам', 'Welcome-набор'],
    brandings: ['Шелкография', 'DTF', 'Вышивка', 'Бирки', 'Тиснение'],
    customize: ['Ткань — бязь / саржа / оксфорд', 'Размер шоппера (S / M / L)', 'Длина ручек', 'Цвет ткани и ручек', 'Внутренний карман', 'Бирка с лого'],
    pricingNote: 'Шопперы из бязи — самая доступная позиция. Оксфорд и рюкзаки — отдельная категория, рассчитываем индивидуально.',
    related: ['zhiletki', 'kurtki'],
    kind: 'bag', bg: 'paper-2',
  },
  {
    slug: 'zhiletki', title: 'Жилетки', short: 'Утеплённые и сетчатые, под печать',
    desc: 'Промо-жилеты для outdoor-форм, утеплённые жилеты для логистики и сетчатые — для ивентов.',
    badge: 'Категория 06', built_in: true, sortOrder: 6,
    tasks: ['Форма для outdoor-форм', 'Логистика / монтаж', 'Промо-команда на улице'],
    brandings: ['Шелкография', 'DTF', 'Вышивка', 'Шевроны'],
    customize: ['Утеплитель — синтепон 100–200 г/м²', 'Сетка / плотная ткань', '16+ цветов', 'Карманы и молнии', 'Размер S–4XL'],
    pricingNote: 'Утеплённые жилеты — отдельная категория, цена выше из-за утеплителя и фурнитуры.',
    related: ['kurtki', 'futbolki'],
    kind: 'vest', bg: 'paper-2',
  },
  {
    slug: 'kurtki', title: 'Куртки', short: 'Софтшелл, ветровки, утеплённые',
    desc: 'Корпоративные куртки — софтшелл, ветровки, утеплённые. Под печать, вышивку, шевроны.',
    badge: 'Категория 07', built_in: true, sortOrder: 7,
    tasks: ['Форма outdoor-команд', 'Униформа для логистики', 'Подарок партнёрам зимой'],
    brandings: ['Вышивка', 'DTF', 'Шевроны', 'Тиснение', 'Шелкография'],
    customize: ['Софтшелл / ветровка / утеплённая', 'Утеплитель 100–200 г', 'Капюшон отстёгивающийся / нет', 'Цвет + молнии и фурнитура', 'Размер S–4XL'],
    pricingNote: 'Цена зависит от типа куртки. Софтшелл — от 4500 ₽, утеплённая — от 7500 ₽. Тираж от 30 шт.',
    related: ['zhiletki', 'dozhdeviki'],
    kind: 'jacket', bg: 'ink',
  },
  {
    slug: 'dozhdeviki', title: 'Дождевики', short: 'PVC и нейлон, с капюшоном',
    desc: 'Промо-дождевики и плащи. PVC и нейлон, с капюшоном и без — для уличных мероприятий и сувенирки.',
    badge: 'Категория 08', built_in: true, sortOrder: 8,
    tasks: ['Промо на улице', 'Сувенир к фестивалю', 'Outdoor-команда на смене'],
    brandings: ['Шелкография', 'DTF', 'Тиснение'],
    customize: ['Материал — PVC / нейлон', 'С капюшоном / без', '8+ цветов на выбор', 'Размер S–4XL', 'Индивидуальная упаковка (саше)'],
    pricingNote: 'Самая бюджетная outdoor-позиция. Тиражи от 100 шт — выгодная цена за единицу.',
    related: ['kurtki', 'zhiletki'],
    kind: 'raincoat', bg: 'yellow',
  },
];

/* ------- models per category (sample structure) ------- */
const defaultModels = {
  futbolki: [
    {
      slug: 'classic', name: 'Classic', subtitle: 'Прямой крой, хлопок 180', patternCode: 'TF-180-CL',
      badges: ['Бестселлер', 'Хит'], active: true, sortOrder: 1,
      shortDesc: 'Универсальная футболка прямого кроя — основа корпоративного мерча.',
      desc: 'Хлопок 180 г/м², плотная вязка, не просвечивает. Прямой крой подходит и под slim-, и под regular-фигуру. Идеальная база под любой метод брендирования.',
      features: ['Хлопок 100%', 'Плотность 180 г/м²', 'Двойная строчка по низу', 'Усиленные плечевые швы', 'Не садится после стирки'],
      tasks: ['Промо-тиражи', 'Welcome-наборы', 'Базовая униформа'],
      brandings: ['Шелкография', 'DTF', 'DTG', 'Вышивка'],
      customize: ['Цвет ткани (16 вариантов)', 'Размер XS–4XL', 'Печать / вышивка', 'Биркование'],
      variants: [
        { id: 'classic-160', name: '160 г/м²', subtitle: 'Лёгкий, для жары', patternCode: 'TF-160',
          desc: 'Тонкий вариант — для жаркого сезона и под подкладку. Слегка просвечивает на светлых цветах.',
          features: ['Хлопок 100%', '160 г/м²', 'Лёгкая ткань', 'Дышит'],
          materials: ['Хлопок ring-spun'], densities: ['160 г/м²'],
          sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
          brandings: ['Шелкография', 'DTF'], printLocations: ['Грудь', 'Спина', 'Рукав'],
          customize: ['16 цветов', 'Размер XS–4XL'],
          colors: [{name:'Чёрный', hex:'#0a0a0a'},{name:'Белый', hex:'#ffffff'},{name:'Серый меланж', hex:'#9aa0a8'},{name:'Синий', hex:'#1B3FCA'},{name:'Жёлтый', hex:'#FFD60A'}],
          image: null, active: true, sortOrder: 1 },
        { id: 'classic-180', name: '180 г/м²', subtitle: 'Стандарт, бестселлер', patternCode: 'TF-180',
          desc: 'Самый востребованный плотностной вариант. Подходит под все методы нанесения. Чёткие линии печати, ровная вышивка.',
          features: ['Хлопок 100%', '180 г/м²', 'Плотная вязка', 'Не просвечивает', 'Бестселлер'],
          materials: ['Хлопок ring-spun', 'Хлопок с эластаном (опция)'], densities: ['180 г/м²'],
          sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
          brandings: ['Шелкография', 'DTF', 'DTG', 'Вышивка'], printLocations: ['Грудь', 'Спина', 'Рукав'],
          customize: ['16 цветов', 'Размер XS–4XL', 'Биркование'],
          colors: [{name:'Чёрный', hex:'#0a0a0a'},{name:'Белый', hex:'#ffffff'},{name:'Серый меланж', hex:'#9aa0a8'},{name:'Синий', hex:'#1B3FCA'},{name:'Тёмно-синий', hex:'#162D6B'},{name:'Жёлтый', hex:'#FFD60A'},{name:'Бордо', hex:'#7a1f2a'}],
          image: null, active: true, sortOrder: 2 },
        { id: 'classic-220', name: '220 г/м²', subtitle: 'Премиум-плотность', patternCode: 'TF-220',
          desc: 'Плотный вариант премиум-уровня. Сидит лучше, держит форму после стирки. Лучшая база под вышивку.',
          features: ['Хлопок 100%', '220 г/м²', 'Премиум плотность', 'Идеально под вышивку'],
          materials: ['Хлопок ring-spun premium'], densities: ['220 г/м²'],
          sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
          brandings: ['Вышивка', 'Шелкография', 'DTF', 'Тиснение'], printLocations: ['Грудь', 'Спина'],
          customize: ['16 цветов', 'Размер XS–3XL'],
          colors: [{name:'Чёрный', hex:'#0a0a0a'},{name:'Белый', hex:'#ffffff'},{name:'Темно-зелёный', hex:'#1f3a23'},{name:'Синий', hex:'#1B3FCA'}],
          image: null, active: true, sortOrder: 3 },
      ],
    },
    {
      slug: 'oversize', name: 'Oversize', subtitle: 'Свободный крой, премиум', patternCode: 'TF-OS',
      badges: ['Новинка'], active: true, sortOrder: 2,
      shortDesc: 'Свободный крой с опущенной линией плеча — модный силуэт под IT и фэшн-бренды.',
      desc: 'Oversize-футболка с увеличенным объёмом и опущенным плечевым швом. Подходит под печать большими принтами и all-over графики.',
      features: ['Хлопок 100%', '220 г/м²', 'Опущенная линия плеча', 'Удлинённый крой', 'Унисекс'],
      tasks: ['IT-стартап мерч', 'Уличный фэшн-бренд', 'Подарок'],
      brandings: ['DTF', 'DTG', 'Шелкография', 'Сублимация'],
      customize: ['Цвет ткани', 'Размер S–3XL (oversize → +1 размер)', 'Печать large-size'],
      variants: [
        { id: 'oversize-220', name: 'Oversize 220', subtitle: 'Стандартный oversize', patternCode: 'TF-OS-220',
          desc: 'Базовый oversize с плотным хлопком 220 г/м². Идеален под крупный принт.',
          features: ['Хлопок 100%', '220 г/м²', 'Oversize-крой', 'Опущенное плечо'],
          materials: ['Хлопок ring-spun'], densities: ['220 г/м²'],
          sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
          brandings: ['DTF', 'Шелкография', 'Сублимация'], printLocations: ['Грудь large', 'Спина large', 'All-over'],
          customize: ['8 цветов', 'Размер S–3XL'],
          colors: [{name:'Чёрный', hex:'#0a0a0a'},{name:'Молочный', hex:'#f3f0e6'},{name:'Хаки', hex:'#5e6a3a'},{name:'Серый', hex:'#9aa0a8'}],
          image: null, active: true, sortOrder: 1 },
      ],
    },
  ],
  hudi: [
    {
      slug: 'classic-hoodie', name: 'Classic Hoodie', subtitle: 'Двунитка, с карманом-кенгуру', patternCode: 'HD-CL',
      badges: ['Бестселлер'], active: true, sortOrder: 1,
      shortDesc: 'Классическое худи с двойным капюшоном и кенгуру.',
      desc: 'Тёплое худи из двунитки с начёсом. Двойной капюшон, манжеты и подол с резинкой. Удобная посадка унисекс.',
      features: ['Двунитка с начёсом', '280–320 г/м²', 'Карман-кенгуру', 'Двойной капюшон', 'Шнурок в тон'],
      tasks: ['Welcome-кит', 'Корпоративный мерч', 'Outdoor'],
      brandings: ['Вышивка', 'Шелкография', 'DTF', 'Шевроны'],
      customize: ['Цвет + цвет шнурков', 'Капюшон с подкладкой', 'Размер S–4XL'],
      variants: [
        { id: 'classic-hoodie-280', name: '280 г/м²', subtitle: 'Лёгкое худи', patternCode: 'HD-280',
          desc: 'Лёгкий вариант для межсезонья. Тонкий начёс, не слишком жарко.',
          features: ['Двунитка с начёсом', '280 г/м²', 'Карман-кенгуру', 'Капюшон без подкладки'],
          materials: ['Хлопок 80% / ПЭ 20%'], densities: ['280 г/м²'],
          sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
          brandings: ['Шелкография', 'DTF', 'Вышивка'], printLocations: ['Грудь', 'Спина', 'Капюшон'],
          customize: ['10 цветов', 'Размер XS–4XL'],
          colors: [{name:'Чёрный', hex:'#0a0a0a'},{name:'Серый меланж', hex:'#9aa0a8'},{name:'Тёмно-синий', hex:'#162D6B'}],
          image: null, active: true, sortOrder: 1 },
        { id: 'classic-hoodie-320', name: '320 г/м²', subtitle: 'Тёплое худи, бестселлер', patternCode: 'HD-320',
          desc: 'Бестселлер категории. Плотный начёс, тёплое, отлично держит форму.',
          features: ['Трёхнитка с начёсом', '320 г/м²', 'Двойной капюшон', 'Подкладка капюшона в тон'],
          materials: ['Хлопок 80% / ПЭ 20%'], densities: ['320 г/м²'],
          sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
          brandings: ['Вышивка', 'Шелкография', 'DTF', 'Шевроны'], printLocations: ['Грудь', 'Спина', 'Капюшон', 'Рукав'],
          customize: ['16 цветов', 'Шнурки в тон'],
          colors: [{name:'Чёрный', hex:'#0a0a0a'},{name:'Серый меланж', hex:'#9aa0a8'},{name:'Тёмно-синий', hex:'#162D6B'},{name:'Бордо', hex:'#7a1f2a'},{name:'Хаки', hex:'#5e6a3a'}],
          image: null, active: true, sortOrder: 2 },
      ],
    },
    {
      slug: 'zip-hoodie', name: 'Zip Hoodie', subtitle: 'На молнии, с двумя карманами', patternCode: 'HD-ZIP',
      badges: ['Новое'], active: true, sortOrder: 2,
      shortDesc: 'Худи на молнии с двумя боковыми карманами.',
      desc: 'Худи на молнии — удобно надевать поверх, два врезных кармана, подкладка капюшона. Подходит как layer.',
      features: ['Двунитка с начёсом', '320 г/м²', 'Молния YKK', 'Два врезных кармана'],
      tasks: ['Спортивная униформа', 'Outdoor мерч', 'Lookbook'],
      brandings: ['Вышивка', 'DTF', 'Шевроны'],
      customize: ['Цвет ткани + цвет молнии', 'Капюшон без шнурка (опция)'],
      variants: [
        { id: 'zip-320', name: 'Zip 320 г/м²', subtitle: 'Стандарт', patternCode: 'HD-ZIP-320',
          desc: 'Стандартная плотность 320 г/м² на молнии. Используется в Welcome-наборах и outdoor-формах.',
          features: ['Двунитка с начёсом', '320 г/м²', 'Молния YKK', 'Два врезных кармана'],
          materials: ['Хлопок 80% / ПЭ 20%'], densities: ['320 г/м²'],
          sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
          brandings: ['Вышивка', 'DTF', 'Шевроны'], printLocations: ['Грудь', 'Спина'],
          customize: ['Цвет', 'Молния в тон'],
          colors: [{name:'Чёрный', hex:'#0a0a0a'},{name:'Серый', hex:'#9aa0a8'},{name:'Тёмно-синий', hex:'#162D6B'}],
          image: null, active: true, sortOrder: 1 },
      ],
    },
  ],
  /* For other categories — single model each (admin can extend) */
  svitshoty: [
    { slug: 'classic-sweat', name: 'Classic Свитшот', subtitle: 'Без капюшона, прямой крой', patternCode: 'SW-CL', badges: ['Универсал'], active: true, sortOrder: 1,
      shortDesc: 'Базовый свитшот без капюшона.',
      desc: 'Простой и универсальный — отличная платформа под вышивку.',
      features: ['Двунитка', '280–320 г/м²', 'Манжеты с резинкой'],
      tasks: ['Корпоратив', 'Подарок партнёрам'], brandings: ['Вышивка', 'Шелкография', 'DTF'],
      customize: ['Плотность', 'Цвет', 'Размер'],
      variants: [
        { id: 'sw-280', name: '280 г/м²', subtitle: 'Лёгкий свитшот', patternCode: 'SW-280',
          desc: 'Универсальная плотность.',
          features: ['Двунитка', '280 г/м²'], materials: ['Хлопок 80% / ПЭ 20%'], densities: ['280 г/м²'],
          sizes: ['S','M','L','XL','2XL'], brandings: ['Шелкография','DTF','Вышивка'], printLocations: ['Грудь','Спина'],
          customize: ['10 цветов'],
          colors: [{name:'Чёрный', hex:'#0a0a0a'},{name:'Серый меланж', hex:'#9aa0a8'},{name:'Синий', hex:'#1B3FCA'}],
          image: null, active: true, sortOrder: 1 },
      ],
    },
  ],
  longslivy: [
    { slug: 'classic-long', name: 'Classic Лонгслив', subtitle: 'Прямой крой, длинный рукав', patternCode: 'LS-CL', badges: [], active: true, sortOrder: 1,
      shortDesc: 'Базовый лонгслив.',
      desc: 'Универсальный лонгслив прямого кроя.',
      features: ['Хлопок 100%', '180–220 г/м²', 'Манжета на рукаве'],
      tasks: ['Layer мерч', 'Сувенир'], brandings: ['Шелкография','DTF','Вышивка'],
      customize: ['Плотность', 'Длина рукава', 'Цвет'],
      variants: [
        { id: 'ls-180', name: '180 г/м²', subtitle: 'Стандарт', patternCode: 'LS-180',
          desc: 'Стандартный лонгслив 180 г/м².',
          features: ['Хлопок 100%', '180 г/м²'], materials: ['Хлопок'], densities: ['180 г/м²'],
          sizes: ['XS','S','M','L','XL','2XL'], brandings: ['Шелкография','DTF','Вышивка'], printLocations: ['Грудь','Спина','Рукав'],
          customize: ['12 цветов'],
          colors: [{name:'Чёрный', hex:'#0a0a0a'},{name:'Белый', hex:'#ffffff'},{name:'Тёмно-синий', hex:'#162D6B'}],
          image: null, active: true, sortOrder: 1 },
      ],
    },
  ],
  sumki: [
    { slug: 'shopper-classic', name: 'Шоппер Classic', subtitle: 'Бязь, длинные ручки', patternCode: 'BG-SH-CL', badges: ['Хит'], active: true, sortOrder: 1,
      shortDesc: 'Классический шоппер из бязи.',
      desc: 'Простой шоппер с длинными ручками — выгодная база для промо-тиража.',
      features: ['Бязь 150 г/м²', 'Длинные ручки 60 см'],
      tasks: ['Промо-раздача', 'Сувенир на event'], brandings: ['Шелкография','DTF'],
      customize: ['Размер S/M/L', 'Длина ручек', 'Цвет ткани'],
      variants: [
        { id: 'sh-m', name: 'Шоппер M', subtitle: '38×42 см', patternCode: 'BG-SH-M',
          desc: 'Универсальный размер.',
          features: ['Бязь 150', 'Длинные ручки'], materials: ['Бязь','Саржа (опция)'], densities: ['150 г/м²','220 г/м² (саржа)'],
          sizes: ['38×42'], brandings: ['Шелкография','DTF','Вышивка'], printLocations: ['Передняя сторона','Задняя'],
          customize: ['8 цветов ткани'],
          colors: [{name:'Натуральный', hex:'#e8dbb8'},{name:'Чёрный', hex:'#0a0a0a'},{name:'Серый', hex:'#9aa0a8'}],
          image: null, active: true, sortOrder: 1 },
      ],
    },
  ],
  zhiletki: [
    { slug: 'vest-classic', name: 'Жилет Classic', subtitle: 'Сетчатый, для outdoor', patternCode: 'VS-CL', badges: [], active: true, sortOrder: 1,
      shortDesc: 'Классический сетчатый жилет.',
      desc: 'Лёгкий промо-жилет для уличных команд и логистики.',
      features: ['Сетка ПЭ', 'Молния', 'Боковые карманы'],
      tasks: ['Промо-команда', 'Outdoor-форма'], brandings: ['Шелкография','DTF','Вышивка','Шевроны'],
      customize: ['Цвет', 'Сетка / плотная ткань'],
      variants: [
        { id: 'vs-mesh', name: 'Сетка', subtitle: 'Лёгкий', patternCode: 'VS-MESH',
          desc: 'Сетчатый промо-жилет.', features: ['Сетка ПЭ','Молния YKK'], materials: ['ПЭ сетка'], densities: ['90 г/м²'],
          sizes: ['S','M','L','XL','2XL'], brandings: ['Шелкография','DTF','Шевроны'], printLocations: ['Грудь','Спина'],
          customize: ['8 ярких цветов'],
          colors: [{name:'Жёлтый', hex:'#FFD60A'},{name:'Оранжевый', hex:'#ff7a1f'},{name:'Синий', hex:'#1B3FCA'}],
          image: null, active: true, sortOrder: 1 },
      ],
    },
  ],
  kurtki: [
    { slug: 'softshell', name: 'Softshell', subtitle: 'Ветровка-софтшелл', patternCode: 'JK-SS', badges: ['Топ'], active: true, sortOrder: 1,
      shortDesc: 'Корпоративная куртка софтшелл.',
      desc: 'Лёгкая ветрозащитная куртка для весны-осени. Дышит, ветронепродуваема.',
      features: ['Софтшелл 280 г/м²', 'Молния YKK','Капюшон','Боковые карманы на молнии'],
      tasks: ['Outdoor-форма', 'Welcome-набор для зимы'], brandings: ['Вышивка','DTF','Шевроны'],
      customize: ['Цвет', 'Капюшон отстёгивающийся', 'Размер'],
      variants: [
        { id: 'ss-base', name: 'Базовый софтшелл', subtitle: '280 г/м²', patternCode: 'JK-SS-BASE',
          desc: 'Базовый софтшелл — ветронепродуваемая мембрана.',
          features: ['Софтшелл 280','Капюшон','YKK молния'], materials: ['ПЭ + флис'], densities: ['280 г/м²'],
          sizes: ['S','M','L','XL','2XL','3XL'], brandings: ['Вышивка','DTF','Шевроны'], printLocations: ['Грудь','Спина','Рукав'],
          customize: ['8 цветов'],
          colors: [{name:'Чёрный', hex:'#0a0a0a'},{name:'Тёмно-синий', hex:'#162D6B'},{name:'Серый', hex:'#9aa0a8'}],
          image: null, active: true, sortOrder: 1 },
      ],
    },
  ],
  dozhdeviki: [
    { slug: 'rain-classic', name: 'Дождевик Classic', subtitle: 'PVC, с капюшоном', patternCode: 'RC-CL', badges: ['Лето'], active: true, sortOrder: 1,
      shortDesc: 'Промо-дождевик с капюшоном.',
      desc: 'Классический промо-дождевик из PVC. С капюшоном, в индивидуальном саше.',
      features: ['PVC 0.15 мм','С капюшоном','Кнопки спереди'],
      tasks: ['Сувенир к фестивалю','Уличное промо'], brandings: ['Шелкография','DTF','Тиснение'],
      customize: ['Цвет PVC','Саше','Размер'],
      variants: [
        { id: 'rc-clear', name: 'Прозрачный', subtitle: 'PVC прозрачный', patternCode: 'RC-CL-CLEAR',
          desc: 'Видно весь принт под плёнкой.', features: ['PVC прозрачный','Капюшон'], materials: ['PVC'], densities: ['0.15 мм'],
          sizes: ['M','L','XL'], brandings: ['Шелкография','DTF'], printLocations: ['Спина','Грудь'],
          customize: ['Прозрачный или матовый'],
          colors: [{name:'Прозрачный', hex:'#e6f0ff'},{name:'Жёлтый', hex:'#FFD60A'}],
          image: null, active: true, sortOrder: 1 },
      ],
    },
  ],
};

/* ---------- Store helpers ---------- */
function loadModels() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(defaultModels));
    return JSON.parse(raw);
  } catch (e) {
    return JSON.parse(JSON.stringify(defaultModels));
  }
}
function saveModels(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Failed to save catalog models:', e);
    return false;
  }
}
function resetModels() {
  try { localStorage.removeItem(STORAGE_KEY); return true; }
  catch (e) { return false; }
}

/* ---------- Selected variant (passed to request form) ---------- */
function saveSelectedVariant(payload) {
  try { localStorage.setItem(SELECTED_KEY, JSON.stringify(payload)); return true; }
  catch (e) { return false; }
}
function loadSelectedVariant() {
  try { const r = localStorage.getItem(SELECTED_KEY); return r ? JSON.parse(r) : null; }
  catch (e) { return null; }
}
function clearSelectedVariant() {
  try { localStorage.removeItem(SELECTED_KEY); } catch (e) {}
}

window.CatalogData = {
  defaultCategories,
  defaultModels,
  loadModels,
  saveModels,
  resetModels,
  saveSelectedVariant,
  loadSelectedVariant,
  clearSelectedVariant,
  STORAGE_KEY,
  SELECTED_KEY,
};
