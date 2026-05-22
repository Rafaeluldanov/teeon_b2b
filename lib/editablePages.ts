export interface EditableTextBlock {
  id: string;
  title: string;
  subtitle?: string;
  text: string;
  image?: string;
  isActive: boolean;
}

export interface EditableFaqItem {
  question: string;
  answer: string;
}

export interface EditablePageContent {
  slug: string;
  label: string;
  url: string;
  h1: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  blocks: EditableTextBlock[];
  faq: EditableFaqItem[];
  isActive: boolean;
}

export const editablePages: EditablePageContent[] = [
  {
    slug: 'home',
    label: 'Главная',
    url: '/',
    h1: 'Создаём мерч, который носят не только в офисе',
    title: 'Пошив промо-одежды и мерча на заказ | TEEON',
    description: 'Пошив промо-одежды и корпоративного мерча на заказ: футболки, худи, свитшоты, сумки, жилетки, куртки.',
    seoTitle: 'Пошив промо-одежды и мерча на заказ | TEEON',
    seoDescription: 'Пошив промо-одежды и корпоративного мерча на заказ: футболки, худи, свитшоты, сумки, жилетки, куртки. Собственный цех, брендирование, B2B-заказы под ключ.',
    blocks: [],
    faq: [
      { question: 'Какой минимальный тираж?', answer: 'Минимальный тираж зависит от изделия и способа нанесения.' },
      { question: 'Можно ли заказать образец?', answer: 'Да, перед запуском серийной партии мы согласовываем образец.' },
      { question: 'Какие сроки производства?', answer: 'В среднем от 10 до 25 рабочих дней.' },
    ],
    isActive: true,
  },
  {
    slug: 'catalog',
    label: 'Каталог',
    url: '/catalog/',
    h1: 'Каталог промо-одежды и мерча',
    title: 'Каталог промо-одежды и корпоративного мерча на заказ | TEEON',
    description: 'Выберите категорию изделий для пошива и брендирования.',
    seoTitle: 'Каталог промо-одежды и корпоративного мерча на заказ | TEEON',
    seoDescription: 'Каталог промо-одежды на заказ: футболки, худи, свитшоты, лонгсливы, сумки, жилетки, куртки, дождевики.',
    blocks: [],
    faq: [],
    isActive: true,
  },
  {
    slug: 'branding',
    label: 'Брендирование',
    url: '/branding/',
    h1: 'Брендирование и персонализация одежды',
    title: 'Брендирование и нанесение логотипа на одежду | TEEON',
    description: 'Наносим логотипы и фирменные элементы на одежду и аксессуары.',
    seoTitle: 'Брендирование одежды: вышивка, печать, нанесение логотипа | TEEON',
    seoDescription: 'Машинная вышивка, шелкография, DTF, DTG, сублимация, тиснение, гравировка, шевроны и брендированные бирки.',
    blocks: [],
    faq: [],
    isActive: true,
  },
  {
    slug: 'portfolio',
    label: 'Портфолио',
    url: '/portfolio/',
    h1: 'Портфолио: наши работы и кейсы',
    title: 'Портфолио — кейсы по пошиву промо-одежды и мерча | TEEON',
    description: 'Примеры реализованных проектов: промо-одежда, мерч, брендированная форма.',
    seoTitle: 'Портфолио — кейсы по пошиву промо-одежды и мерча | TEEON',
    seoDescription: 'Примеры выполненных заказов: корпоративный мерч, форма персонала, промо-одежда для мероприятий.',
    blocks: [],
    faq: [],
    isActive: true,
  },
  {
    slug: 'about',
    label: 'О компании',
    url: '/about/',
    h1: 'О компании TEEON',
    title: 'О компании — производство промо-одежды и мерча | TEEON',
    description: 'TEEON — производственная компания для B2B-заказов промо-одежды и мерча.',
    seoTitle: 'О компании TEEON — производство промо-одежды',
    seoDescription: 'TEEON — производственная компания: собственный швейный цех, брендирование, B2B-заказы под ключ.',
    blocks: [],
    faq: [],
    isActive: true,
  },
  {
    slug: 'contacts',
    label: 'Контакты',
    url: '/contacts/',
    h1: 'Контакты',
    title: 'Контакты — TEEON',
    description: 'Свяжитесь с нами для расчёта заказа.',
    seoTitle: 'Контакты — TEEON | Пошив промо-одежды',
    seoDescription: 'Контакты TEEON: телефон, email, Telegram, WhatsApp. Оставьте заявку на расчёт стоимости.',
    blocks: [],
    faq: [],
    isActive: true,
  },
  {
    slug: 'privacy',
    label: 'Политика ПД',
    url: '/privacy/',
    h1: 'Политика обработки персональных данных',
    title: 'Политика обработки персональных данных | TEEON',
    description: 'Политика конфиденциальности и обработки персональных данных.',
    seoTitle: 'Политика обработки персональных данных | TEEON',
    seoDescription: 'Политика конфиденциальности компании TEEON.',
    blocks: [],
    faq: [],
    isActive: true,
  },
  {
    slug: 'requisites',
    label: 'Реквизиты',
    url: '/requisites/',
    h1: 'Реквизиты компании',
    title: 'Реквизиты | TEEON',
    description: 'Юридические реквизиты компании TEEON.',
    seoTitle: 'Реквизиты | TEEON',
    seoDescription: 'Юридические реквизиты компании TEEON.',
    blocks: [],
    faq: [],
    isActive: true,
  },
];
