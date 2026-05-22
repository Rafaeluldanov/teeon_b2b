/* /suvenirnaya-produkciya/ — Souvenirs hub, links out to UP Gifts */

const { HeaderV6, FooterV6 } = window;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakSlider } = window;

const giftsData = {
  externalUrl: 'https://upgifts.ru/',
  externalLabel: 'Перейти в каталог UP Gifts',
  h1Pre: 'Сувенирная продукция ',
  h1Em: 'для бизнеса',
  shortDescription:
    'Корпоративные подарки, бизнес-сувениры и подарочные наборы с логотипом для компаний. Сувенирное направление ведётся через отдельный каталог UP Gifts.',
  whyParagraphs: [
    'TEEON фокусируется на пошиве промо-одежды, корпоративного мерча и брендированной одежды.',
    'Сувенирная продукция, корпоративные подарки и бизнес-сувениры представлены в отдельном каталоге UP Gifts, чтобы клиент мог подобрать одежду, мерч и подарки под одну B2B-задачу — в одном окне, у одного менеджера.',
  ],
  badges: [
    'Корпоративные подарки',
    'Бизнес-сувениры',
    'Брендирование логотипом',
    'Каталог UP Gifts',
  ],
  heroTiles: [
    { ic: '🎁', t: 'Подарочные наборы',  bg: '' },
    { ic: '☕', t: 'Кружки и термосы',    bg: 'yellow' },
    { ic: '📓', t: 'Ежедневники',         bg: 'mint' },
    { ic: '📦', t: 'Упаковка',             bg: '' },
  ],
  categories: [
    { t: 'Корпоративные подарки', d: 'Подарки сотрудникам, партнёрам и клиентам с фирменной символикой компании.', ic: '🎁', bg: '' },
    { t: 'Бизнес-сувениры',        d: 'Практичные и представительные сувениры для деловых встреч, выставок и конференций.', ic: '👔', bg: 'yellow' },
    { t: 'Подарочные наборы',      d: 'Готовые наборы из нескольких позиций, скомплектованные под конкретную задачу или событие.', ic: '🎀', bg: '' },
    { t: 'Кружки и термокружки',   d: 'Брендированные кружки, термокружки и термосы — востребованные позиции для корпоративных подарков.', ic: '☕', bg: 'blue' },
    { t: 'Ежедневники и блокноты', d: 'Фирменные ежедневники, блокноты и записные книжки с логотипом компании.', ic: '📓', bg: '' },
    { t: 'Ручки и канцелярия',     d: 'Брендированные ручки, карандаши и канцелярские наборы — классика корпоративных подарков.', ic: '✒️', bg: '' },
    { t: 'Текстиль и аксессуары',  d: 'Брендированные шарфы, кепки, зонты и другие текстильные аксессуары.', ic: '🧣', bg: 'ink' },
    { t: 'Упаковка для подарков',  d: 'Фирменная упаковка, коробки, пакеты и наполнители для оформления подарочных наборов.', ic: '📦', bg: '' },
  ],
  advantages: [
    'Отдельный каталог сувениров',
    'Подбор под бюджет и задачу',
    'Брендирование логотипом',
    'Решения для сотрудников и партнёров',
    'Подарки для мероприятий',
    'Сборка наборов',
  ],
  scenarios: [
    { t: 'Подарки сотрудникам',      d: 'Комплектные подарки к праздникам, юбилеям и корпоративным событиям.', bg: '' },
    { t: 'Подарки партнёрам',         d: 'Представительные бизнес-сувениры для клиентов, контрагентов и деловых партнёров.', bg: 'yellow' },
    { t: 'Сувениры для выставок',     d: 'Раздаточная и представительская продукция для стендов, конференций и отраслевых мероприятий.', bg: '' },
    { t: 'Welcome-наборы',            d: 'Приветственные наборы для новых сотрудников — в связке с мерчем TEEON.', bg: 'blue' },
    { t: 'Подарки к праздникам',       d: 'Новый год, 23 февраля, 8 марта и другие праздники — подбираем наборы под бюджет и тематику.', bg: '' },
    { t: 'Промо-наборы для событий',  d: 'Брендированные наборы для городских событий, фестивалей и промо-акций.', bg: 'ink' },
  ],
  bundles: [
    { t: 'Одежда + сувениры для конференции', ic: '🎤', bg: '',
      d: 'Футболки или свитшоты с логотипом от TEEON плюс брендированные ежедневники, ручки и сумки от UP Gifts — единый набор участника или спикера.',
      teeonLinks: [
        { label: 'Футболки',   href: 'category.html?slug=futbolki' },
        { label: 'Свитшоты',   href: 'category.html?slug=svitshoty' },
        { label: 'Шелкография', href: 'branding-method.html?slug=shelkografiya' },
      ] },
    { t: 'Welcome-набор для новых сотрудников', ic: '👋', bg: 'yellow',
      d: 'Худи или свитшот с вышивкой от TEEON плюс ежедневник, термокружка и ручка от UP Gifts — всё в одной фирменной упаковке.',
      teeonLinks: [
        { label: 'Худи',    href: 'category.html?slug=hudi' },
        { label: 'Вышивка', href: 'branding-method.html?slug=vyshivka' },
        { label: 'Бирки',   href: 'branding-method.html?slug=birki' },
      ] },
    { t: 'Подарки партнёрам + брендированная упаковка', ic: '🤝', bg: 'blue',
      d: 'Брендированные аксессуары, кружки и наборы от UP Gifts в фирменной упаковке — дополняются одеждой или шопперами с логотипом от TEEON.',
      teeonLinks: [
        { label: 'Сумки и шопперы', href: 'category.html?slug=sumki' },
        { label: 'DTF-печать',       href: 'branding-method.html?slug=dtf-pechat' },
      ] },
    { t: 'Мерч для выставки + промо-сувениры', ic: '🏷️', bg: '',
      d: 'Футболки, жилетки и куртки для персонала стенда от TEEON плюс раздаточные сувениры и бизнес-подарки для гостей от UP Gifts.',
      teeonLinks: [
        { label: 'Жилетки',    href: 'category.html?slug=zhiletki' },
        { label: 'Куртки',     href: 'category.html?slug=kurtki' },
        { label: 'Портфолио',  href: 'index v6.html#portfolio' },
      ] },
  ],
};

