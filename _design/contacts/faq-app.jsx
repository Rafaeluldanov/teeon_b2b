/* /faq/ — FAQ hub with 3 categories (Home / Branding / Contacts) */

const { HeaderV6, FooterV6 } = window;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakSlider } = window;

const categories = [
  {
    id: 'common', shortLabel: 'Общие', anchor: 'common',
    title: 'Общие вопросы',
    desc: 'Тираж, образец, сроки, способы нанесения и работа с юрлицами — основные вопросы перед первым заказом.',
    questions: [
      { q: 'Какой минимальный тираж?',
        a: 'Минимальный тираж зависит от изделия и способа нанесения. Для большинства позиций мы работаем от небольших партий — от 30 шт. На DTF, DTG и лазерной гравировке — от 1 шт. Уточните детали в заявке, подберём оптимальное решение под ваш тираж.' },
      { q: 'Можно ли заказать образец?',
        a: 'Да, перед запуском серийной партии мы согласовываем pre-production sample — образец, точно соответствующий тому, что вы получите в партии. Это 3–5 рабочих дней. Стоимость образца входит в смету при тираже от 100 шт.' },
      { q: 'Какие сроки производства?',
        a: 'Сроки зависят от изделия, тиража, сложности нанесения и текущей загрузки производства. В среднем от 10 до 14 рабочих дней. Срочные партии до 100 шт. — 5–7 дней с приоритетом. Точные сроки указываем после согласования заказа.' },
      { q: 'Какие способы брендирования доступны?',
        a: 'Девять методов: вышивка, шевроны, шелкография, DTF-печать, DTG-печать, сублимация, тиснение, лазерная гравировка и тканые бирки. Подбираем способ под ткань, тираж и эффект — обсудим 2–3 варианта на консультации.' },
      { q: 'Работаете ли с юридическими лицами?',
        a: 'Да, работаем только с юридическими лицами и ИП по договору. Предоставляем полный комплект закрывающих документов: договор, счёт, товарная накладная или УПД. При повторных заказах — отсрочка платежа до 14 дней.' },
      { q: 'Можно ли доставить заказ в другой город?',
        a: 'Да, мы отправляем заказы транспортными компаниями в любой регион России (Деловые Линии, Байкал, ПЭК, СДЭК). Стоимость и сроки доставки рассчитываются при оформлении заказа. По Москве — собственный курьер.' },
    ],
  },
  {
    id: 'branding', shortLabel: 'Брендирование', anchor: 'branding',
    title: 'Брендирование и нанесение',
    desc: 'Какой метод выбрать, что нужно для расчёта, какие файлы готовить — вопросы про технологии нанесения логотипа.',
    questions: [
      { q: 'Какой способ брендирования выбрать?',
        a: 'Это зависит от изделия, ткани, тиража и логотипа. Расскажите задачу — предложим подходящую технологию. На простых логотипах от 200 шт. обычно выгоднее шелкография; на малотиражах и сложной графике — DTF или DTG; на премиум-мерче — вышивка или тиснение.' },
      { q: 'Можно ли нанести логотип на готовые изделия?',
        a: 'Да, выполняем брендирование на готовых изделиях (заказчик присылает свои изделия). Уточните позицию, материал и желаемый способ — проверим совместимость технологии с тканью и фурнитурой.' },
      { q: 'Делаете ли образец перед тиражом?',
        a: 'Да, для большинства технологий делаем тестовое нанесение до запуска серийной партии. На вышивке — программирование стежка и пробный оттиск; на шелкографии — отдельный тестовый отпечаток с тиража.' },
      { q: 'Что нужно для расчёта брендирования?',
        a: 'Укажите изделие, тираж, логотип (желательно в векторе AI/SVG/EPS) и место нанесения (грудь, спина, рукав, капюшон). Чем точнее ТЗ — тем точнее смета. Если макета нет — наш дизайнер подготовит за 2–3 часа.' },
      { q: 'Какие файлы нужны для макета?',
        a: 'Векторный файл: AI, EPS, SVG или CDR — для шелкографии, вышивки, тиснения. Для DTF/DTG — PNG от 300 dpi с прозрачным фоном. Для сублимации — векторный файл или полноразмерный PNG под раскрой.' },
      { q: 'Можно ли совместить несколько технологий?',
        a: 'Да, часто комбинируем. Например, вышивка + бирки, шелкография + шевроны, тиснение бирки + DTF на корпусе. Итоговый набор согласовываем по задаче и бюджету — на консультации подскажем оптимальную комбинацию.' },
    ],
  },
  {
    id: 'contacts', shortLabel: 'Контакты', anchor: 'contacts',
    title: 'Контакты и расчёт',
    desc: 'Как отправить заявку, какие документы, скорость ответа, можно ли приехать на производство.',
    questions: [
      { q: 'Что нужно для расчёта заказа?',
        a: 'Обычно достаточно: изделие (вид одежды), тираж, логотип или ТЗ, желаемые сроки и пожелания по брендированию. Если чего-то нет — уточним в процессе. Менеджер свяжется в течение часа в рабочее время.' },
      { q: 'Можно ли отправить логотип или ТЗ?',
        a: 'Да, принимаем файлы через форму на сайте, по email или в мессенджерах. Поддерживаем форматы: AI, EPS, SVG, PDF, PNG, ZIP. Размер — до 10 МБ через форму, больше — через файлообменник или Telegram.' },
      { q: 'Как быстро вы отвечаете на заявку?',
        a: 'Стараемся ответить в течение часа в рабочее время (Пн–Пт, 9:00–19:00). Если заявка пришла в конце дня или в выходной — ответим в начале следующего рабочего дня. Срочные запросы — пометьте в комментарии «Срочно».' },
      { q: 'Можно ли приехать на производство?',
        a: 'Посещение производства согласовывается заранее. Свяжитесь с нами по телефону или в мессенджере, чтобы договориться о визите. Покажем швейный цех, оборудование, расскажем про процесс. По договорённости — пропустим в зону нанесения.' },
      { q: 'Работаете ли с юридическими лицами?',
        a: 'Да, работаем с юридическими лицами и ИП по договору. Предоставляем счёт, договор и закрывающие документы (товарная накладная или УПД). При повторных заказах — отсрочка платежа до 14 дней.' },
      { q: 'Можно ли заказать доставку в другой город?',
        a: 'Да, отправляем транспортными компаниями по всей России (Деловые Линии, Байкал, ПЭК, СДЭК). Стоимость и сроки доставки обсуждаются индивидуально в зависимости от региона и объёма заказа. При необходимости — маркировка для маркетплейсов.' },
    ],
  },
];

