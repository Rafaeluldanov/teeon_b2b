/* /contacts/ — full Contacts page in v6 style */

const { HeaderV6, FooterV6 } = window;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakSlider } = window;

const contactsData = {
  phone: '+7 (495) 000-00-00',
  phoneRaw: '+74950000000',
  email: 'hello@teeon.ru',
  telegram: '@teeon',
  telegramUrl: 'https://t.me/teeon',
  whatsapp: '+7 (495) 000-00-00',
  whatsappUrl: 'https://wa.me/74950000000',
  city: 'Москва',
  address: 'Москва, ул. Промзона, 12',
  schedule: 'Пн–Пт · 9:00–19:00',
  scheduleNote: 'Заявки принимаем круглосуточно — отвечаем в начале следующего рабочего дня.',
  legalName: 'ООО «ТИОН»',
  inn: '7700000000',
  ogrn: '1027700000000',
};

const contactMethods = [
  { ic: '📞', title: 'Телефон',  value: contactsData.phone,        href: `tel:${contactsData.phoneRaw}`, d: 'Пн–Пт · 9:00–19:00 — звонки и SMS' },
  { ic: '✉️', title: 'Email',     value: contactsData.email,        href: `mailto:${contactsData.email}`, d: 'Любые файлы, ТЗ, договоры — ответ в течение часа в рабочее время' },
  { ic: '💬', title: 'Telegram',  value: contactsData.telegram,     href: contactsData.telegramUrl, d: 'Быстрые вопросы, образцы, файлы до 100 МБ' },
  { ic: '🟢', title: 'WhatsApp',  value: contactsData.whatsapp,     href: contactsData.whatsappUrl, d: 'Голосовые и быстрая переписка' },
];

const howToItems = [
  { ic: '📋', t: 'Опишите задачу',    d: 'Что нужно: одежда, мерч, сценарий использования.', bg: '' },
  { ic: '🔢', t: 'Укажите тираж',     d: 'Сколько штук, разбивка по позициям и размерам.',   bg: 'yellow' },
  { ic: '📎', t: 'Прикрепите ТЗ',     d: 'Логотип в векторе, брендбук, референсы — всё пригодится.', bg: '' },
  { ic: '📅', t: 'Желаемый срок',     d: 'Дата, к которой нужна готовая партия.',           bg: 'blue' },
];

const attachItems = [
  'Логотип в векторе (AI, EPS, SVG, CDR)',
  'Брендбук или гайд по цветам',
  'Техническое задание (ТЗ) с деталями',
  'Фото / пример желаемого изделия',
  'Размерная сетка для команды',
  'Референсы и образцы',
  'Список сотрудников по размерам',
  'Дедлайн и желаемая дата отгрузки',
];

const faqs = [
  { q: 'Что нужно для расчёта заказа?', a: 'Обычно достаточно: изделие (вид одежды), тираж, логотип или ТЗ, желаемые сроки и пожелания по брендированию. Если чего-то нет — уточним в процессе.' },
  { q: 'Можно ли отправить логотип или ТЗ?', a: 'Да, принимаем файлы через форму на сайте, по email или в мессенджерах. Поддерживаем форматы: AI, EPS, SVG, PDF, PNG, ZIP.' },
  { q: 'Как быстро вы отвечаете на заявку?', a: 'Стараемся ответить в течение часа в рабочее время (Пн–Пт, 9:00–19:00). Если заявка пришла в конце дня или в выходной — ответим в начале следующего рабочего дня.' },
  { q: 'Можно ли приехать на производство?', a: 'Посещение производства согласовывается заранее. Свяжитесь с нами по телефону или в мессенджере, чтобы договориться о визите.' },
  { q: 'Работаете ли с юридическими лицами?', a: 'Да, работаем с юридическими лицами и ИП по договору. Предоставляем счёт, договор и закрывающие документы.' },
  { q: 'Можно ли заказать доставку в другой город?', a: 'Да, отправляем транспортными компаниями по всей России. Стоимость и сроки доставки обсуждаются индивидуально.' },
];

