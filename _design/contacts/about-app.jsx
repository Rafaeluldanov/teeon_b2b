/* /about/ — full company page in v6 style */

const { HeaderV6, FooterV6 } = window;
const { companyData } = window.CompanyData;
const { loadCases } = window.PortfolioData;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakSlider } = window;

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
const AbHero = () => (
  <section className="ab-hero">
    <div className="ab-hero__content">
      <nav className="ab-hero__crumbs" aria-label="breadcrumb">
        <a href="index v6.html">Главная</a>
        <span className="sep">›</span>
        <span className="current">О компании</span>
      </nav>
      <div className="ab-hero__facts">
        {companyData.productionFacts.map(f => (
          <span className="ab-hero__fact" key={f.value}>
            <span className="ic">{f.ic}</span>
            {f.value}
          </span>
        ))}
      </div>
      <h1>О&nbsp;компании <em>TEEON</em></h1>
      <div className="ab-hero__desc">
        <p>{companyData.shortDescription}</p>
        <p>{companyData.fullDescription}</p>
      </div>
      <div className="ab-hero__cta">
        <a href="index v6.html#request" className="btn btn--yellow">
          Рассчитать заказ
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
        <a href="portfolio.html" className="btn btn--ghost">
          Смотреть портфолио
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7 L11 7 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
      </div>
    </div>

    <div className="ab-hero__video">
      <div className="ab-hero__video__play">▶</div>
      <div className="ab-hero__video__t">Фото или видео производства</div>
      <div className="ab-hero__video__d">Швейный цех, оборудование для брендирования, нанесение логотипов, упаковка заказов</div>
    </div>
  </section>
);