/* ---------- HERO ---------- */
const totalQ = categories.reduce((s, c) => s + c.questions.length, 0);

const FqHero = () => (
  <section className="fq-hero">
    <div className="fq-hero__yellow" aria-hidden></div>
    <div className="fq-hero__content">
      <nav className="fq-hero__crumbs" aria-label="breadcrumb">
        <a href="index v6.html">Главная</a>
        <span className="sep">›</span>
        <span className="current">FAQ</span>
      </nav>
      <h1>Частые <span className="hl">вопросы</span></h1>
      <p>Ответы на&nbsp;<em style={{ color: 'var(--blue)', fontStyle: 'normal', fontWeight: 700 }}>{totalQ} вопросов</em> о&nbsp;пошиве, брендировании и&nbsp;работе с&nbsp;B2B-заказами. Если не&nbsp;нашли ответ&nbsp;— напишите менеджеру.</p>
      <div className="fq-hero__cta">
        <a href="index v6.html#request" className="btn btn--ink">
          Задать вопрос менеджеру
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
        <a href="index v6.html#request" className="btn btn--ghost-d">
          Рассчитать заказ
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7 L11 7 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
      </div>
    </div>
    <div className="fq-hero__stats">
      <div className="fq-hero__stat yellow">
        <div className="l">Вопросов</div>
        <div className="v">{totalQ}</div>
        <div className="d">в&nbsp;3&nbsp;категориях</div>
      </div>
      <div className="fq-hero__stat">
        <div className="l">Тираж</div>
        <div className="v">от 30<span className="u">шт</span></div>
        <div className="d">минимум на&nbsp;позицию</div>
      </div>
      <div className="fq-hero__stat ink">
        <div className="l">Ответ</div>
        <div className="v" style={{ color: 'var(--yellow)' }}>1<span className="u" style={{ color: 'var(--paper)' }}>час</span></div>
        <div className="d" style={{ opacity: .7 }}>в&nbsp;рабочее время</div>
      </div>
      <div className="fq-hero__stat blue">
        <div className="l">Производство</div>
        <div className="v">10–14<span className="u">дн.</span></div>
        <div className="d" style={{ opacity: .85 }}>стандартный срок</div>
      </div>
    </div>
  </section>
);