/* ---------- HERO ---------- */
const CnHero = () => (
  <section className="cn-hero">
    <div className="cn-hero__yellow" aria-hidden></div>
    <div className="cn-hero__content">
      <nav className="cn-hero__crumbs" aria-label="breadcrumb">
        <a href="index v6.html">Главная</a>
        <span className="sep">›</span>
        <span className="current">Контакты</span>
      </nav>
      <div className="cn-hero__badges">
        {['Расчёт под тираж', 'Работа с юрлицами', 'Можно прикрепить ТЗ', 'Подбор технологии'].map(b => (
          <span className="cn-hero__badge" key={b}>
            <span className="dot"></span>
            {b}
          </span>
        ))}
      </div>
      <h1>Контакты <em>TEEON</em></h1>
      <p>Свяжитесь удобным способом или&nbsp;оставьте заявку&nbsp;— подберём тираж, ткань, способ нанесения и&nbsp;соберём смету в&nbsp;течение часа.</p>
      <div className="cn-hero__cta">
        <a href="#request" className="btn btn--ink">
          Оставить заявку
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
        <a href="catalog.html" className="btn btn--ghost-d">
          Смотреть каталог
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7 L11 7 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
      </div>
    </div>

    <div className="cn-quick">
      <div className="cn-quick__t">Быстрая связь</div>
      <div className="cn-quick__list">
        {contactMethods.map(m => (
          <a className="cn-quick__row" key={m.title} href={m.href}>
            <span className="cn-quick__ic">{m.ic}</span>
            <div className="cn-quick__main">
              <div className="cn-quick__label">{m.title}</div>
              <div className="cn-quick__val">{m.value}</div>
            </div>
          </a>
        ))}
      </div>
      <div className="cn-quick__sched">
        <strong>График:</strong> {contactsData.schedule}<br />
        {contactsData.scheduleNote}
      </div>
    </div>
  </section>
);

