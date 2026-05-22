/* /branding/[slug]/ — single method page with BrandingSampleTabs */

const { HeaderV6, FooterV6 } = window;
const { loadMethods, loadSamples, defaultMethods } = window.BrandingData;
const { defaultCategories } = window.CatalogData;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakSlider } = window;

const params = new URLSearchParams(window.location.search);
const slug = params.get('slug') || 'vyshivka';
const allMethods = loadMethods();
const method = allMethods.find(m => m.slug === slug) || allMethods[0];
const allSamples = loadSamples();
const samples = (allSamples[method.slug] || [])
  .filter(s => s.active !== false)
  .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

const Crumbs = () => (
  <nav className="crumbs" aria-label="breadcrumb">
    <a href="index v6.html">Главная</a>
    <span className="sep">›</span>
    <a href="branding.html">Брендирование</a>
    <span className="sep">›</span>
    <span className="current">{method.name}</span>
  </nav>
);

/* ---------- HERO ---------- */
const MdHero = () => (
  <section className="md-hero">
    <div className="md-hero__content">
      <Crumbs />
      <div className="md-hero__tags">
        {(method.tags || []).map(t => <span className="md-hero__tag" key={t}>{t}</span>)}
      </div>
      <h1>{method.h1}</h1>
      <div className="md-hero__short">{method.shortDesc}</div>
      <p className="md-hero__desc">{method.desc}</p>
      <div className="md-hero__actions">
        <a href="index v6.html#request" className="btn btn--ink">
          Рассчитать нанесение
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
        <a href="branding.html" className="cd-hero__back">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9 1 L2 6 L9 11" stroke="currentColor" strokeWidth="1.7"/></svg>
          Все способы брендирования
        </a>
      </div>
    </div>
    <div className="md-hero__visual">
      <div className="md-hero__icon">
        {method.iconImage ? <img src={method.iconImage} alt={method.name} /> : <span>{method.icon}</span>}
      </div>
      <div className="md-hero__name">{method.name}</div>
    </div>
  </section>
);

