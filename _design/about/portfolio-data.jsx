/* Shared portfolio data — 9 cases. Reads/writes localStorage. */

const PORTFOLIO_KEY = 'teeon_admin_portfolio_cases';

const defaultCases = [
  {
    slug: 'it-startup-welcome', isActive: true, sortOrder: 1,
    title: 'Welcome-кит для онбординга в IT-команду',
    shortTitle: 'Welcome-кит для IT', clientType: 'IT-компания', industry: 'SaaS · 200+ сотрудников',
    task: 'Подготовить welcome-набор для новых сотрудников: фирменное худи с лого на груди + кепка + сумка с принтом + бирка.',
    result: 'Согласованный pre-production sample за 5 дней, тираж 320 шт. отгружен через 12 дней. Брак — 0%, замены не потребовалось.',
    description: 'Полный комплект для онбординга: одежда + сувенирка от UP Gifts в одной коробке.',
    products: ['Худи (320 шт.)', 'Кепки snapback (320 шт.)', 'Шопперы (320 шт.)', 'Кожаные бирки на сумках'],
    technologies: ['vyshivka', 'dtf-pechat', 'tisnenie'],
    quantity: '320 комплектов', timeline: '12 дней', year: '2026',
    coverLabel: 'Welcome-кит · 320 шт.', galleryLabels: ['Худи с вышивкой', 'Кепки', 'Шопперы', 'Кожаные бирки'],
    tags: ['hudi', 'welcome', 'vyshivka', 'dtf-pechat'],
    relatedCatalog: ['hudi', 'futbolki', 'sumki'], relatedBranding: ['vyshivka', 'dtf-pechat'],
    bg: 'yellow', kind: 'hoodie',
  },
  {
    slug: 'event-festival', isActive: true, sortOrder: 2,
    title: 'Форма для open-air фестиваля', shortTitle: 'Форма event-команды', clientType: 'Event-агентство', industry: 'Фестивали и форумы',
    task: 'Униформа из худи и кепок для команды организаторов open-air фестиваля. С шевронами на липучке (можно менять между сменами).',
    result: '180 комплектов формы за 9 дней. Шевроны на липучке позволили переставить эмблемы между сменами фестиваля.',
    description: 'Форма из 180 худи + кепок с шевронами на липучке.',
    products: ['Худи на молнии (180 шт.)', 'Кепки 6-панельные (180 шт.)', 'Шевроны на липучке (360 шт.)'],
    technologies: ['shelkografiya', 'shevrony'],
    quantity: '180 комплектов', timeline: '9 дней', year: '2026',
    coverLabel: 'Open-air фестиваль', galleryLabels: ['Худи с лого', 'Шевроны', 'Кепки', 'Команда на сцене'],
    tags: ['hudi', 'meropriyatiya', 'shelkografiya', 'forma'],
    relatedCatalog: ['hudi'], relatedBranding: ['shelkografiya', 'shevrony'],
    bg: '', kind: 'hoodie',
  },
  {
    slug: 'sport-league', isActive: true, sortOrder: 3,
    title: 'Игровая форма для любительской лиги', shortTitle: 'Спортивная форма', clientType: 'Спорт-клуб', industry: 'Любительская футбольная лига',
    task: 'Сублимационная all-over печать на форму: 6 команд по 15 комплектов, у каждой свой цвет и номера игроков.',
    result: '90 комплектов формы (футболка + шорты) с индивидуальными номерами. Сублимация по всей поверхности — не выгорает и не отслаивается.',
    description: 'Полноцветная сублимация на 90 спортивных комплектах.',
    products: ['Игровые футболки (90 шт.)', 'Спортивные шорты (90 шт.)', 'Индивидуальные номера и фамилии'],
    technologies: ['sublimaciya'],
    quantity: '90 комплектов', timeline: '14 дней', year: '2026',
    coverLabel: 'Спорт-форма для лиги', galleryLabels: ['Игровая футболка', 'Шорты', 'Номера', 'Командное фото'],
    tags: ['futbolki', 'sublimaciya', 'sport'],
    relatedCatalog: ['futbolki'], relatedBranding: ['sublimaciya'],
    bg: 'blue', kind: 'tee',
  },
  {
    slug: 'restaurant-uniform', isActive: true, sortOrder: 4,
    title: 'Униформа зала с вышивкой логотипа', shortTitle: 'Униформа для HoReCa', clientType: 'Ресторан', industry: 'HoReCa · 4 точки',
    task: 'Лонгсливы для официантов с вышивкой логотипа на груди. 4 цвета под зоны ресторана, размер от S до 2XL.',
    result: '60 лонгсливов отгружено за 11 дней. Вышивка с подкладкой держится после 50+ стирок.',
    description: '60 лонгсливов с трикотажной вышивкой логотипа.',
    products: ['Лонгсливы регуляр-кроя (60 шт.)', 'Вышивка лого на груди слева'],
    technologies: ['vyshivka'],
    quantity: '60 шт.', timeline: '11 дней', year: '2026',
    coverLabel: 'Лонгсливы для зала', galleryLabels: ['Лонгслив на сотруднике', 'Вышивка крупно', 'Размерный ряд'],
    tags: ['longslivy', 'vyshivka', 'forma'],
    relatedCatalog: ['longslivy'], relatedBranding: ['vyshivka'],
    bg: '', kind: 'longsleeve',
  },
  {
    slug: 'retail-shoppers', isActive: true, sortOrder: 5,
    title: 'Шопперы 1 200 шт. к запуску коллекции', shortTitle: 'Шопперы для ритейла', clientType: 'Ритейл-сеть', industry: 'Fashion · 30+ магазинов',
    task: 'Промо-шопперы для бесплатной раздачи при покупке. 1 200 шт., шелкография в 2 цвета, поставка по 30 магазинам.',
    result: 'Тираж в 1 200 шт. отгружен за 18 дней. Поставка раскидана по 30 магазинам с маркировкой коробок.',
    description: 'Бязевые шопперы с 2-цветной шелкографией и развозом по сети.',
    products: ['Шопперы бязевые (1 200 шт.)', 'Длинные ручки (60 см)', 'Принт лицо + спина'],
    technologies: ['shelkografiya'],
    quantity: '1 200 шт.', timeline: '18 дней', year: '2026',
    coverLabel: 'Шопперы 1 200 шт.', galleryLabels: ['Шоппер крупно', 'Печать лицо', 'Упаковка по магазинам'],
    tags: ['sumki', 'shelkografiya', 'promo'],
    relatedCatalog: ['sumki'], relatedBranding: ['shelkografiya'],
    bg: 'yellow', kind: 'bag',
  },
  {
    slug: 'coffee-aprons', isActive: true, sortOrder: 6,
    title: 'Фартуки и футболки для барист', shortTitle: 'Униформа кофейни', clientType: 'Кофейня', industry: 'Сеть · 12 точек',
    task: 'Базовая униформа для 12 кофеен: футболка + фартук + кепка. Вышивка лого на каждой позиции.',
    result: '45 комплектов отгружены за 8 дней. Срочная партия с приоритетом — успели к запуску новой точки.',
    description: 'Униформа из 3 позиций для 12 точек кофейни.',
    products: ['Футболки 220 г/м² (45 шт.)', 'Фартуки канва (45 шт.)', 'Кепки snapback (45 шт.)'],
    technologies: ['vyshivka'],
    quantity: '45 комплектов', timeline: '8 дней', year: '2026',
    coverLabel: 'Униформа барист', galleryLabels: ['Бариста за стойкой', 'Фартук крупно', 'Футболка с вышивкой'],
    tags: ['futbolki', 'vyshivka', 'forma'],
    relatedCatalog: ['futbolki'], relatedBranding: ['vyshivka'],
    bg: '', kind: 'tee',
  },
  {
    slug: 'conference-merch', isActive: true, sortOrder: 7,
    title: 'Мерч для IT-конференции на 800 участников', shortTitle: 'Мерч конференции', clientType: 'Event-агентство', industry: 'Технологическая конференция',
    task: 'Промо-футболки для всех 800 участников + welcome-наборы для 60 спикеров с худи и шопперами.',
    result: '800 футболок с шелкографией + 60 расширенных welcome-наборов спикерам. Поставка за 16 дней до даты конференции.',
    description: 'Большой мерч-пакет на конференцию: 860 единиц.',
    products: ['Футболки участников (800 шт.)', 'Худи спикерам (60 шт.)', 'Шопперы (60 шт.)'],
    technologies: ['shelkografiya', 'dtf-pechat'],
    quantity: '920 шт.', timeline: '21 день', year: '2026',
    coverLabel: 'Мерч на 800 участников', galleryLabels: ['Стенд раздачи', 'Welcome-набор спикера', 'Футболка крупно'],
    tags: ['futbolki', 'hudi', 'meropriyatiya', 'shelkografiya'],
    relatedCatalog: ['futbolki', 'hudi'], relatedBranding: ['shelkografiya', 'dtf-pechat'],
    bg: 'ink', kind: 'tee',
  },
  {
    slug: 'logistics-vests', isActive: true, sortOrder: 8,
    title: 'Жилетки для логистической команды', shortTitle: 'Жилетки логистики', clientType: 'Логистика', industry: 'Региональная курьерская служба',
    task: 'Сигнальные жилетки сетчатого типа для курьеров: яркий цвет + шевроны с лого на липучке.',
    result: '120 жилеток с сетчатым материалом, шелкография на спине, шевроны на липучке. Поставка по 6 региональным хабам.',
    description: 'Сетчатые жилетки с шевронами для курьеров.',
    products: ['Жилетки сетчатые (120 шт.)', 'Шевроны на липучке (240 шт.)'],
    technologies: ['shelkografiya', 'shevrony'],
    quantity: '120 шт.', timeline: '10 дней', year: '2026',
    coverLabel: 'Сигнальные жилетки', galleryLabels: ['Жилет крупно', 'Шеврон', 'Курьер на смене'],
    tags: ['zhiletki', 'shelkografiya', 'forma'],
    relatedCatalog: ['zhiletki'], relatedBranding: ['shelkografiya', 'shevrony'],
    bg: '', kind: 'vest',
  },
  {
    slug: 'outdoor-jackets', isActive: true, sortOrder: 9,
    title: 'Куртки софтшелл для outdoor-команды', shortTitle: 'Куртки софтшелл', clientType: 'Outdoor-команда', industry: 'Сервисное обслуживание',
    task: 'Куртки софтшелл с вышивкой логотипа и шевронами должностей. 80 шт., индивидуальные размеры.',
    result: '80 курток за 14 дней с индивидуальной подгонкой по росту. Вышивка + шевроны.',
    description: '80 курток софтшелл с вышивкой и шевронами.',
    products: ['Куртки софтшелл (80 шт.)', 'Шевроны должностей (80 шт.)'],
    technologies: ['vyshivka', 'shevrony'],
    quantity: '80 шт.', timeline: '14 дней', year: '2026',
    coverLabel: 'Куртки софтшелл', galleryLabels: ['Куртка спина', 'Вышивка на груди', 'Шеврон должности'],
    tags: ['kurtki', 'vyshivka', 'shevrony', 'forma'],
    relatedCatalog: ['kurtki'], relatedBranding: ['vyshivka', 'shevrony'],
    bg: 'blue', kind: 'jacket',
  },
];

