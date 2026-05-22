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
    'TEEON — производственная компания для B2B-заказов: шьём промо-одежду, корпоративный мерч и брендированные изделия, наносим логотипы и готовим партии к выдаче или доставке.',
  fullDescription:
    'Мы занимаемся пошивом промо-одежды и корпоративного мерча для компаний. Работаем с B2B-заказами: подбираем изделия под задачу, разрабатываем дизайн и макет, шьём партию, наносим логотип и готовим заказ к выдаче или доставке. У нас есть собственный швейный цех и оборудование для персонализации — это позволяет вести весь проект внутри одной производственной цепочки и контролировать качество, сроки и соответствие партии согласованному образцу.',

  productionFacts: [
    { icon: '🏭', value: 'Собственный швейный цех', label: 'Полный цикл пошива и раскроя' },
    { icon: '🎨', value: 'Брендирование', label: 'Нанесение логотипов внутри производства' },
    { icon: '✅', value: 'Образец перед тиражом', label: 'Согласуем результат до запуска партии' },
    { icon: '🏢', value: 'B2B под ключ', label: 'От расчёта до упаковки и отгрузки' },
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
      icon: '✂️',
      name: 'Швейное оборудование',
      description:
        'Обеспечивает пошив изделий нужного кроя, плотности и качества — под задачу клиента и выбранную ткань.',
    },
    {
      icon: '📐',
      name: 'Раскройное оборудование',
      description:
        'Точный раскрой ткани под размерную сетку заказа с минимальными потерями и стабильными размерами.',
    },
    {
      icon: '🪡',
      name: 'Вышивальное оборудование',
      description:
        'Нанесение логотипов, монограмм и фирменных знаков методом машинной вышивки по согласованной оцифровке.',
    },
    {
      icon: '🖨',
      name: 'Оборудование для печати и переноса',
      description:
        'DTF-печать, шелкография и другие методы нанесения изображений на текстиль — без ограничений по цветности.',
    },
    {
      icon: '🔥',
      name: 'Термопресс и тиснение',
      description:
        'Тиснение по коже, плотным тканям и упаковке. Фольгирование и сухое тиснение под брендинг.',
    },
    {
      icon: '📦',
      name: 'Упаковка и маркировка',
      description:
        'Брендированные бирки, комплектация партии и упаковка к выдаче, отправке или хранению.',
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
      title: 'Бриф и задача',
      description: 'Получаем от вас техническое задание: что шить, тираж, сроки, логотип и особые требования.',
    },
    {
      num: '02',
      title: 'Подбор изделий и материалов',
      description: 'Предлагаем подходящие изделия, ткани, цвета и размерную сетку под задачу и бюджет.',
    },
    {
      num: '03',
      title: 'Расчёт и коммерческое предложение',
      description: 'Рассчитываем стоимость пошива, брендирования, упаковки и доставки с указанием сроков.',
    },
    {
      num: '04',
      title: 'Макет и образец',
      description: 'Готовим макет нанесения и при необходимости тестовый образец для согласования.',
    },
    {
      num: '05',
      title: 'Пошив и брендирование',
      description: 'Производим партию и наносим логотип на собственном оборудовании.',
    },
    {
      num: '06',
      title: 'Контроль качества',
      description: 'Проверяем каждую единицу на соответствие согласованным параметрам и образцу.',
    },
    {
      num: '07',
      title: 'Упаковка и отгрузка',
      description: 'Комплектуем, упаковываем и отправляем заказ транспортной компанией или готовим к самовывозу.',
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
    { label: 'Производственный формат', value: 'под ключ', bg: 'yellow' },
    { label: 'Тип заказов', value: 'B2B', bg: '' },
    { label: 'Контроль', value: 'образец + партия', bg: 'blue' },
    { label: 'География', value: 'доставка по РФ', bg: '' },
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
