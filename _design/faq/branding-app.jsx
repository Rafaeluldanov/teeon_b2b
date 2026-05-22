/* /branding/ — listing page with 9 methods, scenarios, products, process, FAQ */

const { HeaderV6, FooterV6 } = window;
const { defaultMethods } = window.BrandingData;
const { defaultCategories } = window.CatalogData;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakSlider } = window;

const Crumbs = () => (
  <nav className="crumbs" aria-label="breadcrumb">
    <a href="index v6.html">Главная</a>
    <span className="sep">›</span>
    <span className="current">Брендирование</span>
  </nav>
);

/* ---------- HERO ---------- */
const heroBadges = [
  { ic: '✦', t: 'Нанесение логотипов' },
  { ic: '⚙', t: 'Подбор технологии' },
  { ic: '✎', t: 'Макет и согласование' },
  { ic: '✓', t: 'Производство под ключ' },
];

const BrHero = () => (
  <section className="cat-hero">
    <div className="cat-hero__yellow" aria-hidden></div>
    <div className="cat-hero__content">
      <Crumbs />
      <h1>9 способов <span className="hl">нанести логотип</span><br />на одежду и&nbsp;<em>аксессуары</em></h1>
      <p>
        Вышивка, шелкография, DTF, DTG, сублимация, тиснение, гравировка, бирки, шевроны.
        Подбираем технологию под ткань, тираж, бюджет и эффект. Считаем 2–3 варианта.
      </p>
      <div className="bh-badges">
        {heroBadges.map(b => (
          <div className="bh-badge" key={b.t}>
            <span className="ic">{b.ic}</span>
            <span className="t">{b.t}</span>
          </div>
        ))}
      </div>
      <div className="cat-hero__cta" style={{ marginTop: 10 }}>
        <a href="index v6.html#request" className="btn btn--ink">
          Рассчитать брендирование
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
        <a href="catalog.html" className="btn btn--ghost-d">
          Смотреть каталог
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7 L11 7 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
      </div>
    </div>

    <div className="cat-hero__stats">
      <div className="cat-hero__stat yellow">
        <div className="k">Методов</div>
        <div className="v">9</div>
        <div className="d">от вышивки до тиснения</div>
      </div>
      <div className="cat-hero__stat">
        <div className="k">Тираж</div>
        <div className="v">от 1<span className="u">шт</span></div>
        <div className="d">DTF/DTG, гравировка — без минимума</div>
      </div>
      <div className="cat-hero__stat ink">
        <div className="k">Образец</div>
        <div className="v" style={{ color: 'var(--yellow)' }}>2–5<span className="u" style={{ color: 'var(--paper)' }}>дней</span></div>
        <div className="d" style={{ opacity: .7 }}>pre-production sample</div>
      </div>
      <div className="cat-hero__stat blue">
        <div className="k">Производство</div>
        <div className="v">10–14<span className="u">дней</span></div>
        <div className="d" style={{ opacity: .85 }}>с момента согласования</div>
      </div>
    </div>
  </section>
);

/* ---------- METHOD GRID ---------- */
const methodBgs = ['', 'yellow', '', 'blue', '', 'ink', '', '', 'yellow'];

const MethodGrid = () => (
  <section className="bm-grid section-spacer">
    {defaultMethods.map((m, i) => (
      <article className={`bm ${methodBgs[i] || ''}`} key={m.slug}>
        <div className="bm__head">
          <span className="bm__icon">
            {m.iconImage ? <img src={m.iconImage} alt={m.name} style={{ width: 32, height: 32, objectFit: 'contain' }} /> : <span>{m.icon}</span>}
          </span>
          <span className="bm__num">{String(i + 1).padStart(2, '0')}</span>
        </div>
        <div>
          <div className="bm__name">{m.name}</div>
          <p className="bm__short" style={{ marginTop: 6 }}>{m.shortDesc}</p>
        </div>
        <div className="bm__tags">
          {(m.tags || []).slice(0, 2).map(t => <span className="bm__tag" key={t}>{t}</span>)}
        </div>
        <div className="bm__actions">
          <a href={`branding-method.html?slug=${m.slug}`} className="bm__btn primary">Подробнее</a>
          <a href="index v6.html#request" className="bm__btn ghost">В расчёт →</a>
        </div>
      </article>
    ))}
  </section>
);