const tagDictionary = [
  { slug: 'all',           label: 'Все кейсы' },
  { slug: 'hudi',          label: 'Худи' },
  { slug: 'futbolki',      label: 'Футболки' },
  { slug: 'svitshoty',     label: 'Свитшоты' },
  { slug: 'longslivy',     label: 'Лонгсливы' },
  { slug: 'sumki',         label: 'Сумки' },
  { slug: 'zhiletki',      label: 'Жилетки' },
  { slug: 'kurtki',        label: 'Куртки' },
  { slug: 'vyshivka',      label: 'Вышивка' },
  { slug: 'dtf-pechat',    label: 'DTF-печать' },
  { slug: 'shelkografiya', label: 'Шелкография' },
  { slug: 'sublimaciya',   label: 'Сублимация' },
  { slug: 'meropriyatiya', label: 'Мероприятия' },
  { slug: 'welcome',       label: 'Welcome-наборы' },
  { slug: 'forma',         label: 'Форма персонала' },
  { slug: 'promo',         label: 'Промо' },
];

function loadCases() {
  try {
    const raw = localStorage.getItem(PORTFOLIO_KEY);
    return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(defaultCases));
  } catch (e) { return JSON.parse(JSON.stringify(defaultCases)); }
}
function saveCases(data) {
  try { localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(data)); return true; }
  catch (e) { return false; }
}
function resetCases() {
  try { localStorage.removeItem(PORTFOLIO_KEY); return true; } catch (e) { return false; }
}
function getRelatedCases(caseSlug, allCases, limit = 3) {
  const self = allCases.find(c => c.slug === caseSlug);
  if (!self) return [];
  const others = allCases.filter(c => c.slug !== caseSlug && c.isActive !== false);
  const scored = others.map(c => ({
    case: c,
    score: (c.tags || []).filter(t => (self.tags || []).includes(t)).length,
  })).sort((a, b) => b.score - a.score).slice(0, limit);
  return scored.map(s => s.case);
}

window.PortfolioData = {
  defaultCases, tagDictionary,
  loadCases, saveCases, resetCases, getRelatedCases,
  PORTFOLIO_KEY,
};