/* ---------- 2. TEXT + ADVANTAGES ---------- */
const AbTextAdv = () => (
  <section className="ab-text-adv section-spacer">
    <div className="ab-text">
      <div className="kicker">(02) — Производство</div>
      <div className="ab-text__t">Мы производим, <em>а&nbsp;не перепродаём</em></div>
      <p>У&nbsp;нас собственный швейный цех и оборудование для нанесения логотипов. Это позволяет вести весь проект внутри одной производственной цепочки: от подбора ткани и пошива до брендирования и упаковки. Без посредников между этапами.</p>
      <p>Работаем только с&nbsp;юридическими лицами и&nbsp;ИП. Договор, счёт, закрывающие документы, маркировка для маркетплейсов&nbsp;— весь стандартный B2B-комплект. Один менеджер ведёт проект от&nbsp;брифа до&nbsp;отгрузки.</p>
    </div>
    <div className="ab-adv-grid">
      {companyData.advantages.map(a => (
        <div className={`ab-adv ${a.bg}`} key={a.t}>
          <span className="ab-adv__ic">{a.ic}</span>
          <div className="ab-adv__t">{a.t}</div>
          <div className="ab-adv__d">{a.d}</div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- 3. CAPABILITIES ---------- */
const capBgs = ['', 'yellow', '', 'blue', '', 'ink'];

const AbCapabilities = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(03) — Возможности</div>
        <h2>Производственные <em>возможности</em></h2>
      </div>
      <p>Шесть основных направлений работы — от пошива и нанесения до welcome-наборов и проектов под мероприятия.</p>
    </div>
    <div className="ab-caps">
      {companyData.capabilities.map((c, i) => (
        <a className={`ab-cap ${capBgs[i] || ''}`} key={c.t} href={c.href}>
          <span className="ab-cap__ic">{c.ic}</span>
          <div className="ab-cap__t">{c.t}</div>
          <div className="ab-cap__d">{c.d}</div>
          <span className="ab-cap__link">
            Подробнее
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M3 8 L8 3 M4 3 L8 3 L8 7" stroke="currentColor" strokeWidth="1.7"/></svg>
          </span>
        </a>
      ))}
    </div>
  </section>
);

/* ---------- 4. EQUIPMENT ---------- */
const AbEquipment = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(04) — Оборудование</div>
        <h2>Оборудование <em>и&nbsp;процессы</em></h2>
      </div>
      <p>Шесть категорий оборудования собственного цеха — пошив, раскрой, вышивка, печать, шелкография, тиснение.</p>
    </div>
    <div className="ab-eq">
      {companyData.equipment.map(e => (
        <div className="ab-eq__card" key={e.name}>
          <span className="ab-eq__ic">{e.ic}</span>
          <div className="ab-eq__t">{e.name}</div>
          <div className="ab-eq__d">{e.d}</div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- 5. QUALITY CONTROL ---------- */
const AbQuality = () => (
  <section className="section-spacer">
    <div className="ab-qc">
      <div className="ab-qc__head">
        <div>
          <div className="kicker on-dark" style={{ marginBottom: 14 }}>(05) — Качество</div>
          <h2>Контроль <em>качества</em></h2>
        </div>
        <p>Семь этапов проверки от&nbsp;согласования макета до&nbsp;финальной упаковки. Брак&nbsp;— ноль.</p>
      </div>
      <ol className="ab-qc__list">
        {companyData.qualityControl.map(q => (
          <li className="ab-qc__step" key={q.num}>
            <span className="ab-qc__num">{q.num}</span>
            <div className="ab-qc__t">{q.step}</div>
            <div className="ab-qc__d">{q.d}</div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/* ---------- 6. WORKFLOW ---------- */
const AbWorkflow = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(06) — Процесс</div>
        <h2>Как проходит работа<br />с&nbsp;<em>B2B-заказом</em></h2>
      </div>
      <p>Семь шагов от&nbsp;брифа до&nbsp;отгрузки. На&nbsp;каждом&nbsp;— фиксация результата и&nbsp;согласование с&nbsp;клиентом.</p>
    </div>
    <div className="ab-wf">
      {companyData.workflow.map(w => (
        <div className="ab-wf__row" key={w.num}>
          <div className="ab-wf__num">{w.num}</div>
          <div className="ab-wf__main">
            <div className="ab-wf__t">{w.t}</div>
            <div className="ab-wf__d">{w.d}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- 7. SCENARIOS ---------- */
const AbScenarios = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(07) — Задачи</div>
        <h2>С&nbsp;какими <em>задачами</em> работаем</h2>
      </div>
      <p>Шесть типов B2B-проектов, которые регулярно проходят через производство TEEON.</p>
    </div>
    <div className="ab-sc">
      {companyData.scenarios.map((s, i) => (
        <div className={`ab-sc__card ${s.bg}`} key={s.t}>
          <div className="ab-sc__num">{String(i + 1).padStart(2, '0')} /</div>
          <div className="ab-sc__t">{s.t}</div>
          <div className="ab-sc__d">{s.d}</div>
          <div className="ab-sc__links">
            {s.links.map(l => <a key={l.l} className="ab-sc__link" href={l.h}>{l.l}</a>)}
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- 8. DOCUMENTS ---------- */
const AbDocuments = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(08) — Документы</div>
        <h2>Документы и&nbsp;<em>работа с&nbsp;юрлицами</em></h2>
      </div>
      <p>Полный B2B-пакет для бухгалтерии и&nbsp;юр-отдела. Работаем с&nbsp;ООО и&nbsp;ИП по&nbsp;договору.</p>
    </div>
    <div className="ab-docs">
      <div className="ab-docs__col">
        <div className="ab-docs__t">Что включает&nbsp;<span style={{ color: 'var(--blue)' }}>стандартный пакет</span></div>
        <p className="ab-docs__d">Полный набор закрывающих документов и&nbsp;бухгалтерское сопровождение проекта. Маркировка партий для&nbsp;маркетплейсов&nbsp;— по&nbsp;запросу.</p>
        <ul className="ab-docs__list">
          {companyData.documents.map(d => <li key={d}>{d}</li>)}
        </ul>
        <a href="index v6.html#request" className="btn btn--ink ab-docs__btn">
          Запросить расчёт
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
      </div>
      <div className="ab-docs__col">
        <div className="ab-docs__t">Производственные <span style={{ color: 'var(--blue)' }}>параметры</span></div>
        <p className="ab-docs__d">Ключевые B2B-характеристики: формат, тип, контроль и&nbsp;география. Подходим для&nbsp;большинства корпоративных задач.</p>
        <div className="ab-stats-grid">
          {companyData.productionStats.map(s => (
            <div className={`ab-stat ${s.bg}`} key={s.label}>
              <div className="ab-stat__l">{s.label}</div>
              <div className="ab-stat__v">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ---------- 9. VALUES ---------- */
const AbValues = () => (
  <section className="section-spacer">
    <div className="ab-vals">
      <div className="ab-vals__head">
        <div>
          <div className="kicker on-dark" style={{ marginBottom: 14 }}>(09) — Ценности</div>
          <h2>Что важно <em>для нас</em><br />в&nbsp;производстве</h2>
        </div>
        <p>Шесть базовых принципов, на&nbsp;которых строится каждый проект&nbsp;— от&nbsp;брифа до&nbsp;отгрузки готовой партии.</p>
      </div>
      <div className="ab-vals__grid">
        {companyData.values.map(v => (
          <div className="ab-val" key={v.t}>
            <span className="ab-val__ic">{v.ic}</span>
            <div className="ab-val__t">{v.t}</div>
            <div className="ab-val__d">{v.d}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- 10. PORTFOLIO PREVIEW ---------- */
const AbPortfolio = () => {
  const cases = loadCases().slice(0, 3);
  return (
    <section className="section-spacer">
      <div className="ab-pf-head">
        <div>
          <div className="kicker">(10) — Кейсы</div>
          <div className="ab-pf-head__t">Свежие <em>проекты</em></div>
        </div>
        <a href="portfolio.html" className="btn btn--ghost-d">
          Все кейсы
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
      </div>
      <div className="case-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {cases.map(c => (
          <article className="case" key={c.slug}>
            <div className={`case__media ${c.bg || 'paper-2'}`}>
              <span className="case__chip">{c.clientType}</span>
              <span className="case__date">{c.year}</span>
              {renderSilhouette(c.kind, c.bg === 'paper-2' || !c.bg ? 0.5 : 0.45)}
            </div>
            <div className="case__body">
              <h3 className="case__title">{c.title}</h3>
              <dl className="case__meta">
                <dt>Тираж</dt><dd>{c.quantity}</dd>
                <dt>Срок</dt><dd>{c.timeline}</dd>
              </dl>
              <div className="case__actions">
                <a href={`portfolio-case.html?slug=${c.slug}`} className="cat__btn">Смотреть кейс</a>
                <a href="index v6.html#request" className="cat__quote" style={{ marginLeft: 'auto' }}>Рассчитать похожий →</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

/* ---------- 11. SEO ---------- */
const AbSeo = () => (
  <section className="seo section-spacer">
    <div>
      <div className="kicker" style={{ marginBottom: 16 }}>(11) — Подробнее</div>
      <h3>Производство промо-одежды и&nbsp;корпоративного мерча</h3>
    </div>
    <div>
      <p>
        TEEON&nbsp;— производственная компания полного цикла. Шьём промо-одежду и&nbsp;корпоративный мерч в&nbsp;собственном швейном цехе, наносим логотипы на&nbsp;собственном оборудовании, упаковываем и&nbsp;отгружаем партии под B2B-задачи. Работаем с&nbsp;юридическими лицами и&nbsp;ИП&nbsp;— договор, счёт, закрывающие документы.
      </p>
      <p>
        Производство одной цепочкой даёт нам контроль над сроками, качеством и&nbsp;стабильностью партии. Каждый тираж проходит ОТК на&nbsp;семи этапах&nbsp;— от&nbsp;входного контроля ткани до&nbsp;финальной проверки упаковки. До&nbsp;запуска тиража согласуем pre-production sample&nbsp;— образец, который точно соответствует тому, что вы получите в&nbsp;партии.
      </p>
    </div>
  </section>
);

/* ---------- 12. CTA ---------- */
const AbCta = () => (
  <section className="cta-block section-spacer">
    <div>
      <h2>Обсудим <em>ваш проект</em>?</h2>
      <p>Опишите задачу&nbsp;— рассчитаем 2–3 варианта по&nbsp;бюджету, согласуем образец до&nbsp;тиража, отгрузим в&nbsp;срок.</p>
    </div>
    <a href="index v6.html#request" className="btn btn--yellow cta-block__btn">
      Оставить заявку
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
      { "@type": "ListItem", "position": 2, "name": "О компании", "item": "/about/" },
    ],
  };
  const org = {
    "@context": "https://schema.org", "@type": "Organization",
    "name": "TEEON",
    "description": companyData.shortDescription,
    "url": "/",
  };
  [breadcrumbs, org].forEach(obj => {
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
      <AbHero />
      <AbTextAdv />
      <AbCapabilities />
      <AbEquipment />
      <AbQuality />
      <AbWorkflow />
      <AbScenarios />
      <AbDocuments />
      <AbValues />
      <AbPortfolio />
      <AbSeo />
      <AbCta />
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
