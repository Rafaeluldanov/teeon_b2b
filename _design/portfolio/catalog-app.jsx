/* /catalog/ — listing page with 8 categories, scenarios, production steps */

const { HeaderV6, FooterV6 } = window;
const { Logotype, Photo } = window;
const { defaultCategories } = window.CatalogData;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakSlider } = window;

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

const CrumbBar = () => (
  <nav className="crumbs" aria-label="breadcrumb">
    <a href="index v6.html">Главная</a>
    <span className="sep">›</span>
    <span className="current">Каталог</span>
  </nav>
);

const CatHero = () => (
  <section className="cat-hero">
    <div className="cat-hero__yellow" aria-hidden></div>
    <div className="cat-hero__content">
      <CrumbBar />
      <h1>Каталог <span className="hl">промо-одежды</span><br />и&nbsp;<em>корпоративного мерча</em></h1>
      <p>
        8 базовых категорий: футболки, худи, свитшоты, лонгсливы, сумки, жилетки, куртки, дождевики.
        Любую позицию подгоняем под задачу — ткань, посадка, упаковка, фурнитура.
      </p>
      <div className="cat-hero__cta">
        <a href="index v6.html#request" className="btn btn--ink">
          Рассчитать заказ
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
        <a href="index v6.html#branding" className="btn btn--ghost-d">
          Способы брендирования
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7 L11 7 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
      </div>
    </div>

    <div className="cat-hero__stats">
      <div className="cat-hero__stat yellow">
        <div className="k">Категорий</div>
        <div className="v">8</div>
        <div className="d">базовых SKU под расчёт</div>
      </div>
      <div className="cat-hero__stat">
        <div className="k">Тираж</div>
        <div className="v">от 30<span className="u">шт</span></div>
        <div className="d">минимальный заказ на позицию</div>
      </div>
      <div className="cat-hero__stat ink">
        <div className="k">Срок</div>
        <div className="v" style={{ color: 'var(--yellow)' }}>10–14<span className="u" style={{ color: 'var(--paper)' }}>дней</span></div>
        <div className="d" style={{ opacity: .7 }}>стандартный тираж</div>
      </div>
      <div className="cat-hero__stat blue">
        <div className="k">Брендирование</div>
        <div className="v">9<span className="u">методов</span></div>
        <div className="d" style={{ opacity: .85 }}>от вышивки до DTF</div>
      </div>
    </div>
  </section>
);

const CategoryGrid = () => (
  <section className="catlist-grid section-spacer">
    {defaultCategories.map((c, i) => {
      const bgColor = c.bg || 'paper-2';
      const numStr = String(i + 1).padStart(2, '0');
      const tagsShown = c.brandings.slice(0, 3);
      const tagsMore = c.brandings.length - 3;
      return (
        <article className="catlist-card" key={c.slug}>
          <div className={`catlist-card__media ${bgColor}`}>
            <span className="catlist-card__num">{numStr} /</span>
            <span className="catlist-card__badge">✦ Брендирование</span>
            {renderSilhouette(c.kind, bgColor === 'paper-2' ? 0.5 : 0.4)}
          </div>
          <div className="catlist-card__body">
            <div className="catlist-card__head">
              <div className="catlist-card__name">{c.title}</div>
              <div className="catlist-card__short">{c.short}</div>
            </div>
            <ul className="catlist-card__tasks">
              {c.tasks.slice(0, 3).map(t => <li key={t}>{t}</li>)}
            </ul>
            <div className="catlist-card__tags">
              {tagsShown.map(t => <span className="catlist-card__tag" key={t}>{t}</span>)}
              {tagsMore > 0 && <span className="catlist-card__tag more">+{tagsMore}</span>}
            </div>
            <div className="catlist-card__actions">
              <a href={`category.html?slug=${c.slug}`} className="catlist-card__btn primary">Подробнее</a>
              <a href="index v6.html#request" className="catlist-card__btn ghost">В расчёт →</a>
            </div>
          </div>
        </article>
      );
    })}
  </section>
);

const scenarios = [
  {
    t: 'Промо-тираж', d: 'Раздача на ивенте, выставке, мероприятии.',
    bg: 'yellow', ic: 'p',
    links: [
      { slug: 'futbolki', label: 'Футболки' },
      { slug: 'sumki', label: 'Сумки' },
      { slug: 'dozhdeviki', label: 'Дождевики' },
    ],
  },
  {
    t: 'Подарок партнёру', d: 'Премиальный мерч на upmarket — для VIP-клиентов.',
    bg: '', ic: 'g',
    links: [
      { slug: 'hudi', label: 'Худи' },
      { slug: 'svitshoty', label: 'Свитшоты' },
      { slug: 'kurtki', label: 'Куртки' },
    ],
  },
  {
    t: 'Форма персонала', d: 'Униформа для офиса, ритейл-точки, кофейни.',
    bg: 'blue', ic: 'f',
    links: [
      { slug: 'futbolki', label: 'Футболки' },
      { slug: 'longslivy', label: 'Лонгсливы' },
      { slug: 'zhiletki', label: 'Жилеты' },
    ],
  },
  {
    t: 'Outdoor / зима', d: 'Тепло-, ветронепродуваемая одежда для outdoor-команд.',
    bg: 'ink', ic: 'o',
    links: [
      { slug: 'kurtki', label: 'Куртки' },
      { slug: 'zhiletki', label: 'Жилеты' },
      { slug: 'dozhdeviki', label: 'Дождевики' },
    ],
  },
];

