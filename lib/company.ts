export interface CompanyFact {
  icon: string;
  value: string;
  label: string;
}

export interface CompanyAdvantage {
  icon: string;
  title: string;
  desc: string;
  bg: string;
}

export interface CompanyCapability {
  icon: string;
  title: string;
  desc: string;
  href: string;
  bg: string;
}

export interface EquipmentCategory {
  icon: string;
  name: string;
  description: string;
}

export interface QualityStep {
  num: string;
  step: string;
  description: string;
}

export interface WorkflowStep {
  num: string;
  title: string;
  description: string;
}

export interface ProductionStat {
  label: string;
  value: string;
  bg: string;
}

export interface CompanyScenario {
  title: string;
  desc: string;
  bg: string;
  links: { label: string; href: string }[];
}

export interface CompanyValue {
  icon: string;
  title: string;
  description: string;
}

export interface CompanyData {
  companyName: string;
  descriptor: string;
  shortDescription: string;
  fullDescription: string;
  productionFacts: CompanyFact[];
  advantages: CompanyAdvantage[];
  capabilities: CompanyCapability[];
  equipment: EquipmentCategory[];
  qualityControl: QualityStep[];
  workflow: WorkflowStep[];
  scenarios: CompanyScenario[];
  documents: string[];
  productionStats: ProductionStat[];
  values: CompanyValue[];
}