/* ---------- SCENARIOS ---------- */
const scenarios = [
  { t: 'Премиальный вид',      d: 'Корпоративный набор, форма, VIP-подарок.',     bg: '',       methods: ['vyshivka', 'shevrony', 'birki'] },
  { t: 'Промо-тираж',           d: 'Раздача на ивенте, фестивале, конференции.',    bg: 'yellow', methods: ['shelkografiya'] },
  { t: 'Полноцветный принт',    d: 'Сложный лого с градиентами и фото.',           bg: 'blue',   methods: ['dtf-pechat', 'dtg-pechat'] },
  { t: 'Форма / синтетика',     d: 'Игровая форма, дождевики, ветровки.',           bg: '',       methods: ['sublimaciya'] },
  { t: 'Корпоративный набор',   d: 'Премиум-упаковка, кожаные бирки, гравировка.',  bg: 'ink',    methods: ['tisnenie', 'gravirovka', 'birki'] },
];

const methodByslug = (slug) => defaultMethods.find(m => m.slug === slug);

const ScenariosBr = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(02) — Как выбрать</div>
        <h2>Подбираем метод <em>под задачу</em></h2>
      </div>
      <p>Пять сценариев мерча и наиболее подходящие методы нанесения. На сложных задачах — комбинируем 2 метода.</p>
    </div>
    <div className="scenarios" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
      {scenarios.map(s => (
        <div className={`scenario ${s.bg}`} key={s.t}>
          <span className="scenario__ic">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M11 2 L13 8 L19 8 L14 12 L16 19 L11 15 L6 19 L8 12 L3 8 L9 8 Z"/></svg>
          </span>
          <div className="scenario__t">{s.t}</div>
          <div className="scenario__d">{s.d}</div>
          <div className="scenario__links">
            {s.methods.map(ms => {
              const m = methodByslug(ms);
              return <a className="scenario__link" key={ms} href={`branding-method.html?slug=${ms}`}>{m?.name || ms}</a>;
            })}
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- PRODUCTS BAR ---------- */
const ProductsBar = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(03) — Изделия</div>
        <h2>На какие <em>изделия</em> наносим</h2>
      </div>
      <p>Любая категория из каталога TEEON. Плюс аксессуары и фирменная упаковка по индивидуальному запросу.</p>
    </div>
    <div className="products-bar">
      <span className="products-bar__lead">Категории:</span>
      {defaultCategories.map(c => (
        <a className="products-bar__chip" key={c.slug} href={`category.html?slug=${c.slug}`}>
          {c.title}
        </a>
      ))}
      <span className="products-bar__chip muted">Аксессуары</span>
      <span className="products-bar__chip muted">Упаковка</span>
    </div>
  </section>
);

/* ---------- PROCESS ---------- */
const processSteps = [
  { t: 'Задача', d: 'Обсуждаем результат, бюджет, дедлайн.' },
  { t: 'Проверка макета', d: 'Дизайнер проверяет вектор и совместимость.' },
  { t: 'Подбор технологии', d: 'Подбираем метод под ткань и тираж.' },
  { t: 'Тестовый образец', d: 'Шьём pre-production sample, согласуем.' },
  { t: 'Нанесение', d: 'Производство тиража с контролем ОТК.' },
  { t: 'Проверка + упаковка', d: 'ОТК, индивидуальная упаковка, маркировка, отгрузка.' },
];

const ProcessBlock = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(04) — Процесс</div>
        <h2>Как проходит <em>брендирование</em></h2>
      </div>
      <p>Шесть шагов — от первого касания до отгрузки готового тиража. Каждый этап с фиксацией результата и согласованием.</p>
    </div>
    <div className="prod-list" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
      {processSteps.map((s, i) => (
        <div className="prod-step" key={s.t}>
          <span className="prod-step__num">{String(i + 1).padStart(2, '0')}</span>
          <div className="prod-step__t">{s.t}</div>
          <div className="prod-step__d">{s.d}</div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- FACTORS ---------- */
const factors = [
  'Тираж — критичен для большинства методов',
  'Размер нанесения (см²)',
  'Количество цветов в макете',
  'Сложность графики и детализация',
  'Тип ткани и плотность',
  'Цвет ткани (тёмная = подложка)',
  'Количество мест нанесения',
  'Срок и приоритет производства',
];

const FactorsBlock = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(05) — Стоимость</div>
        <h2>Что влияет на <em>цену</em></h2>
      </div>
      <p>Восемь основных факторов, которые определяют стоимость брендирования. Конечная смета — индивидуальная.</p>
    </div>
    <div className="factors-grid">
      {factors.map((f, i) => (
        <div className="factor" key={f}>
          <span className="factor__ic">{String(i + 1).padStart(2, '0')}</span>
          <span className="factor__t">{f}</span>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- FAQ (native details) ---------- */
const faqs = [
  { q: 'Какой минимальный тираж для брендирования?', a: 'Большинство методов работают от 30–50 шт. DTF, DTG и лазерная гравировка — от 1 шт. Точную цифру по методу смотрите в его карточке.' },
  { q: 'Сколько занимает образец до тиража?', a: 'Pre-production sample — 2–5 рабочих дней с момента согласования макета. Стоимость образца входит в смету при тираже от 100 шт.' },
  { q: 'Что лучше — DTF или шелкография?', a: 'DTF — для малых тиражей и сложной графики (фото, градиенты). Шелкография — для больших тиражей с простым лого (1–4 цвета). От 200 шт шелкография обычно дешевле.' },
  { q: 'Можно ли комбинировать методы?', a: 'Да. Часто комбинируем вышивку (грудь) + DTF (спина) или тиснение бирки + шелкография на корпусе. Подскажем оптимальную комбинацию под бюджет.' },
  { q: 'Подходит ли DTG для тёмных тканей?', a: 'Да, но с белой подложкой. Это удорожает печать на 25–35%. Если макет можно адаптировать — иногда выгоднее DTF.' },
  { q: 'Кто готовит макет — мы или вы?', a: 'Лучше — вы (вектор AI/SVG/EPS). Если макета нет — наш дизайнер подготовит за 2–3 часа (платно, входит в смету при тираже от 100 шт).' },
];

const FaqBlock = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(06) — FAQ</div>
        <h2>Часто <em>спрашивают</em></h2>
      </div>
      <p>Шесть вопросов про методы и процесс брендирования. На остальные ответим в чате.</p>
    </div>
    <div className="faq-native">
      {faqs.map((f, i) => (
        <details key={i} open={i === 0}>
          <summary>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <span className="q">{f.q}</span>
            <span className="t">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2 L8 14 M2 8 L14 8" stroke="currentColor" strokeWidth="1.8"/></svg>
            </span>
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  </section>
);

/* ---------- SEO TEXT ---------- */
const SeoBr = () => (
  <section className="seo section-spacer">
    <div>
      <div className="kicker" style={{ marginBottom: 16 }}>(07) — Подробнее</div>
      <h3>Брендирование одежды и&nbsp;аксессуаров под&nbsp;ключ</h3>
    </div>
    <div>
      <p>
        Наносим логотипы на промо-одежду, корпоративную форму, упаковку и аксессуары — 9 методами: вышивка, шевроны, шелкография, DTF, DTG, сублимация, тиснение, лазерная гравировка, фирменные бирки. Метод подбираем под ткань, тираж и эффект — на консультации обсуждаем 2–3 оптимальных варианта.
      </p>
      <p>
        Всё производство (пошив + нанесение + упаковка) — на одной площадке в Подмосковье. Это экономит до недели по логистике между подрядчиками и даёт нам полный контроль качества: ОТК на трёх этапах, замена брака за наш счёт, образец до тиража. Работаем с юрлицами по полному пакету документов, доставляем по всей России.
      </p>
    </div>
  </section>
);

/* ---------- CTA ---------- */
const CtaBr = () => (
  <section className="cta-block section-spacer">
    <div>
      <h2>Нужно подобрать <em>способ нанесения</em>?</h2>
      <p>
        Отправьте задачу с тиражом и тканью — рассчитаем 2–3 метода с разной ценой, пришлём образцы.
        Время первого ответа — 1 час в рабочее время.
      </p>
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
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "/" },
      { "@type": "ListItem", "position": 2, "name": "Брендирование", "item": "/branding/" },
    ],
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Брендирование одежды и аксессуаров",
    "provider": { "@type": "Organization", "name": "TEEON" },
    "areaServed": "RU",
    "serviceType": "Нанесение логотипа на одежду",
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };
  [breadcrumbs, service, faq].forEach(obj => {
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
      <BrHero />
      <MethodGrid />
      <ScenariosBr />
      <ProductsBar />
      <ProcessBlock />
      <FactorsBlock />
      <FaqBlock />
      <SeoBr />
      <CtaBr />
      <FooterV6 />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Палитра">
          <TweakColor label="Жёлтый" value={t.yellow} onChange={v => setTweak('yellow', v)}
            options={['#FFD60A', '#FFC907', '#FFE34F', '#F9C800']} />
          <TweakColor label="Синий" value={t.blue} onChange={v => setTweak('blue', v)}
            options={['#1B3FCA', '#2240FF', '#0033CC', '#162D6B']} />
          <TweakColor label="Чёрный" value={t.ink} onChange={v => setTweak('ink', v)}
            options={['#0A0E1A', '#000000', '#14182A']} />
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