const ScenarioIc = ({ k }) => {
  const p = { width: 24, height: 24, fill: 'none', stroke: 'currentColor', strokeWidth: 1.7 };
  if (k === 'p') return <svg {...p} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 12 L12 9 L15 12 L12 15 Z"/></svg>;
  if (k === 'g') return <svg {...p} viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="1.5"/><path d="M4 13 L20 13 M12 10 L12 20 M9 6 Q9 4 12 4 Q15 4 15 6 Q15 8 12 10 Q9 8 9 6 Z"/></svg>;
  if (k === 'f') return <svg {...p} viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M5 21 Q5 14 12 14 Q19 14 19 21"/></svg>;
  return <svg {...p} viewBox="0 0 24 24"><path d="M4 14 Q4 4 12 4 Q20 4 20 14 L20 20 L4 20 Z"/><path d="M9 14 L12 11 L15 14"/></svg>;
};

const Scenarios = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(02) — Как выбрать</div>
        <h2>Подбираем категорию <em>под задачу</em></h2>
      </div>
      <p>Четыре частых сценария мерча. Подскажем подходящую базу и метод брендирования, рассчитаем 2–3 варианта по бюджету.</p>
    </div>
    <div className="scenarios">
      {scenarios.map(s => (
        <div className={`scenario ${s.bg}`} key={s.t}>
          <span className="scenario__ic"><ScenarioIc k={s.ic} /></span>
          <div className="scenario__t">{s.t}</div>
          <div className="scenario__d">{s.d}</div>
          <div className="scenario__links">
            {s.links.map(l => (
              <a className="scenario__link" key={l.slug} href={`category.html?slug=${l.slug}`}>{l.label}</a>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const prodSteps = [
  { t: 'Подбор', d: 'Ткань, тираж, способы нанесения — обсуждаем под задачу.' },
  { t: 'Расчёт', d: 'Смета, варианты тканей и методов нанесения (2–3 опции).' },
  { t: 'Макет', d: 'Дизайнер собирает технический макет с размерами и цветами.' },
  { t: 'Образец', d: 'Шьём pre-production sample, согласуем с заказчиком.' },
  { t: 'Раскрой', d: 'Лазерный раскрой по утверждённым лекалам.' },
  { t: 'Пошив', d: 'Тираж в цехе с ОТК на трёх этапах.' },
  { t: 'Нанесение', d: 'Брендирование выбранным методом (вышивка, печать, тиснение).' },
  { t: 'Упаковка и доставка', d: 'Индивидуальная упаковка, маркировка, отгрузка ТК.' },
];

const Production = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(03) — Производство</div>
        <h2>Что входит<br /><em>в работу</em></h2>
      </div>
      <p>Полный цикл — от подбора ткани до отгрузки. Восемь этапов на одной площадке: без посредников, потерь времени и качества.</p>
    </div>
    <div className="prod-list">
      {prodSteps.map((s, i) => (
        <div className="prod-step" key={s.t}>
          <span className="prod-step__num">{String(i + 1).padStart(2, '0')}</span>
          <div className="prod-step__t">{s.t}</div>
          <div className="prod-step__d">{s.d}</div>
        </div>
      ))}
    </div>
  </section>
);

const SeoText = () => (
  <section className="seo section-spacer">
    <div>
      <div className="kicker" style={{ marginBottom: 16 }}>(04) — Подробнее</div>
      <h3>Каталог промо-одежды и&nbsp;корпоративного мерча TEEON</h3>
    </div>
    <div>
      <p>
        Производим корпоративную одежду и промо-мерч для бизнеса в собственном швейном цехе. В каталоге восемь базовых категорий: футболки, худи, свитшоты, лонгсливы, сумки и шопперы, жилетки, куртки (софтшелл и утеплённые), дождевики. Под любую категорию шьём с любой плотностью ткани и под любую посадку — slim, regular, oversize.
      </p>
      <p>
        Каждая категория поддерживает 4–6 методов брендирования: вышивку, шелкографию, DTF, DTG, сублимацию, тиснение, шевроны, тканые бирки, лазерную гравировку. Технологию подбираем под ткань, тираж и эффект. Все этапы — от лекала и раскроя до нанесения и упаковки — проходят на одной площадке, поэтому мы контролируем сроки и качество без посредников. Работаем с юрлицами по полному пакету документов и доставляем по всей России.
      </p>
    </div>
  </section>
);

const CtaBlock = () => (
  <section className="cta-block section-spacer">
    <div>
      <h2>Не нашли нужную <em>позицию</em>?</h2>
      <p>
        Шьём по индивидуальному лекалу, делаем поло, рубашки, фартуки, шапки, толстовки на молнии, спортивную форму. Опишите задачу — рассчитаем и пришлём 2–3 варианта.
      </p>
    </div>
    <a href="index v6.html#request" className="btn btn--yellow cta-block__btn">
      Оставить заявку
      <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
    </a>
  </section>
);

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

  return (
    <div className="page">
      <HeaderV6 />
      <CatHero />
      <CategoryGrid />
      <Scenarios />
      <Production />
      <SeoText />
      <CtaBlock />
      <FooterV6 />

      <TweaksPanel title="Tweaks Catalog">
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