const ext = (txt) => (
  <a href={giftsData.externalUrl} target="_blank" rel="noopener noreferrer" aria-label={giftsData.externalLabel}>
    {txt}
  </a>
);

/* ---------- HERO ---------- */
const SvHero = () => (
  <section className="sv-hero">
    <div className="sv-hero__content">
      <nav className="sv-hero__crumbs" aria-label="breadcrumb">
        <a href="index v6.html">Главная</a>
        <span className="sep">›</span>
        <span className="current">Сувенирная продукция</span>
      </nav>
      <div className="sv-hero__badges">
        {giftsData.badges.map(b => (
          <span className="sv-hero__badge" key={b}>
            <span className="dot"></span>
            {b}
          </span>
        ))}
      </div>
      <h1>{giftsData.h1Pre}<em>{giftsData.h1Em}</em></h1>
      <p className="sv-hero__sub">{giftsData.shortDescription}</p>
      <div className="sv-hero__cta">
        <a href={giftsData.externalUrl} target="_blank" rel="noopener noreferrer" className="btn btn--yellow" aria-label={giftsData.externalLabel}>
          Перейти в UP Gifts
          <span className="ic">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
          </span>
        </a>
        <a href="catalog.html" className="btn btn--ghost">
          Вернуться к мерчу TEEON
          <span className="ic">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7 L11 7 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.7"/></svg>
          </span>
        </a>
      </div>
    </div>

    <div className="sv-hero__visual">
      {giftsData.heroTiles.map(t => (
        <div className={`sv-hero__tile ${t.bg}`} key={t.t}>
          <span className="sv-hero__tile-ic">{t.ic}</span>
          <span className="sv-hero__tile-t">{t.t}</span>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- WHY SEPARATE ---------- */
const SvWhy = () => (
  <section className="section-spacer">
    <div className="sv-why">
      <div>
        <div className="kicker" style={{ marginBottom: 14 }}>(01) — Почему отдельно</div>
        <div className="sv-why__t">Сувениры — в&nbsp;<em>UP Gifts</em>, мерч — в&nbsp;TEEON</div>
      </div>
      <div>
        {giftsData.whyParagraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  </section>
);

/* ---------- CATEGORIES ---------- */
const SvCategories = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(02) — Категории</div>
        <h2>Что можно подобрать <em>в UP Gifts</em></h2>
      </div>
      <p>Восемь крупных категорий сувенирной продукции — от классики (ручки, ежедневники) до тематических наборов и фирменной упаковки.</p>
    </div>
    <div className="sv-cat-grid">
      {giftsData.categories.map(c => (
        <div className={`sv-cat ${c.bg}`} key={c.t}>
          <span className="sv-cat__ic">{c.ic}</span>
          <div className="sv-cat__t">{c.t}</div>
          <div className="sv-cat__d">{c.d}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
      <a href={giftsData.externalUrl} target="_blank" rel="noopener noreferrer"
         className="btn btn--ink" aria-label={giftsData.externalLabel}>
        Перейти в каталог UP Gifts
        <span className="ic">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
        </span>
      </a>
    </div>
  </section>
);

/* ---------- ADVANTAGES ---------- */
const SvAdvantages = () => (
  <section className="section-spacer">
    <div className="sv-adv">
      {giftsData.advantages.map((a, i) => (
        <div className="sv-adv__item" key={a}>
          <span className="ic">{String(i + 1).padStart(2, '0')}</span>
          <span className="t">{a}</span>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- SCENARIOS ---------- */
const SvScenarios = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(03) — Сценарии</div>
        <h2>Для каких <em>задач</em> подходит</h2>
      </div>
      <p>Шесть частых сценариев заказа сувениров. Подскажем подходящую категорию и поможем собрать набор под бюджет.</p>
    </div>
    <div className="sv-scenarios">
      {giftsData.scenarios.map((s, i) => (
        <div className={`sv-scenario ${s.bg}`} key={s.t}>
          <span className="sv-scenario__num">{String(i + 1).padStart(2, '0')} /</span>
          <div className="sv-scenario__t">{s.t}</div>
          <div className="sv-scenario__d">{s.d}</div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- CONNECT (2-col) ---------- */
const SvConnect = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(04) — Связка</div>
        <h2>Как это связано <em>с TEEON</em></h2>
      </div>
      <p>Один менеджер, один договор, одна B2B-задача. Мерч от TEEON + сувениры от UP Gifts — закрываем потребности целиком.</p>
    </div>
    <div className="sv-connect">
      <div className="sv-connect__col">
        <span className="sv-connect__brand">
          tee<span className="dot" style={{ color: 'var(--yellow)' }}>on</span>
        </span>
        <div className="sv-connect__t">Что заказать на&nbsp;TEEON</div>
        <div className="sv-connect__d">
          Промо-одежда и корпоративный мерч с пошивом в собственном цехе. 8 категорий каталога, 9 методов брендирования, тираж от 30 шт., работа с юрлицами.
        </div>
        <div className="sv-connect__links">
          <a href="catalog.html" className="sv-connect__link">Каталог одежды</a>
          <a href="branding.html" className="sv-connect__link">Способы нанесения</a>
          <a href="index v6.html#portfolio" className="sv-connect__link">Портфолио</a>
          <a href="index v6.html#request" className="sv-connect__link">Контакты</a>
        </div>
      </div>

      <div className="sv-connect__col dark">
        <span className="sv-connect__brand">UP Gifts</span>
        <div className="sv-connect__t" style={{ color: 'var(--paper)' }}>Что найти в&nbsp;UP Gifts</div>
        <div className="sv-connect__d" style={{ color: 'rgba(255,255,255,.75)' }}>
          Корпоративные подарки, бизнес-сувениры и подарочные наборы. Кружки, ежедневники, ручки, текстиль, упаковка — отдельный каталог под сувенирные задачи.
        </div>
        <div className="sv-connect__links" style={{ marginTop: 'auto' }}>
          <a href={giftsData.externalUrl} target="_blank" rel="noopener noreferrer"
             className="sv-connect__cta" aria-label={giftsData.externalLabel}>
            Перейти в UP Gifts
            <span className="ic">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- BUNDLES ---------- */
const SvBundles = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(05) — Связка</div>
        <h2>Популярные <em>B2B-комплекты</em></h2>
      </div>
      <p>Четыре готовые комбинации «одежда TEEON + сувениры UP Gifts» — собираем под конференции, welcome-наборы, подарки партнёрам и выставки.</p>
    </div>
    <div className="sv-bundles">
      {giftsData.bundles.map((b, i) => (
        <article className={`sv-bundle ${b.bg}`} key={b.t}>
          <div className="sv-bundle__head">
            <span className="sv-bundle__num">№ {String(i + 1).padStart(2, '0')}</span>
            <span className="sv-bundle__ic">{b.ic}</span>
          </div>
          <div className="sv-bundle__t">{b.t}</div>
          <div className="sv-bundle__d">{b.d}</div>
          <div className="sv-bundle__links">
            {b.teeonLinks.map(l => (
              <a className="sv-bundle__link" key={l.label} href={l.href}>{l.label}</a>
            ))}
          </div>
          <a href={giftsData.externalUrl} target="_blank" rel="noopener noreferrer"
             className="sv-bundle__ext" aria-label={giftsData.externalLabel}>
            Сувениры в UP Gifts
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M3 8 L8 3 M4 3 L8 3 L8 7" stroke="currentColor" strokeWidth="1.7"/></svg>
          </a>
        </article>
      ))}
    </div>
  </section>
);

/* ---------- SEO ---------- */
const SvSeo = () => (
  <section className="seo section-spacer">
    <div>
      <div className="kicker" style={{ marginBottom: 16 }}>(06) — Подробнее</div>
      <h3>Сувенирная продукция и&nbsp;корпоративные подарки</h3>
    </div>
    <div>
      <p>
        TEEON — производитель промо-одежды и корпоративного мерча, а UP Gifts — отдельный каталог сувенирной продукции, корпоративных подарков, бизнес-сувениров и фирменной упаковки. Вместе мы закрываем полный комплекс B2B-задач: одежду и сувениры можно подобрать под одну акцию, одного клиента, один проект — у одного менеджера и в одной отгрузке.
      </p>
      <p>
        Сувенирная продукция в UP Gifts включает классические корпоративные подарки — ежедневники, ручки, кружки, термосы, флешки, зонты — а также готовые подарочные наборы, фирменную упаковку и текстильные аксессуары. Брендирование логотипом доступно на всех позициях. На крупных B2B-проектах мы объединяем мерч TEEON и сувениры UP Gifts в единую смету и одну поставку.
      </p>
    </div>
  </section>
);

/* ---------- CTA ---------- */
const SvCta = () => (
  <section className="section-spacer">
    <div className="sv-cta">
      <div className="sv-cta__content">
        <h2>Закроем сразу <em>одежду и&nbsp;сувениры</em></h2>
        <p>
          Опишите задачу и&nbsp;бюджет — соберём комплект из мерча TEEON и подарков UP Gifts. Время первого ответа — 1&nbsp;час в&nbsp;рабочее время.
        </p>
      </div>
      <div className="sv-cta__actions">
        <a href="index v6.html#request" className="btn btn--yellow">
          Рассчитать одежду и мерч
          <span className="ic">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
          </span>
        </a>
        <a href={giftsData.externalUrl} target="_blank" rel="noopener noreferrer"
           className="btn btn--ghost" aria-label={giftsData.externalLabel}>
          Перейти в UP Gifts
          <span className="ic">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7 L11 7 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.7"/></svg>
          </span>
        </a>
      </div>
    </div>
  </section>
);

/* ---------- JSON-LD ---------- */
function injectJsonLD() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "/" },
      { "@type": "ListItem", "position": 2, "name": "Сувенирная продукция", "item": "/suvenirnaya-produkciya/" },
    ],
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Сувенирная продукция для бизнеса",
    "provider": { "@type": "Organization", "name": "TEEON" },
    "areaServed": "RU",
    "serviceType": "Корпоративные подарки и бизнес-сувениры",
  };
  [breadcrumbs, service].forEach(obj => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  });
}

/* ---------- APP ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "yellow": "#FFD60A",
  "blue":   "#1B3FCA",
  "coral":  "#FF6A4D",
  "mint":   "#6FE4C2",
  "ink":    "#0A0E1A",
  "radius": 28
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--yellow', t.yellow);
    r.setProperty('--blue', t.blue);
    r.setProperty('--coral', t.coral);
    r.setProperty('--mint', t.mint);
    r.setProperty('--ink', t.ink);
    r.setProperty('--rad', t.radius + 'px');
  }, [t]);

  React.useEffect(() => { injectJsonLD(); }, []);

  return (
    <div className="page">
      <HeaderV6 />
      <SvHero />
      <SvWhy />
      <SvCategories />
      <SvAdvantages />
      <SvScenarios />
      <SvConnect />
      <SvBundles />
      <SvSeo />
      <SvCta />
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