/* ---------- JUMP NAV ---------- */
const FqJump = () => (
  <section className="section-spacer">
    <div className="fq-jump">
      <span className="fq-jump__lead">Разделы:</span>
      {categories.map(c => (
        <a className="fq-jump__btn" key={c.id} href={`#${c.anchor}`}>
          {c.shortLabel}
          <span className="cnt">{c.questions.length}</span>
        </a>
      ))}
      <span className="fq-jump__count">Всего: {totalQ}</span>
    </div>
  </section>
);

/* ---------- CATEGORY ---------- */
const FqCategory = ({ cat, defaultOpenFirst = false }) => {
  const [open, setOpen] = React.useState(defaultOpenFirst ? 0 : -1);
  return (
    <section className="section-spacer" id={cat.anchor}>
      <div className="fq-cat">
        <div className="fq-cat__head">
          <div>
            <span className="fq-cat__ic">
              <span className="badge">{cat.questions.length}</span>
              {cat.shortLabel}
            </span>
            <div className="fq-cat__title">{cat.title.split(' ').map((w, i, arr) =>
              i === arr.length - 1 ? <em key={i}>{w}</em> : <React.Fragment key={i}>{w} </React.Fragment>
            )}</div>
          </div>
          <p className="fq-cat__d">{cat.desc}</p>
        </div>
        <dl className="fq-list">
          {cat.questions.map((qa, i) => {
            const isOpen = open === i;
            return (
              <div className={`fq-qa ${isOpen ? 'open' : ''}`} key={i}>
                <dt>
                  <button
                    className="fq-qa__btn"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${cat.id}-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="fq-qa__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="fq-qa__q">{qa.q}</span>
                    <span className="fq-qa__t" aria-hidden>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2 L8 14 M2 8 L14 8" stroke="currentColor" strokeWidth="1.8"/>
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd id={`${cat.id}-a-${i}`} className="fq-qa__a" hidden={!isOpen}>
                  <div>
                    <div className="fq-qa__body">{qa.a}</div>
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
};

/* ---------- ASK MORE ---------- */
const channels = [
  { ic: '📞', t: '+7 (495) 000-00-00',  d: 'Пн–Пт · 9:00–19:00',           href: 'tel:+74950000000' },
  { ic: '✉️', t: 'hello@teeon.ru',       d: 'Ответ в течение часа',          href: 'mailto:hello@teeon.ru' },
  { ic: '💬', t: 'Telegram @teeon',      d: 'Срочные вопросы и образцы',     href: 'https://t.me/teeon' },
];

const FqAsk = () => (
  <section className="section-spacer">
    <div className="fq-ask">
      <div className="fq-ask__content">
        <h2>Не&nbsp;нашли <em>ответ</em>?</h2>
        <p>Напишите менеджеру&nbsp;— ответим в&nbsp;течение часа в&nbsp;рабочее время. Срочные вопросы можно отправить в&nbsp;Telegram или WhatsApp с&nbsp;файлами до&nbsp;100 МБ.</p>
      </div>
      <div className="fq-ask__channels">
        {channels.map(c => (
          <a className="fq-ask__channel" key={c.t} href={c.href}>
            <span className="ic">{c.ic}</span>
            <div className="main">
              <div className="t">{c.t}</div>
              <div className="d">{c.d}</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
          </a>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- JSON-LD ---------- */
function injectJsonLD() {
  const breadcrumbs = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "/" },
      { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "/faq/" },
    ],
  };
  const allQa = categories.flatMap(c => c.questions);
  const faq = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": allQa.map(qa => ({
      "@type": "Question", "name": qa.q,
      "acceptedAnswer": { "@type": "Answer", "text": qa.a },
    })),
  };
  [breadcrumbs, faq].forEach(obj => {
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
      <FqHero />
      <FqJump />
      {categories.map((c, i) => (
        <FqCategory key={c.id} cat={c} defaultOpenFirst={i === 0} />
      ))}
      <FqAsk />
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
