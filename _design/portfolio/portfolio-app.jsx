/* /portfolio/ — list of cases with filter by ?tag=  */

const { HeaderV6, FooterV6 } = window;
const { defaultCases, tagDictionary, loadCases } = window.PortfolioData;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakSlider } = window;

const params = new URLSearchParams(window.location.search);
const activeTag = params.get('tag') || 'all';

/* render silhouette helper for case media */
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
const PfHero = () => (
  <section className="cat-hero">
    <div className="cat-hero__yellow" aria-hidden></div>
    <div className="cat-hero__content">
      <nav className="crumbs" aria-label="breadcrumb">
        <a href="index v6.html">Главная</a>
        <span className="sep">›</span>
        <span className="current">Портфолио</span>
      </nav>
      <h1>Портфолио <em>B2B-проектов</em><br />и&nbsp;<span className="hl">кейсов</span></h1>
      <p>
        Девять реальных проектов: welcome-наборы IT, форма для events, шопперы для ритейла, мерч для конференций.
        Каждый — с задачей, тиражом, технологиями и сроками.
      </p>
      <div className="cat-hero__cta">
        <a href="index v6.html#request" className="btn btn--ink">
          Рассчитать похожий проект
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
        <div className="k">Кейсов</div>
        <div className="v">9</div>
        <div className="d">за&nbsp;2025–2026</div>
      </div>
      <div className="cat-hero__stat">
        <div className="k">Единиц</div>
        <div className="v">3 100<span className="u">+</span></div>
        <div className="d">пошито и отгружено</div>
      </div>
      <div className="cat-hero__stat ink">
        <div className="k">Брак</div>
        <div className="v" style={{ color: 'var(--yellow)' }}>0<span className="u" style={{ color: 'var(--paper)' }}>%</span></div>
        <div className="d" style={{ opacity: .7 }}>замены не&nbsp;потребовалось</div>
      </div>
      <div className="cat-hero__stat blue">
        <div className="k">Средний срок</div>
        <div className="v">12<span className="u">дней</span></div>
        <div className="d" style={{ opacity: .85 }}>от&nbsp;макета до&nbsp;отгрузки</div>
      </div>
    </div>
  </section>
);

/* ---------- FILTER STRIP ---------- */
const PfFilters = ({ found }) => (
  <section className="section-spacer">
    <div className="pf-filters">
      <span className="pf-filters__lead">Фильтр:</span>
      {tagDictionary.map(t => {
        const isAll = t.slug === 'all';
        const active = activeTag === t.slug || (activeTag === 'all' && isAll);
        const href = isAll ? 'portfolio.html' : `portfolio.html?tag=${t.slug}`;
        return (
          <a className={`pf-filter ${active ? 'active' : ''} ${isAll ? 'all' : ''}`}
             key={t.slug} href={href}>
            {t.label}
          </a>
        );
      })}
      {activeTag !== 'all' && (
        <span className="pf-found">Найдено: {found}</span>
      )}
    </div>
  </section>
);

/* ---------- CASES GRID ---------- */
const CasesGrid = ({ cases }) => (
  <section className="case-grid section-spacer" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
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
            <dt>Задача</dt><dd>{c.shortTitle}</dd>
            <dt>Тираж</dt><dd>{c.quantity}</dd>
            <dt>Срок</dt><dd>{c.timeline}</dd>
            <dt>Индустрия</dt><dd>{c.industry.split('·')[0].trim()}</dd>
          </dl>
          <div className="case__actions">
            <a href={`portfolio-case.html?slug=${c.slug}`} className="cat__btn">Смотреть кейс</a>
            <a href="index v6.html#request" className="cat__quote" style={{ marginLeft: 'auto' }}>Рассчитать похожий →</a>
          </div>
        </div>
      </article>
    ))}
  </section>
);

const CasesEmpty = () => (
  <section className="section-spacer">
    <div className="pf-empty">
      <div className="t">Кейсов по&nbsp;этому тегу пока нет</div>
      <p>Попробуйте другой фильтр или посмотрите все кейсы.</p>
      <a href="portfolio.html" className="btn btn--ink">
        Смотреть все кейсы
        <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
      </a>
    </div>
  </section>
);

/* ---------- TASKS ---------- */
const tasks = [
  { t: 'Мерч для сотрудников', d: 'Худи, свитшоты и футболки с лого для команды.', bg: '', ic: '👥',
    links: [{ l: 'Худи', h: 'category.html?slug=hudi' }, { l: 'Свитшоты', h: 'category.html?slug=svitshoty' }, { l: 'Вышивка', h: 'branding-method.html?slug=vyshivka' }] },
  { t: 'Welcome-наборы', d: 'Комплекты для онбординга новых сотрудников.', bg: 'yellow', ic: '👋',
    links: [{ l: 'Худи', h: 'category.html?slug=hudi' }, { l: 'Сумки', h: 'category.html?slug=sumki' }, { l: 'DTF', h: 'branding-method.html?slug=dtf-pechat' }] },
  { t: 'Промо-одежда для мероприятий', d: 'Тиражи 200–1000 шт. для фестивалей и конференций.', bg: '', ic: '🎤',
    links: [{ l: 'Футболки', h: 'category.html?slug=futbolki' }, { l: 'Шелкография', h: 'branding-method.html?slug=shelkografiya' }] },
  { t: 'Форма для персонала', d: 'Униформа кафе, ритейла, сервисных команд.', bg: 'blue', ic: '🧥',
    links: [{ l: 'Лонгсливы', h: 'category.html?slug=longslivy' }, { l: 'Жилетки', h: 'category.html?slug=zhiletki' }, { l: 'Вышивка', h: 'branding-method.html?slug=vyshivka' }] },
  { t: 'Мерч для выставок', d: 'Форма стенда + раздаточные позиции.', bg: '', ic: '🏷️',
    links: [{ l: 'Куртки', h: 'category.html?slug=kurtki' }, { l: 'Сумки', h: 'category.html?slug=sumki' }] },
  { t: 'Корпоративные подарки', d: 'Премиум-комплекты для VIP-клиентов и партнёров.', bg: 'ink', ic: '🎁',
    links: [{ l: 'Куртки', h: 'category.html?slug=kurtki' }, { l: 'Тиснение', h: 'branding-method.html?slug=tisnenie' }] },
];