export const company: CompanyData = {
  companyName: 'TEEON',
  descriptor: 'Пошив промо-одежды и корпоративного мерча под ключ',
  shortDescription:
    'Производство полного цикла в Москве с 2018 года: создаём корпоративную и рекламную продукцию с нанесением логотипа — от идеи и персонализации до пошива, упаковки и поставки. Вся продукция произведена в России.',
  fullDescription:
    'Создаём корпоративную и рекламную продукцию с нанесением логотипа: от идеи и персонализации до пошива, упаковки и готовой поставки клиенту. Собственное производство 1000 м² в Москве: швейный цех на 50 промышленных машин Juki мощностью 150 000 изделий в месяц и более 15 станков по персонализации — вышивка, лазер, тиснение, UV-печать, DTF, термоперенос. За 7 лет работы — более 3000 успешно реализованных кейсов и 300+ постоянных клиентов.',

  productionFacts: [
    { icon: '🏭', value: '1000 м²', label: 'Собственное производство в Москве' },
    { icon: '🧵', value: '150 000', label: 'Изделий в месяц в швейном цехе' },
    { icon: '⚙️', value: '15+', label: 'Станков по персонализации' },
    { icon: '🤝', value: '300+', label: 'Постоянных клиентов с 2018 года' },
  ],

  advantages: [
    {
      icon: '⏱',
      title: 'Контроль сроков',
      desc: 'Производство внутри одной цепочки — без потерь времени на логистике между подрядчиками.',
      bg: '',
    },
    {
      icon: '✅',
      title: 'Контроль качества',
      desc: 'ОТК на всех этапах: от ткани до финальной упаковки. Замена брака — за наш счёт.',
      bg: 'yellow',
    },
    {
      icon: '🔧',
      title: 'Гибкость под задачу',
      desc: 'Шьём по индивидуальным лекалам, подбираем нестандартные ткани и фурнитуру.',
      bg: 'blue',
    },
    {
      icon: '🤝',
      title: 'Единая ответственность',
      desc: 'Один менеджер ведёт проект от брифа до отгрузки. Без посредников и пересечений.',
      bg: 'ink',
    },
  ],

  capabilities: [
    {
      icon: '✂️',
      title: 'Пошив промо-одежды',
      desc: 'Футболки, худи, свитшоты, лонгсливы, жилетки, куртки, дождевики, сумки.',
      href: '/catalog/',
      bg: '',
    },
    {
      icon: '👔',
      title: 'Корпоративный мерч',
      desc: 'Welcome-наборы, форма для команды, мерч для конференций и выставок.',
      href: '/portfolio/',
      bg: 'yellow',
    },
    {
      icon: '🎨',
      title: 'Брендирование логотипов',
      desc: 'Вышивка, шелкография, DTF, DTG, сублимация, тиснение, гравировка.',
      href: '/branding/',
      bg: '',
    },
    {
      icon: '🏷',
      title: 'Бирки и упаковка',
      desc: 'Тканые и кожаные бирки, индивидуальная упаковка под бренд клиента.',
      href: '/branding/birki/',
      bg: 'blue',
    },
    {
      icon: '🎁',
      title: 'Welcome-наборы',
      desc: 'Готовые комплекты для онбординга — одежда + сувениры + упаковка.',
      href: '/portfolio/?tag=welcome-pack',
      bg: '',
    },
    {
      icon: '🏛',
      title: 'Проекты для мероприятий',
      desc: 'Промо-тиражи и форма для команд событий, фестивалей, конференций.',
      href: '/portfolio/?tag=event',
      bg: 'ink',
    },
  ],

  equipment: [
    {
      icon: '🪡',
      name: '2 вышивальных станка',
      description:
        'Прецизионная машинная вышивка на текстиле: логотипы, монограммы и фирменные знаки по согласованной оцифровке.',
    },
    {
      icon: '⚡',
      name: '2 лазерных станка',
      description:
        'Тонкая лазерная маркировка металлов, сувениров и аксессуаров без расходных материалов.',
    },
    {
      icon: '🔥',
      name: 'Станок для тиснения',
      description:
        'Персонализация ежедневников, обложек и кожаных аксессуаров — сухое тиснение и тиснение фольгой.',
    },
    {
      icon: '🖨',
      name: '2 UV-плоттера Mimaki',
      description:
        'Полноцветная UV-печать на твёрдых поверхностях: дерево, металл, пластик, стекло, кожа.',
    },
    {
      icon: '🎨',
      name: '2 DTF-принтера',
      description:
        'Прямая печать на плёнку с последующим переносом — для текстиля любых цветов и сложных принтов.',
    },
    {
      icon: '♨️',
      name: 'Термоперенос · 6 станков',
      description:
        'Сублимация и термоплёнки: брендирование футболок, кружек, спортивной формы и сувенирной продукции.',
    },
  ],

  qualityControl: [
    {
      num: '01',
      step: 'Согласование макета',
      description: 'Утверждаем технический макет нанесения с заказчиком до запуска образца.',
    },
    {
      num: '02',
      step: 'Подготовка образца',
      description: 'Шьём pre-production sample, согласуем посадку и качество нанесения.',
    },
    {
      num: '03',
      step: 'Технологический контроль',
      description: 'Технолог проверяет настройки оборудования перед запуском тиража.',
    },
    {
      num: '04',
      step: 'Входной контроль ткани',
      description: 'Проверяем рулоны на дефекты и соответствие плотности до раскроя.',
    },
    {
      num: '05',
      step: 'Контроль нанесения',
      description: 'Проверяем качество брендирования на готовых изделиях из партии.',
    },
    {
      num: '06',
      step: 'Финальная проверка',
      description: 'Каждая единица партии проверяется перед упаковкой.',
    },
    {
      num: '07',
      step: 'Упаковка и маркировка',
      description: 'Партия упаковывается, маркируется и готовится к выдаче или отправке.',
    },
  ],

  workflow: [
    {
      num: '01',
      title: 'Идея',
      description: 'Обсуждаем задачу, аудиторию и формат подарка. Помогаем сформировать концепцию мерча под бренд и повод.',
    },
    {
      num: '02',
      title: 'Дизайн',
      description: 'Разрабатываем визуал, макеты нанесения и подбираем материалы в фирменной палитре клиента.',
    },
    {
      num: '03',
      title: 'Персонализация',
      description: 'Наносим логотипы на собственных 15+ станках: вышивка, лазер, UV, DTF, термоперенос, тиснение.',
    },
    {
      num: '04',
      title: 'Пошив',
      description: 'Собственный швейный цех 1000 м² на 50 машин Juki — мощность до 150 000 изделий в месяц.',
    },
    {
      num: '05',
      title: 'Упаковка',
      description: 'Комплектуем, упаковываем и маркируем партии под выдачу или отправку — индивидуальная упаковка под бренд.',
    },
    {
      num: '06',
      title: 'Поставка',
      description: 'Доставляем готовую продукцию клиенту по Москве и по всей России — со склада в 300 м².',
    },
  ],

  scenarios: [
    {
      title: 'Одежда для сотрудников',
      desc: 'Корпоративная форма и мерч для офисов и удалённых команд.',
      bg: '',
      links: [
        { label: 'Худи', href: '/catalog/hudi/' },
        { label: 'Поло', href: '/catalog/futbolki/' },
        { label: 'Вышивка', href: '/branding/vyshivka/' },
      ],
    },
    {
      title: 'Мерч для конференций',
      desc: 'Промо-тиражи от 100 шт. для участников и комплекты для спикеров.',
      bg: 'yellow',
      links: [
        { label: 'Футболки', href: '/catalog/futbolki/' },
        { label: 'Сумки', href: '/catalog/sumki/' },
        { label: 'Шелкография', href: '/branding/shelkografiya/' },
      ],
    },
    {
      title: 'Welcome-наборы',
      desc: 'Готовые комплекты для онбординга новых сотрудников.',
      bg: '',
      links: [
        { label: 'Худи', href: '/catalog/hudi/' },
        { label: 'Шопперы', href: '/catalog/sumki/' },
        { label: 'Сувениры', href: '/suvenirnaya-produkciya/' },
      ],
    },
    {
      title: 'Промо-одежда для акций',
      desc: 'Тиражи 500+ шт. для городских событий, фестивалей, ритейл-акций.',
      bg: 'blue',
      links: [
        { label: 'Футболки', href: '/catalog/futbolki/' },
        { label: 'Шелкография', href: '/branding/shelkografiya/' },
        { label: 'DTF', href: '/branding/dtf-pechat/' },
      ],
    },
    {
      title: 'Форма для персонала',
      desc: 'Униформа кафе, ритейла, сервисных и outdoor-команд.',
      bg: '',
      links: [
        { label: 'Лонгсливы', href: '/catalog/longslivy/' },
        { label: 'Жилетки', href: '/catalog/zhiletki/' },
        { label: 'Куртки', href: '/catalog/kurtki/' },
      ],
    },
    {
      title: 'Корпоративные подарки',
      desc: 'Премиум-комплекты и подарки партнёрам.',
      bg: 'ink',
      links: [
        { label: 'Куртки', href: '/catalog/kurtki/' },
        { label: 'Тиснение', href: '/branding/tisnenie/' },
        { label: 'Сувениры', href: '/suvenirnaya-produkciya/' },
      ],
    },
  ],

  documents: [
    'Договор на производство',
    'Счёт на оплату',
    'Закрывающие документы (накладная или УПД)',
    'Работа с юридическими лицами и ИП',
  ],

  productionStats: [
    { label: 'На рынке с', value: '2018', bg: 'yellow' },
    { label: 'Производство в Москве', value: '1000 м²', bg: '' },
    { label: 'Реализованных кейсов', value: '3000+', bg: 'blue' },
    { label: 'Постоянных клиентов', value: '300+', bg: '' },
  ],

  values: [
    {
      icon: '📋',
      title: 'Понятное ТЗ',
      description: 'Чем точнее задача — тем лучше результат. Помогаем сформулировать требования и подобрать решение.',
    },
    {
      icon: '🎨',
      title: 'Согласованный макет',
      description: 'Не запускаем тираж без утверждённого макета нанесения.',
    },
    {
      icon: '🧪',
      title: 'Качественный образец',
      description: 'При необходимости готовим тестовый образец до запуска партии.',
    },
    {
      icon: '🔄',
      title: 'Стабильность партии',
      description: 'Весь тираж производится по единым параметрам согласованного образца.',
    },
    {
      icon: '📦',
      title: 'Аккуратная упаковка',
      description: 'Заказ упакован и готов к выдаче, доставке или хранению.',
    },
    {
      icon: '⏱',
      title: 'Соблюдение сроков',
      description: 'Согласуем сроки производства и работаем по плану.',
    },
  ],
};
