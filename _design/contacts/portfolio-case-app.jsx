/* /portfolio/[slug]/ — single case page */

const { HeaderV6, FooterV6 } = window;
const { loadCases, getRelatedCases } = window.PortfolioData;
const { defaultCategories } = window.CatalogData;
const { defaultMethods } = window.BrandingData;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakSlider } = window;

const params = new URLSearchParams(window.location.search);
const slug = params.get('slug') || 'it-startup-welcome';
const allCases = loadCases();
const caseData = allCases.find(c => c.slug === slug) || allCases[0];
const related = getRelatedCases(caseData.slug, allCases, 3);

const renderSilhouette = (kind, opacity = 0.45) => (
  <svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMid slice"
       style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }}>
    {kind === 'tee'        && <g fill="currentColor"><path d="M52 78 L74 56 L86 64 Q100 76 114 64 L126 56 L148 78 L138 96 L122 88 L122 188 L78 188 L78 88 L62 96 Z"/></g>}
    {kind === 'hoodie'     && <g fill="currentColor"><path d="M70 70 Q70 50 100 50 Q130 50 130 70 L150 78 L142 100 L130 94 L130 188 L70 188 L70 94 L58 100 L50 78 Z"/></g>}
    {kind === 'longsleeve' && <g fill="currentColor"><path d="M40 70 L78 58 Q100 68 122 58 L160 70 L158 130 L140 124 L140 188 L60 188 L60 124 L42 130 Z"/></g>}
    {kind === 'bag'        && <g fill="currentColor"><path d="M70 92 L130 92 L138 192 L62 192 Z"/><path d="M84 92 Q84 60 100 60 Q116 60 116 92" fill="none" stroke="currentColor" strokeWidth="6"/></g>}
    {kind === 'vest'       && <g fill="currentColor"><path d="M58 78 L86 60 L100 70 L114 60 L142 78 L142 188 L114 188 L114 96 L86 96 L86 188 L58 188 Z"/></g>}
    {kind === 'jacket'     && <g fill="currentColor"><path d="M50 78 L78 56 L98 60 L98 188 L60 188 Z"/><path d="M150 78 L122 56 L102 60 L102 188 L140 188 Z"/></g>}
  </svg>
);

/* ---------- HERO ---------- */
const Hero = () => (
  <>
    <section className="section-spacer" style={{ marginTop: 16 }}>
      <nav className="crumbs" aria-label="breadcrumb" style={{ paddingLeft: 16 }}>
        <a href="index v6.html">Главная</a>
        <span className="sep">›</span>
        <a href="portfolio.html">Портфолио</a>
        <span className="sep">›</span>
        <span className="current">{caseData.shortTitle}</span>
      </nav>
    </section>

    <section className="pf-hero">
      <div className="pf-hero__content">
        <div className="pf-hero__meta">
          <span className="pf-hero__chip">{caseData.clientType}</span>
          <span className="pf-hero__chip year">{caseData.year}</span>
        </div>
        <h1>{caseData.title}</h1>
        <div className="pf-hero__industry">{caseData.industry}</div>
        <p className="pf-hero__desc">{caseData.description}</p>
        <div className="pf-hero__actions">
          <a href="index v6.html#request" className="btn btn--ink">
            Рассчитать похожий проект
            <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
          </a>
          <a href="portfolio.html" className="pf-hero__back">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9 1 L2 6 L9 11" stroke="currentColor" strokeWidth="1.7"/></svg>
            Все кейсы
          </a>
        </div>
      </div>
      <dl className="pf-hero__stats">
        <div className="pf-hero__stat large">
          <dt>Тираж</dt><dd>{caseData.quantity}</dd>
        </div>
        <div className="pf-hero__stat">
          <dt>Срок</dt><dd>{caseData.timeline}</dd>
        </div>
        <div className="pf-hero__stat">
          <dt>Год</dt><dd>{caseData.year}</dd>
        </div>
        <div className="pf-hero__stat">
          <dt>Технологии</dt>
          <dd>{(caseData.technologies || []).length}</dd>
        </div>
      </dl>
    </section>
  </>
);

/* ---------- COVER ---------- */
const Cover = () => (
  <section className="section-spacer">
    <div className={`pf-cover ${caseData.bg || ''}`}>
      {caseData.coverImage
        ? <img src={caseData.coverImage} alt={caseData.coverLabel} />
        : <>
            {renderSilhouette(caseData.kind, 0.20)}
            <div className="pf-cover__label">{caseData.coverLabel}</div>
          </>}
    </div>
  </section>
);