const TasksBlock = () => (
  <section className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(02) — Сценарии</div>
        <h2>Какие <em>задачи</em> решаем</h2>
      </div>
      <p>Шесть типов B2B-проектов, которые мы регулярно делаем. На каждом — конкретные подходы и проверенные технологии.</p>
    </div>
    <div className="pf-tasks">
      {tasks.map(t => (
        <div className={`pf-task ${t.bg}`} key={t.t}>
          <span className="pf-task__ic">{t.ic}</span>
          <div className="pf-task__t">{t.t}</div>
          <div className="pf-task__d">{t.d}</div>
          <div className="pf-task__links">
            {t.links.map(l => <a key={l.l} className="pf-task__link" href={l.h}>{l.l}</a>)}
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- WHAT WE SHOW ---------- */
const showItems = [
  'Задача клиента — какую B2B-проблему решали',
  'Состав заказа — конкретные изделия и комплектность',
  'Тираж — сколько единиц пошито и отгружено',
  'Технологии брендирования — какие методы применили',
  'Сроки — от первого касания до отгрузки',
  'Фото изделий — обложка и галерея процесса',
  'Упаковка — индивидуальная или массовая',
  'Результат — что получил клиент',
];

const ShowBlock = () => (
  <section className="section-spacer">
    <div className="pf-show">
      <div>
        <div className="kicker" style={{ marginBottom: 12 }}>(03) — Прозрачность</div>
        <div className="pf-show__t">Что показываем <em>в кейсах</em></div>
        <p className="pf-show__d">
          В каждом кейсе — полная вводная по проекту. Без маркетинговых обтекаемых формулировок.
          Хотим, чтобы вы могли сравнить со своей задачей и оценить, подойдут ли наши подходы.
        </p>
      </div>
      <ul className="pf-show__list">
        {showItems.map(t => <li key={t}>{t}</li>)}
      </ul>
    </div>
  </section>
);

/* ---------- SEO ---------- */
const SeoBlock = () => (
  <section className="seo section-spacer">
    <div>
      <div className="kicker" style={{ marginBottom: 16 }}>(04) — Подробнее</div>
      <h3>Портфолио кейсов корпоративного мерча</h3>
    </div>
    <div>
      <p>
        В разделе «Портфолио» — реальные B2B-проекты TEEON за 2025–2026 годы. Welcome-наборы для IT-команд, форма для event-агентств, корпоративный мерч для конференций, шопперы для ритейл-сетей, спортивная форма, униформа кофеен и outdoor-команд. Каждый кейс — с задачей, составом заказа, тиражом, выбранными технологиями нанесения и сроками.
      </p>
      <p>
        Мы показываем кейсы открыто: цифры тиража и сроков соответствуют реальности производственного цикла. Если у вас похожая задача — нажмите «Рассчитать похожий проект» в любой карточке, мы возьмём кейс как референс и адаптируем под ваши требования.
      </p>
    </div>
  </section>
);

/* ---------- CTA ---------- */
const CtaBlock = () => (
  <section className="cta-block section-spacer">
    <div>
      <h2>Хотите похожий <em>проект</em>?</h2>
      <p>
        Опишите задачу и&nbsp;тираж — рассчитаем смету на&nbsp;основе подходящего кейса. Первый ответ в&nbsp;течение часа.
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
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "/" },
      { "@type": "ListItem", "position": 2, "name": "Портфолио", "item": "/portfolio/" },
    ],
  };
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(breadcrumbs);
  document.head.appendChild(s);
}

/* ---------- APP ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "yellow": "#FFD60A",
  "blue":   "#1B3FCA",
  "ink":    "#0A0E1A",
  "radius": 28
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [cases, setCases] = React.useState(() => loadCases());

  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--yellow', t.yellow);
    r.setProperty('--blue', t.blue);
    r.setProperty('--ink', t.ink);
    r.setProperty('--rad', t.radius + 'px');
  }, [t]);

  React.useEffect(() => { injectJsonLD(); }, []);

  const filtered = cases
    .filter(c => c.isActive !== false)
    .filter(c => activeTag === 'all' || (c.tags || []).includes(activeTag))
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  return (
    <div className="page">
      <HeaderV6 />
      <PfHero />
      <PfFilters found={filtered.length} />
      {filtered.length > 0 ? <CasesGrid cases={filtered} /> : <CasesEmpty />}
      <TasksBlock />
      <ShowBlock />
      <SeoBlock />
      <CtaBlock />
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
