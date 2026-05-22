/* /catalog/[slug]/ — category detail page with ModelVariantBlock */

const { HeaderV6, FooterV6 } = window;
const { Photo } = window;
const {
  defaultCategories, defaultModels, loadModels,
  saveSelectedVariant,
} = window.CatalogData;

/* read ?slug= from URL — default to first category */
const params = new URLSearchParams(window.location.search);
const slug = params.get('slug') || 'futbolki';
const category = defaultCategories.find(c => c.slug === slug) || defaultCategories[0];

const renderSilhouette = (kind, opacity = 0.45, style) => (
  <svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMid slice"
       style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity, ...style }}>
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

/* ---------- BREADCRUMBS ---------- */
const Crumbs = () => (
  <nav className="crumbs" aria-label="breadcrumb">
    <a href="index v6.html">Главная</a>
    <span className="sep">›</span>
    <a href="catalog.html">Каталог</a>
    <span className="sep">›</span>
    <span className="current">{category.title}</span>
  </nav>
);

/* ---------- HERO ---------- */
const CDHero = () => (
  <section className="cd-hero">
    <div className="cd-hero__photo">
      <Photo tint="sand" kind={category.kind} num={`0${defaultCategories.indexOf(category) + 1}/`} label={category.title} />
    </div>
    <div className="cd-hero__content">
      <Crumbs />
      <span className="cd-hero__badge">
        <span className="dot"></span>
        {category.badge}
      </span>
      <h1>{category.title}</h1>
      <p>{category.desc}</p>
      <div className="cd-hero__actions">
        <a href="index v6.html#request" className="btn btn--ink">
          Рассчитать тираж
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
        <a href="catalog.html" className="cd-hero__back">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9 1 L2 6 L9 11" stroke="currentColor" strokeWidth="1.7"/></svg>
          Весь каталог
        </a>
      </div>
    </div>
  </section>
);