/* ---------- TASK / DID / TECH ---------- */
const ThreeCol = () => (
  <section className="pf-3col section-spacer">
    <div className="pf-3col__col yellow">
      <div className="pf-3col__t">Задача клиента</div>
      <p>{caseData.task}</p>
    </div>
    <div className="pf-3col__col">
      <div className="pf-3col__t">Что сделали</div>
      <ul>
        {(caseData.products || []).map(p => <li key={p}>{p}</li>)}
      </ul>
    </div>
    <div className="pf-3col__col blue">
      <div className="pf-3col__t">Технологии брендирования</div>
      <div className="pf-tech-links">
        {(caseData.technologies || []).map(t => {
          const m = defaultMethods.find(x => x.slug === t);
          return (
            <a key={t} className="pf-tech-link" href={`branding-method.html?slug=${t}`}>
              <span>{m?.icon || '✦'}</span>
              {m?.name || t}
            </a>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------- RESULT 2-COL ---------- */
const productionSteps = [
  'Брифинг и согласование задачи',
  'Подбор тканей и метода нанесения',
  'Расчёт сметы (2–3 варианта)',
  'Изготовление pre-production sample',
  'Согласование образца',
  'Производство и ОТК на этапах',
  'Упаковка, маркировка, отгрузка',
];

const ResultBlock = () => (
  <section className="pf-result section-spacer">
    <div className="pf-result__col">
      <h3>Результат</h3>
      <p>{caseData.result}</p>
    </div>
    <div className="pf-result__col ink">
      <h3 style={{ color: 'var(--paper)' }}>Что входило в&nbsp;проект</h3>
      <ol>
        {productionSteps.map(s => <li key={s}>{s}</li>)}
      </ol>
    </div>
  </section>
);

/* ---------- RELATED CATALOG ---------- */
const RelatedCatalog = () => {
  const cats = (caseData.relatedCatalog || []).map(s => defaultCategories.find(c => c.slug === s)).filter(Boolean);
  if (cats.length === 0) return null;
  return (
    <section className="section-spacer">
      <div className="section-head">
        <div>
          <div className="kicker">Категории каталога</div>
          <h2>Похожие <em>позиции</em> в&nbsp;каталоге</h2>
        </div>
        <p>То, что использовали в&nbsp;этом кейсе — для&nbsp;похожих задач.</p>
      </div>
      <div className="related-grid">
        {cats.map(c => (
          <a className="related" key={c.slug} href={`category.html?slug=${c.slug}`}>
            <div className={`related__media ${c.bg || 'paper-2'}`}>
              {renderSilhouette(c.kind, 0.45)}
            </div>
            <div className="related__body">
              <div className="related__name">{c.title}</div>
              <div className="related__short">{c.short}</div>
              <span className="related__link">
                Подробнее
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8 L8 2 M4 2 L8 2 L8 6" stroke="currentColor" strokeWidth="1.7"/></svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

/* ---------- RELATED CASES ---------- */
const RelatedCases = () => {
  if (related.length === 0) return null;
  return (
    <section className="section-spacer">
      <div className="section-head">
        <div>
          <div className="kicker">Похожие проекты</div>
          <h2>Другие <em>кейсы</em> на&nbsp;ту&nbsp;же тему</h2>
        </div>
        <p>Подобрали по&nbsp;пересечению тегов. Каждый — с&nbsp;тиражом, сроком, технологиями.</p>
      </div>
      <div className="pf-rel">
        {related.map(c => (
          <a className="pf-rel__card" key={c.slug} href={`portfolio-case.html?slug=${c.slug}`}>
            <div className={`pf-rel__media ${c.bg || 'paper-2'}`}>
              <span className="pf-rel__chip">{c.clientType}</span>
              {renderSilhouette(c.kind, 0.45)}
            </div>
            <div className="pf-rel__body">
              <div className="pf-rel__t">{c.shortTitle}</div>
              <div className="pf-rel__meta">
                <span>📦 {c.quantity}</span>
                <span>⏱ {c.timeline}</span>
              </div>
              <span className="pf-rel__link">
                Смотреть кейс
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8 L8 2 M4 2 L8 2 L8 6" stroke="currentColor" strokeWidth="1.7"/></svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

/* ---------- BOTTOM NAV ---------- */
const BottomNav = () => (
  <section className="section-spacer">
    <div className="bottom-nav">
      <a href="portfolio.html" className="bottom-nav__back">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 2 L4 7 L10 12" stroke="currentColor" strokeWidth="1.7"/></svg>
        Все кейсы портфолио
      </a>
      <a href="index v6.html#request" className="btn btn--ink">
        Обсудить похожий проект
        <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
      </a>
    </div>
  </section>
);

/* ---------- JSON-LD ---------- */
function injectJsonLD() {
  const breadcrumbs = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "/" },
      { "@type": "ListItem", "position": 2, "name": "Портфолио", "item": "/portfolio/" },
      { "@type": "ListItem", "position": 3, "name": caseData.shortTitle, "item": `/portfolio/${caseData.slug}/` },
    ],
  };
  const article = {
    "@context": "https://schema.org", "@type": "CreativeWork",
    "name": caseData.title,
    "description": caseData.description,
    "creator": { "@type": "Organization", "name": "TEEON" },
    "datePublished": `${caseData.year}-01-01`,
  };
  [breadcrumbs, article].forEach(obj => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  });
  document.title = `${caseData.shortTitle} — TEEON Портфолио`;
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
      <Hero />
      <Cover />
      <ThreeCol />
      <ResultBlock />
      <RelatedCatalog />
      <RelatedCases />
      <BottomNav />
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