/* ---------- HOW TO ---------- */
const CnHowTo = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(02) — Как ускорить расчёт</div>
        <h2>4 шага <em>до&nbsp;сметы</em></h2>
      </div>
      <p>Чем точнее задача&nbsp;— тем&nbsp;быстрее ответ и&nbsp;точнее цена. Если чего-то нет&nbsp;— ничего страшного, уточним по&nbsp;ходу.</p>
    </div>
    <div className="cn-how">
      {howToItems.map((h, i) => (
        <div className={`cn-how__card ${h.bg}`} key={h.t}>
          <div className="cn-how__num">{String(i + 1).padStart(2, '0')} /</div>
          <span className="cn-how__ic">{h.ic}</span>
          <div className="cn-how__t">{h.t}</div>
          <div className="cn-how__d">{h.d}</div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- REQUEST FORM + ATTACH SIDEBAR ---------- */
const CnRequest = () => {
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 600);
  };
  return (
    <section className="section-spacer" id="request">
      <div className="cn-request">
        <form className="cn-request__form" onSubmit={onSubmit}>
          {sent ? (
            <div style={{ padding: '40px 0 20px', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--yellow)', color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 14 L12 20 L22 8" stroke="currentColor" strokeWidth="2.5"/></svg>
              </div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 8 }}>
                ✓ Заявка принята!
              </div>
              <p style={{ color: 'var(--muted)', maxWidth: 360, margin: '0 auto', fontSize: 14 }}>
                Менеджер свяжется в течение часа в рабочее время.
              </p>
              <button type="button" onClick={() => setSent(false)} className="btn btn--ghost-d" style={{ marginTop: 22 }}>
                Отправить ещё одну
                <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
              </button>
            </div>
          ) : (
            <>
              <div className="cn-request__form-head">Заявка на расчёт</div>
              <div className="cn-request__form-sub">Поля со звёздочкой обязательны. Прикрепить файлы можно прямо в форме.</div>
              <div className="row">
                <div className="field"><label>Имя <span className="req">*</span></label><input type="text" required placeholder="Как к вам обращаться" /></div>
                <div className="field"><label>Телефон <span className="req">*</span></label><input type="tel" required placeholder="+7 (___) ___-__-__" /></div>
              </div>
              <div className="row">
                <div className="field"><label>Email</label><input type="email" placeholder="name@company.ru" /></div>
                <div className="field"><label>Компания</label><input type="text" placeholder="ООО «Название»" /></div>
              </div>
              <div className="row">
                <div className="field">
                  <label>Тема</label>
                  <select defaultValue=""><option value="" disabled>Выберите</option><option>Пошив одежды</option><option>Брендирование</option><option>Welcome-набор</option><option>Сувениры</option><option>Другое</option></select>
                </div>
                <div className="field">
                  <label>Тираж</label>
                  <select defaultValue=""><option value="" disabled>Выберите</option><option>30–100 шт</option><option>100–300 шт</option><option>300–1000 шт</option><option>1000+ шт</option></select>
                </div>
              </div>
              <div className="row row--single">
                <div className="field"><label>Комментарий</label><textarea placeholder="Опишите задачу: цвета, размеры, ТЗ…" rows="3"></textarea></div>
              </div>
              <div className="row row--single">
                <label className="file">
                  <span className="file__icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 3 L4 12 Q1 15 4 18 Q7 21 10 18 L17 11 Q19 9 17 7 Q15 5 13 7 L7 13" stroke="currentColor" strokeWidth="1.5"/></svg></span>
                  <span>Прикрепить файл — логотип, ТЗ, макет (до 10 МБ)</span>
                  <input type="file" hidden />
                </label>
              </div>
              <input type="text" name="website" defaultValue="" tabIndex="-1" autoComplete="off"
                     style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }} />
              <div className="form__submit">
                <button type="submit" className="btn btn--yellow" disabled={loading}>
                  {loading ? 'Отправляем…' : 'Отправить заявку'}
                  <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
                </button>
                <span className="consent">
                  Нажимая, вы соглашаетесь с <a href="#">политикой обработки данных</a>.
                </span>
              </div>
            </>
          )}
        </form>

        <div className="cn-attach">
          <div className="cn-attach__t">Что можно приложить <em>к&nbsp;заявке</em></div>
          <p className="cn-attach__d">Чем больше информации, тем&nbsp;точнее смета. Если чего-то нет&nbsp;— отправьте, что&nbsp;есть, остальное обсудим.</p>
          <ul className="cn-attach__list">
            {attachItems.map(t => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
};

/* ---------- CONTACTS GRID 6 cards ---------- */
const CnContactsGrid = () => {
  const cards = [
    { ic: '📞', t: 'Телефон',   main: <a href={`tel:${contactsData.phoneRaw}`}>{contactsData.phone}</a>, d: 'Пн–Пт · 9:00–19:00', bg: '' },
    { ic: '✉️', t: 'Email',     main: <a href={`mailto:${contactsData.email}`}>{contactsData.email}</a>, d: 'Любые файлы и ТЗ', bg: 'yellow' },
    { ic: '💬', t: 'Telegram',  main: <a href={contactsData.telegramUrl} target="_blank" rel="noopener noreferrer">{contactsData.telegram}</a>, d: 'Образцы, быстрые вопросы', bg: '' },
    { ic: '🟢', t: 'WhatsApp',  main: <a href={contactsData.whatsappUrl} target="_blank" rel="noopener noreferrer">{contactsData.whatsapp}</a>, d: 'Голосовые и переписка', bg: 'blue' },
    { ic: '🕐', t: 'График',    main: <span>{contactsData.schedule}</span>, d: 'Заявки принимаем круглосуточно — ответим в начале следующего рабочего дня', bg: '' },
    { ic: '📍', t: 'Адрес',     main: <span>{contactsData.city}</span>, d: contactsData.address, bg: 'ink' },
  ];
  return (
    <section className="section-spacer">
      <div className="section-head">
        <div>
          <div className="kicker">(04) — Контакты</div>
          <h2>Все <em>способы связи</em></h2>
        </div>
        <p>Выбирайте удобный канал&nbsp;— ответ в&nbsp;течение часа в&nbsp;рабочее время. Срочные вопросы&nbsp;— в&nbsp;Telegram или&nbsp;WhatsApp.</p>
      </div>
      <div className="cn-contacts">
        {cards.map(c => (
          <div className={`cn-card ${c.bg}`} key={c.t}>
            <div className="cn-card__head">
              <span className="cn-card__ic">{c.ic}</span>
              <div className="cn-card__t">{c.t}</div>
            </div>
            <div className="cn-card__main">{c.main}</div>
            <div className="cn-card__d">{c.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ---------- MAP ---------- */
const CnMap = () => (
  <section className="section-spacer">
    <div className="cn-map">
      <div className="cn-map__info">
        <div className="kicker" style={{ marginBottom: 4 }}>(05) — Производство</div>
        <div className="cn-map__t">Адрес <em>цеха</em></div>
        <div className="cn-map__addr">
          <span className="pin">📍</span>
          {contactsData.address}
        </div>
        <p className="cn-map__d">
          Производство в&nbsp;{contactsData.city}е. Посещение&nbsp;— по&nbsp;согласованию, договоритесь по&nbsp;телефону или&nbsp;в&nbsp;Telegram.
        </p>
        <p className="cn-map__d" style={{ fontSize: 12.5, opacity: .7 }}>
          После уточнения адреса здесь можно разместить интерактивную карту.
        </p>
      </div>
      <div className="cn-map__placeholder">
        <div className="cn-map__pin"><span>📍</span></div>
      </div>
    </div>
  </section>
);

/* ---------- LEGAL ---------- */
const CnLegal = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(06) — Юрлица</div>
        <h2>Работа <em>с&nbsp;юридическими лицами</em></h2>
      </div>
      <p>Договор, счёт, акт или УПД, полное согласование ТЗ. Работаем с&nbsp;ООО и&nbsp;ИП, отсрочка платежа при&nbsp;повторных заказах.</p>
    </div>
    <div className="cn-legal">
      <div className="cn-legal__col yellow">
        <div className="cn-legal__t">Стандартный B2B-пакет</div>
        <p className="cn-legal__d">Полный комплект документов для&nbsp;бухгалтерии и&nbsp;юр-отдела. Маркировка партий для&nbsp;WB/Ozon&nbsp;— по&nbsp;запросу.</p>
        <ul className="cn-legal__list">
          <li>Договор на производство</li>
          <li>Счёт на оплату</li>
          <li>Акт или УПД (закрывающие документы)</li>
          <li>Согласование ТЗ и образца</li>
        </ul>
      </div>

      <div className="cn-legal__col">
        <div className="cn-legal__t">Реквизиты</div>
        <p className="cn-legal__d">Базовые реквизиты для&nbsp;договора. Полные реквизиты с&nbsp;банковскими реквизитами и&nbsp;адресами&nbsp;— по&nbsp;ссылке ниже.</p>
        <div className="cn-legal__req">
          <div className="cn-legal__req-row">
            <span className="l">Юр. лицо</span>
            <span className="v">{contactsData.legalName}</span>
          </div>
          <div className="cn-legal__req-row">
            <span className="l">ИНН</span>
            <span className="v">{contactsData.inn}</span>
          </div>
          <div className="cn-legal__req-row">
            <span className="l">ОГРН</span>
            <span className="v">{contactsData.ogrn}</span>
          </div>
        </div>
        <div className="cn-legal__actions">
          <a href="#" className="btn btn--ghost-d">
            Страница реквизитов
            <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
          </a>
          <a href="#request" className="btn btn--ink">
            Запросить расчёт
            <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- FAQ ---------- */
const CnFaq = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section-spacer" id="faq">
      <div className="section-head">
        <div>
          <div className="kicker">(07) — FAQ</div>
          <h2>Частые <em>вопросы</em></h2>
        </div>
        <p>Шесть вопросов о&nbsp;контактах и&nbsp;процессе оформления заявки. На&nbsp;остальные&nbsp;— в&nbsp;чате.</p>
      </div>
      <div className="faq-wrap">
        {faqs.map((f, i) => (
          <div className={`qa ${open === i ? 'open' : ''}`} key={i}>
            <button className="qa__btn" onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={open === i} aria-controls={`cn-qa-${i}`}>
              <span className="qa__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="qa__q">{f.q}</span>
              <span className="qa__t">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2 L8 14 M2 8 L14 8" stroke="currentColor" strokeWidth="1.8"/></svg>
              </span>
            </button>
            <div className="qa__a" id={`cn-qa-${i}`} hidden={open !== i}>
              <div><div className="qa__body">{f.a}</div></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ---------- CTA ---------- */
const CnCta = () => (
  <section className="cta-block section-spacer">
    <div>
      <h2>Готовы обсудить <em>проект</em>?</h2>
      <p>Заполните форму или&nbsp;свяжитесь удобным способом. Менеджер ответит в&nbsp;течение часа.</p>
    </div>
    <a href="#request" className="btn btn--yellow cta-block__btn">
      Заполнить заявку
      <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
    </a>
  </section>
);

/* ---------- JSON-LD ---------- */
function injectJsonLD() {
  const breadcrumbs = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "/" },
      { "@type": "ListItem", "position": 2, "name": "Контакты", "item": "/contacts/" },
    ],
  };
  const org = {
    "@context": "https://schema.org", "@type": "Organization",
    "name": "TEEON", "url": "/",
    "telephone": contactsData.phoneRaw, "email": contactsData.email,
    "address": { "@type": "PostalAddress", "addressLocality": contactsData.city, "streetAddress": contactsData.address },
  };
  const faq = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
  };
  [breadcrumbs, org, faq].forEach(obj => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  });
}

/* ---------- APP ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "yellow": "#FFD60A", "blue": "#1B3FCA", "ink": "#0A0E1A", "radius": 28
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--yellow', t.yellow);
    r.setProperty('--blue', t.blue);
    r.setProperty('--ink', t.ink);
    r.setProperty('--rad', t.radius + 'px');
  }, [t]);
  React.useEffect(() => { injectJsonLD(); }, []);

  return (
    <div className="page">
      <HeaderV6 />
      <CnHero />
      <CnHowTo />
      <CnRequest />
      <CnContactsGrid />
      <CnMap />
      <CnLegal />
      <CnFaq />
      <CnCta />
      <FooterV6 />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Палитра">
          <TweakColor label="Жёлтый" value={t.yellow} onChange={v => setTweak('yellow', v)}
            options={['#FFD60A', '#FFC907', '#FFE34F']} />
          <TweakColor label="Синий" value={t.blue} onChange={v => setTweak('blue', v)}
            options={['#1B3FCA', '#2240FF', '#0033CC']} />
          <TweakColor label="Чёрный" value={t.ink} onChange={v => setTweak('ink', v)}
            options={['#0A0E1A', '#000000']} />
        </TweakSection>
        <TweakSection label="Форма">
          <TweakSlider label="Скругление" value={t.radius} min={12} max={48} step={2}
            onChange={v => setTweak('radius', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