/* ---------- MODEL VARIANT BLOCK ---------- */
const ModelVariantBlock = () => {
  const [models, setModels] = React.useState(() => loadModels());
  const categoryModels = (models[category.slug] || []).filter(m => m.active !== false).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  const [activeModelSlug, setActiveModelSlug] = React.useState(categoryModels[0]?.slug || null);
  const activeModel = categoryModels.find(m => m.slug === activeModelSlug) || categoryModels[0];
  const variants = (activeModel?.variants || []).filter(v => v.active !== false).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  const [activeVariantId, setActiveVariantId] = React.useState(variants[0]?.id || null);
  const [toast, setToast] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setActiveVariantId(variants[0]?.id || null);
    setImgError(false);
  }, [activeModelSlug]);

  React.useEffect(() => { setImgError(false); }, [activeVariantId]);

  if (!activeModel) {
    return (
      <section className="mvb">
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
          <div style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--ink)', fontWeight: 700, marginBottom: 8 }}>
            Модели в разработке
          </div>
          <p>Скоро добавим конкретные модели для этой категории. Пока — рассчитаем индивидуально.</p>
          <a href="index v6.html#request" className="btn btn--ink" style={{ marginTop: 20 }}>
            Оставить заявку
            <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
          </a>
        </div>
      </section>
    );
  }

  const activeVariant = variants.find(v => v.id === activeVariantId) || variants[0];

  const onChoose = () => {
    saveSelectedVariant({
      categorySlug: category.slug,
      categoryTitle: category.title,
      modelName: activeModel.name,
      variantName: activeVariant?.name || '',
      variantId: activeVariant?.id || '',
    });
    setToast(true);
    setTimeout(() => setToast(false), 4500);
    // navigate to home request form
    window.location.href = 'index v6.html#request';
  };

  return (
    <section className="mvb" id="models">
      {/* Tabs */}
      {categoryModels.length > 1 && (
        <div className="mvb__tabs" role="tablist">
          {categoryModels.map(m => (
            <button
              key={m.slug}
              role="tab"
              aria-selected={activeModelSlug === m.slug}
              className={`mvb__tab ${activeModelSlug === m.slug ? 'active' : ''}`}
              onClick={() => setActiveModelSlug(m.slug)}
            >
              {m.name}
            </button>
          ))}
        </div>
      )}

      <div className="mvb__sub">
        <div className="mvb__sub-name">{activeModel.name}</div>
        <div className="mvb__sub-meta">
          {activeModel.subtitle && <span>{activeModel.subtitle}</span>}
          {activeModel.patternCode && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, padding: '3px 8px', background: 'var(--paper-2)', borderRadius: 8 }}>{activeModel.patternCode}</span>
            </span>
          )}
          {(activeModel.badges || []).map(b => (
            <span key={b} className="mvb__badge">{b}</span>
          ))}
        </div>
      </div>

      {activeModel.shortDesc && (
        <div style={{ fontSize: 14.5, color: 'var(--muted)', maxWidth: 720, lineHeight: 1.55, marginTop: -10 }}>
          {activeModel.shortDesc}
        </div>
      )}

      {/* Variants grid */}
      {variants.length > 1 && (
        <div className="mvb__variants">
          {variants.map(v => (
            <button
              key={v.id}
              className={`mvb__variant ${activeVariantId === v.id ? 'active' : ''}`}
              onClick={() => setActiveVariantId(v.id)}
            >
              <div className="mvb__variant__media">
                {v.image
                  ? <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span className="ph">{v.name}</span>}
              </div>
              <div className="mvb__variant__name">{v.name}</div>
              <div className="mvb__variant__sub">{v.subtitle}</div>
            </button>
          ))}
        </div>
      )}

      {/* Detail */}
      {activeVariant && (
        <div className="mvb__detail">
          <div className="mvb__photo">
            {activeVariant.image && !imgError ? (
              <img
                src={activeVariant.image}
                alt={activeVariant.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={() => setImgError(true)}
              />
            ) : (
              <>
                {renderSilhouette(category.kind, 0.45)}
                <span className="ph">фото: {activeVariant.name}</span>
              </>
            )}
          </div>
          <div className="mvb__info">
            <div>
              <div className="mvb__info-name">{activeVariant.name}</div>
              {activeVariant.subtitle && <div className="mvb__info-sub">{activeVariant.subtitle}</div>}
            </div>
            {activeVariant.patternCode && (
              <span className="mvb__info-code">Код лекала: {activeVariant.patternCode}</span>
            )}
            {activeVariant.desc && <div className="mvb__info-desc">{activeVariant.desc}</div>}

            {(activeVariant.features || []).length > 0 && (
              <ul className="mvb__features">
                {activeVariant.features.map(f => <li key={f}>{f}</li>)}
              </ul>
            )}

            {(activeVariant.colors || []).length > 0 && (
              <div>
                <div style={{ fontFamily: 'var(--body)', fontWeight: 600, fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
                  Цвета · {activeVariant.colors.length}
                </div>
                <div className="mvb__colors">
                  {activeVariant.colors.map(c => (
                    <div key={c.hex + c.name} className="mvb__color">
                      <span className="sw" style={{ background: c.hex }}></span>
                      {c.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mvb__cta">
              <button onClick={onChoose} className="btn btn--yellow">
                Рассчитать эту модель
                <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
              </button>
              {toast && (
                <span className="mvb__toast">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7 L6 10 L11 4" stroke="currentColor" strokeWidth="2"/></svg>
                  Вариант выбран — переходим к форме заявки
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sub-grid: tasks, brandings, customize */}
      <div className="mvb__subgrid">
        <div className="mvb__subcol">
          <div className="mvb__subcol__t">Для каких задач</div>
          <ul>
            {(activeVariant?.tasks || activeModel.tasks || []).map(t => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <div className="mvb__subcol">
          <div className="mvb__subcol__t">Варианты брендирования</div>
          <ul>
            {(activeVariant?.brandings || activeModel.brandings || []).map(b => (
              <li key={b}><a href={`index v6.html#branding`}>{b}</a></li>
            ))}
          </ul>
        </div>
        <div className="mvb__subcol">
          <div className="mvb__subcol__t">Что можно настроить</div>
          <ul>
            {(activeVariant?.customize || activeModel.customize || []).map(c => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
};

/* ---------- INFO 3-column ---------- */
const CDInfo = () => (
  <section className="cd-info section-spacer">
    <div className="cd-info__col yellow">
      <div className="cd-info__col__t">Для каких задач подходит</div>
      <ul>
        {category.tasks.map(t => <li key={t}>{t}</li>)}
      </ul>
    </div>
    <div className="cd-info__col blue">
      <div className="cd-info__col__t">Варианты брендирования</div>
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: 0 }}>
        {category.brandings.map(b => (
          <li key={b} style={{ padding: 0 }}>
            <a href="index v6.html#branding">{b}</a>
          </li>
        ))}
      </ul>
      <p style={{ marginTop: 16, fontSize: 13, opacity: .85, color: 'var(--paper)' }}>
        Подбираем метод под ткань, тираж и эффект. На сложных макетах — комбинируем 2 метода.
      </p>
    </div>
    <div className="cd-info__col">
      <div className="cd-info__col__t">Что можно настроить</div>
      <ul>
        {category.customize.map(c => <li key={c}>{c}</li>)}
      </ul>
    </div>
  </section>
);

/* ---------- EXAMPLES ---------- */
const ExamplesGrid = () => {
  const [models] = React.useState(() => loadModels());
  const categoryModels = (models[category.slug] || []).filter(m => m.active !== false).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  const examples = [];
  categoryModels.forEach(m => {
    (m.variants || []).filter(v => v.active !== false).slice(0, 2).forEach(v => {
      examples.push({ ...v, modelName: m.name });
    });
  });
  if (examples.length === 0) return null;

  const bgs = ['paper-2', 'yellow', 'blue', 'ink'];

  return (
    <section className="section-spacer">
      <div className="section-head">
        <div>
          <div className="kicker">Примеры позиций</div>
          <h2>Конкретные <em>модели</em></h2>
        </div>
        <p>Несколько актуальных позиций категории {category.title.toLowerCase()} — с тканью, плотностью и базовыми цветами.</p>
      </div>
      <div className="examples">
        {examples.slice(0, 4).map((e, i) => {
          const firstColor = (e.colors || [])[0]?.name || '—';
          const firstMat = (e.materials || [])[0] || '—';
          return (
            <article className="example" key={e.id}>
              <div className={`example__media ${bgs[i % bgs.length]}`}>
                {e.image
                  ? <img src={e.image} alt={e.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : renderSilhouette(category.kind, bgs[i % bgs.length] === 'paper-2' ? 0.5 : 0.45)}
              </div>
              <div className="example__body">
                <div className="example__name">{e.modelName} · {e.name}</div>
                <div className="example__meta">
                  <div className="row"><span className="label">Ткань</span><span className="value">{firstMat}</span></div>
                  <div className="row"><span className="label">Цвет</span><span className="value">{firstColor}</span></div>
                </div>
                <a href="index v6.html#request" className="example__link">
                  Запросить расчёт
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10 L10 2 M4 2 L10 2 L10 8" stroke="currentColor" strokeWidth="1.7"/></svg>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

/* ---------- PRICING ---------- */
const Pricing = () => (
  <section className="section-spacer">
    <div className="pricing">
      <div>
        <div className="kicker" style={{ marginBottom: 8 }}>(05) — Стоимость</div>
        <h3>Как рассчитывается стоимость</h3>
        <p>{category.pricingNote}</p>
      </div>
      <a href="index v6.html#request" className="btn btn--yellow" style={{ alignSelf: 'center', flexShrink: 0 }}>
        Получить расчёт
        <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
      </a>
    </div>
  </section>
);

/* ---------- RELATED ---------- */
const Related = () => {
  const relatedSlugs = category.related || [];
  if (relatedSlugs.length === 0) return null;
  const relatedCategories = relatedSlugs.map(s => defaultCategories.find(c => c.slug === s)).filter(Boolean);
  return (
    <section className="section-spacer">
      <div className="section-head">
        <div>
          <div className="kicker">Также заказывают</div>
          <h2>Смежные <em>категории</em></h2>
        </div>
        <p>То, что часто берут вместе с {category.title.toLowerCase()} — для комплексного welcome-кита или формы.</p>
      </div>
      <div className="related-grid">
        {relatedCategories.map(r => (
          <a className="related" key={r.slug} href={`category.html?slug=${r.slug}`}>
            <div className={`related__media ${r.bg || 'paper-2'}`}>
              {renderSilhouette(r.kind, 0.45)}
            </div>
            <div className="related__body">
              <div className="related__name">{r.title}</div>
              <div className="related__short">{r.short}</div>
              <span className="related__link">
                Смотреть категорию
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
      <a href="catalog.html" className="bottom-nav__back">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 2 L4 7 L10 12" stroke="currentColor" strokeWidth="1.7"/></svg>
        Вернуться в каталог
      </a>
      <a href="index v6.html#request" className="btn btn--ink">
        Оставить заявку на расчёт
        <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
      </a>
    </div>
  </section>
);

/* ---------- JSON-LD (injected on mount, since dynamic) ---------- */
function injectJsonLD() {
  const ld1 = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "/" },
      { "@type": "ListItem", "position": 2, "name": "Каталог", "item": "/catalog/" },
      { "@type": "ListItem", "position": 3, "name": category.title, "item": `/catalog/${category.slug}/` },
    ],
  };
  const ld2 = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Пошив ${category.title.toLowerCase()} с брендированием`,
    "provider": { "@type": "Organization", "name": "TEEON" },
    "areaServed": "RU",
  };
  [ld1, ld2].forEach(obj => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  });
  document.title = `${category.title} — TEEON Каталог`;
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "yellow": "#FFD60A",
  "blue":   "#1B3FCA",
  "coral":  "#FF6A4D",
  "mint":   "#6FE4C2",
  "ink":    "#0A0E1A",
  "radius": 28
}/*EDITMODE-END*/;

const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakSlider } = window;

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
      <CDHero />
      <section className="section-spacer">
        <div className="section-head">
          <div>
            <div className="kicker">(01) — Модели</div>
            <h2>Выберите <em>модель и&nbsp;вариант</em></h2>
          </div>
          <p>В каждой категории несколько моделей с разной плотностью, кроем и плотностью ткани. Выбранный вариант автоматически подставится в форму заявки.</p>
        </div>
        <ModelVariantBlock />
      </section>
      <CDInfo />
      <ExamplesGrid />
      <Pricing />
      <Related />
      <BottomNav />
      <FooterV6 />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Палитра">
          <TweakColor label="Жёлтый" value={t.yellow} onChange={v => setTweak('yellow', v)}
            options={['#FFD60A', '#FFC907', '#FFE34F', '#F9C800', '#FFEB3B']} />
          <TweakColor label="Синий" value={t.blue} onChange={v => setTweak('blue', v)}
            options={['#1B3FCA', '#2240FF', '#0033CC', '#162D6B', '#3D5AFE']} />
          <TweakColor label="Чёрный" value={t.ink} onChange={v => setTweak('ink', v)}
            options={['#0A0E1A', '#000000', '#14182A', '#06080F']} />
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
