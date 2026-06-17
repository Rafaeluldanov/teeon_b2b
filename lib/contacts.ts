export interface ContactMethod {
  icon: string;
  title: string;
  value: string;
  href: string;
  description: string;
}

export interface LegalInfo {
  legalName: string;
  inn: string;
  ogrn: string;
}

export interface ContactsData {
  email: string;
  phone: string;
  phoneRaw: string;
  /** Телефон менеджера для мессенджера MAX (отображаемый формат). */
  maxPhone: string;
  /** Тот же номер без форматирования, только цифры. */
  maxPhoneRaw: string;
  /** Подтверждённый URL профиля/бота/чата менеджера в MAX. Если пусто —
   *  используется официальный share-deeplink (https://max.ru/:share?text=…). */
  maxUrl: string;
  /** Телефон менеджера для Telegram (отображаемый формат). */
  telegramPhone: string;
  /** Тот же номер без форматирования, только цифры. */
  telegramPhoneRaw: string;
  /** Подтверждённый @username/ссылка на чат менеджера в Telegram (имеет приоритет).
   *  Если пусто — формируется официальная ссылка по номеру (https://t.me/+<phone>). */
  telegramUrl: string;
  city: string;
  address: string;
  schedule: string;
  companyName: string;
  descriptor: string;
  legalInfo: LegalInfo;
  contactMethods: ContactMethod[];
  requestTopics: string[];
  quantityOptions: string[];
  deadlineOptions: string[];
  preferredContactOptions: string[];
}

export const contacts: ContactsData = {
  email: 'teeon@upgifts.ru',
  phone: '+7 (495) 152-37-45',
  phoneRaw: '74951523745',
  // Менеджер в MAX. Официального deeplink «написать по номеру» у MAX нет,
  // поэтому maxUrl оставляем пустым → используется share-deeplink с этим номером
  // в тексте. Если появится подтверждённая ссылка на профиль/бота — вписать в maxUrl.
  maxPhone: '+7 903 017-98-20',
  maxPhoneRaw: '79030179820',
  maxUrl: '',
  // Менеджер в Telegram. Прямая ссылка по номеру (https://t.me/+<phone>) открывает
  // чат с этим номером. Если появится @username — вписать сюда (имеет приоритет).
  telegramPhone: '+7 903 017-98-20',
  telegramPhoneRaw: '79030179820',
  telegramUrl: '',
  city: 'Москва',
  address: 'Москва, 2-й Грайвороновский проезд, 48',
  schedule: 'Пн–Пт, 10:00–19:00',
  companyName: 'TEEON',
  descriptor: 'Пошив промо-одежды и корпоративного мерча под ключ',

  legalInfo: {
    legalName: 'ИП Ульданов Рафаэль Айратович',
    inn: '026507818527',
    ogrn: '321028000162059',
  },

  contactMethods: [
    {
      icon: '📞',
      title: 'Телефон',
      value: '+7 (495) 152-37-45',
      href: 'tel:+74951523745',
      description: 'Позвоните в рабочее время',
    },
    {
      icon: '✉️',
      title: 'Email',
      value: 'teeon@upgifts.ru',
      href: 'mailto:teeon@upgifts.ru',
      description: 'Можно прислать ТЗ и логотип',
    },
  ],

  requestTopics: [
    'Пошив промо-одежды',
    'Брендирование готовых изделий',
    'Корпоративный мерч',
    'Welcome-набор',
    'Форма для персонала',
    'Промо-одежда для мероприятия',
    'Другое',
  ],

  quantityOptions: [
    'до 50 изделий',
    '50–100 изделий',
    '100–300 изделий',
    '300–500 изделий',
    '500+ изделий',
    'пока не знаю',
  ],

  deadlineOptions: [
    'срочно',
    '1–2 недели',
    '2–4 недели',
    '1–2 месяца',
    'срок обсуждается',
  ],

  preferredContactOptions: [
    'Телефон',
    'Email',
  ],
};