/* ---------- BRANDING SAMPLE TABS ---------- */
const BrandingSampleTabs = () => {
  const [active, setActive] = React.useState(0);
  const [announce, setAnnounce] = React.useState('');

  React.useEffect(() => {
    if (samples[active]) {
      setAnnounce(`${samples[active].name} — выбрана вкладка ${active + 1} из ${samples.length}`);
    }
  }, [active]);

  if (samples.length === 0) {
    return (
      <section className="bst" id="samples">
        <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--muted)' }}>
          <div style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--ink)', fontWeight: 700, marginBottom: 8 }}>
            Варианты в разработке
          </div>
          <p>Скоро добавим конкретные варианты этого метода. Пока — рассчитаем индивидуально.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bst" id="samples">
      <div className="bst__tabs" role="tablist" aria-label="Варианты нанесения">
        {samples.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={active === i}
            aria-controls={`bst-panel-${i}`}
            id={`bst-tab-${i}`}
            className={`bst__tab ${active === i ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div role="status" aria-live="polite" style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}>
        {announce}
      </div>

      {samples.map((s, i) => (
        <div
          key={s.id}
          role="tabpanel"
          id={`bst-panel-${i}`}
          aria-labelledby={`bst-tab-${i}`}
          hidden={active !== i}
          className="bst__panel"
        >
          <div className="bst__img">
            {s.imageSrc
              ? <img src={s.imageSrc} alt={s.name} />
              : <span className="bst__img__ph">{s.name}</span>}
          </div>
          <div className="bst__info">
            <div>
              <div className="bst__name">{s.name}</div>
              {s.subtitle && <div className="bst__sub">{s.subtitle}</div>}
            </div>
            <div className="bst__desc">{s.desc}</div>
            {s.effect && (
              <div className="bst__effect">
                <strong>Эффект</strong>
                {s.effect}
              </div>
            )}
            <div className="bst__lists">
              {(s.bestFor || []).length > 0 && (
                <div className="bst__list check">
                  <div className="bst__list__t">Лучше всего для</div>
                  <ul>{s.bestFor.map(b => <li key={b}>{b}</li>)}</ul>
                </div>
              )}
              {(s.materials || []).length > 0 && (
                <div className="bst__list dot">
                  <div className="bst__list__t">Материалы</div>
                  <ul>{s.materials.map(m => <li key={m}>{m}</li>)}</ul>
                </div>
              )}
            </div>
            {(s.limitations || []).length > 0 && (
              <div className="bst__list warn">
                <div className="bst__list__t">Ограничения</div>
                <ul>{s.limitations.map(l => <li key={l}>{l}</li>)}</ul>
              </div>
            )}
            <div>
              <a href="index v6.html#request" className="btn btn--yellow">
                Рассчитать нанесение
                <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

/* ---------- INFO 3-col ---------- */
const MdInfo = () => (
  <section className="md-info section-spacer">
    <div className="md-info__col yellow">
      <div className="md-info__t">Для каких задач подходит</div>
      <ul className="md-info__list check">
        {method.suitableFor.map(s => <li key={s}>{s}</li>)}
      </ul>
    </div>
    <div className="md-info__col">
      <div className="md-info__t">На какие изделия применяем</div>
      <ul className="md-info__list dot">
        {method.products.map(p => <li key={p}>{p}</li>)}
      </ul>
    </div>
    <div className="md-info__col blue">
      <div className="md-info__t">Преимущества технологии</div>
      <ul className="md-info__list dot-mint">
        {method.benefits.map(b => <li key={b}>{b}</li>)}
      </ul>
    </div>
  </section>
);

/* ---------- LIMITATIONS + MOCKUP ---------- */
const LimitMockup = () => (
  <section className="section-spacer">
    <div className="lm-section">
      <div className="lm-section__col">
        <h3>Ограничения и&nbsp;что важно учесть</h3>
        <ul>
          {method.limitations.map(l => <li key={l}>{l}</li>)}
        </ul>
      </div>
      <div className="lm-section__col">
        <h3>Как подготовить макет</h3>
        <p>{method.mockupRequirements}</p>
        <p style={{ marginTop: 16 }}>
          <a href="index v6.html#request">Прикрепить логотип к заявке →</a>
        </p>
      </div>
    </div>
  </section>
);

/* ---------- PROCESS + PRICE ---------- */
const ProcessPrice = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(03) — Процесс и стоимость</div>
        <h2>Как проходит работа<br />и&nbsp;<em>от чего зависит цена</em></h2>
      </div>
      <p>{method.process.length} шагов с фиксацией результата на каждом этапе. {method.priceFactors.length} факторов формируют итоговую цену.</p>
    </div>
    <div className="pp-grid">
      <div className="pp-col">
        <h3>Как проходит работа</h3>
        <ol className="pp-col__steps">
          {method.process.map(s => <li key={s}>{s}</li>)}
        </ol>
      </div>
      <div className="pp-col">
        <h3>От чего зависит стоимость</h3>
        <ul className="pp-col__factors">
          {method.priceFactors.map(f => <li key={f}>{f}</li>)}
        </ul>
        <div style={{ marginTop: 18 }}>
          <a href="index v6.html#request" className="btn btn--ink">
            Получить расчёт
            <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- EXAMPLES ---------- */
const exampleBgs = ['', 'yellow', 'blue', 'ink'];

const ExamplesBlock = () => {
  if (!(method.examples || []).length) return null;
  return (
    <section className="section-spacer">
      <div className="section-head">
        <div>
          <div className="kicker">(04) — Примеры</div>
          <h2>Примеры <em>работ</em></h2>
        </div>
        <p>Несколько реальных кейсов с использованием метода «{method.name.toLowerCase()}». Если задача похожа — рассчитаем за час.</p>
      </div>
      <div className="bx-grid">
        {method.examples.map((e, i) => (
          <article className="bx" key={e.title}>
            <div className={`bx__media ${exampleBgs[i % exampleBgs.length]}`}>
              <span className="bx__media__ph">{method.icon} {e.title}</span>
            </div>
            <div className="bx__body">
              <div className="bx__t">{e.title}</div>
              <div className="bx__task">{e.task}</div>
              <a href="index v6.html#request" className="bx__link">
                Похожий заказ
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8 L8 2 M4 2 L8 2 L8 6" stroke="currentColor" strokeWidth="1.7"/></svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

/* ---------- RELATED METHODS ---------- */
const RelatedMethods = () => {
  const related = (method.relatedMethods || []).map(s => allMethods.find(m => m.slug === s)).filter(Boolean);
  if (related.length === 0) return null;
  return (
    <section className="section-spacer">
      <div className="section-head">
        <div>
          <div className="kicker">(05) — Сочетания</div>
          <h2>Сочетается с&nbsp;<em>другими технологиями</em></h2>
        </div>
        <p>Часто комбинируем — например, вышивку на груди с DTF на спине, или тиснение бирки с шелкографией на корпусе.</p>
      </div>
      <div className="related-grid">
        {related.map(r => (
          <a className="related" key={r.slug} href={`branding-method.html?slug=${r.slug}`}>
            <div className="related__media yellow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>
              <span>{r.icon}</span>
            </div>
            <div className="related__body">
              <div className="related__name">{r.name}</div>
              <div className="related__short">{r.shortDesc}</div>
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

/* ---------- RELATED CATALOG ---------- */
const renderSilhouette = (kind, opacity = 0.45) => (
  <svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMid slice"
       style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }}>
    {kind === 'tee'        && <g fill="currentColor"><path d="M52 78 L74 56 L86 64 Q100 76 114 64 L126 56 L148 78 L138 96 L122 88 L122 188 L78 188 L78 88 L62 96 Z"/></g>}
    {kind === 'hoodie'     && <g fill="currentColor"><path d="M70 70 Q70 50 100 50 Q130 50 130 70 L150 78 L142 100 L130 94 L130 188 L70 188 L70 94 L58 100 L50 78 Z"/></g>}
    {kind === 'sweat'      && <g fill="currentColor"><path d="M52 78 L78 58 Q100 68 122 58 L148 78 L140 100 L128 94 L128 188 L72 188 L72 94 L60 100 Z"/></g>}
    {kind === 'longsleeve' && <g fill="currentColor"><path d="M40 70 L78 58 Q100 68 122 58 L160 70 L158 130 L140 124 L140 188 L60 188 L60 124 L42 130 Z"/></g>}
    {kind === 'bag'        && <g fill="currentColor"><path d="M70 92 L130 92 L138 192 L62 192 Z"/><path d="M84 92 Q84 60 100 60 Q116 60 116 92" fill="none" stroke="currentColor" strokeWidth="6"/></g>}
    {kind === 'vest'       && <g fill="currentColor"><path d="M58 78 L86 60 L100 70 L114 60 L142 78 L142 188 L114 188 L114 96 L86 96 L86 188 L58 188 Z"/></g>}
    {kind === 'jacket'     && <g fill="currentColor"><path d="M50 78 L78 56 L98 60 L98 188 L60 188 Z"/><path d="M150 78 L122 56 L102 60 L102 188 L140 188 Z"/></g>}
    {kind === 'raincoat'   && <g fill="currentColor"><path d="M64 80 Q64 56 100 56 Q136 56 136 80 L154 88 L144 110 L132 104 L132 196 L68 196 L68 104 L56 110 L46 88 Z"/></g>}
  </svg>
);

const RelatedCatalog = () => {
  const related = (method.relatedCatalog || []).map(s => defaultCategories.find(c => c.slug === s)).filter(Boolean);
  if (related.length === 0) return null;
  return (
    <section className="section-spacer">
      <div className="section-head">
        <div>
          <div className="kicker">(06) — Изделия</div>
          <h2>Также часто <em>заказывают</em></h2>
        </div>
        <p>Категории, на которых метод «{method.name.toLowerCase()}» применяется чаще всего.</p>
      </div>
      <div className="related-grid">
        {related.map(r => (
          <a className="related" key={r.slug} href={`category.html?slug=${r.slug}`}>
            <div className={`related__media ${r.bg || 'paper-2'}`}>
              {renderSilhouette(r.kind, 0.45)}
            </div>
            <div className="related__body">
              <div className="related__name">{r.title}</div>
              <div className="related__short">{r.short}</div>
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

/* ---------- BOTTOM NAV ---------- */
const BottomNav = () => (
  <section className="section-spacer">
    <div className="bottom-nav">
      <a href="branding.html" className="bottom-nav__back">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 2 L4 7 L10 12" stroke="currentColor" strokeWidth="1.7"/></svg>
        Все способы брендирования
      </a>
      <a href="index v6.html#request" className="btn btn--ink">
        Оставить заявку на нанесение
        <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
      </a>
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
      { "@type": "ListItem", "position": 2, "name": "Брендирование", "item": "/branding/" },
      { "@type": "ListItem", "position": 3, "name": method.name, "item": `/branding/${method.slug}/` },
    ],
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${method.name} — нанесение логотипа`,
    "provider": { "@type": "Organization", "name": "TEEON" },
    "areaServed": "RU",
  };
  [breadcrumbs, service].forEach(obj => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  });
  document.title = `${method.name} — TEEON Брендирование`;
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
      <MdHero />
      <section className="section-spacer">
        <div className="section-head">
          <div>
            <div className="kicker">(02) — Варианты</div>
            <h2>Варианты <em>нанесения</em></h2>
          </div>
          <p>Выберите технологию и&nbsp;посмотрите эффект, материалы, ограничения. Каждый вариант — с&nbsp;фото или образцом.</p>
        </div>
        <BrandingSampleTabs />
      </section>
      <MdInfo />
      <LimitMockup />
      <ProcessPrice />
      <ExamplesBlock />
      <RelatedMethods />
      <RelatedCatalog />
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
