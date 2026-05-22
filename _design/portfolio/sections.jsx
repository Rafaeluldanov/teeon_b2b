/* ============================================
   Sections — all 11 blocks of the homepage
   ============================================ */

const { PhotoFig } = window;

/* ---------- NAV ---------- */
const Nav = () => (
  <nav className="nav">
    <a href="#" className="nav__logo">МЕРЧ<span style={{ color: 'var(--accent)' }}>.</span>ЦЕХ</a>
    <ul className="nav__links" style={{ listStyle: 'none' }}>
      <li><a href="#about">О нас</a></li>
      <li><a href="#catalog">Каталог</a></li>
      <li><a href="#branding">Брендирование</a></li>
      <li><a href="#portfolio">Кейсы</a></li>
      <li><a href="#how-we-work">Процесс</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
    <div className="nav__cta">
      <span style={{ color: 'var(--muted)' }}>+7 (495) 000–00–00</span>
      <a href="#request" className="pill">Рассчитать</a>
    </div>
  </nav>
);

/* ---------- HERO ---------- */
const Hero = () => (
  <section className="section hero">
    <div className="shell">
      <Nav />

      <div className="hero__top">
        <div className="hero__kicker">
          <span className="dot"></span>
          <span>Собственный швейный цех · Москва</span>
          <span style={{ color: 'var(--muted)' }}>·</span>
          <span>Работаем с 2014</span>
        </div>
        <div className="hero__kicker">
          <span>(01) Главная</span>
          <span style={{ color: 'var(--muted)' }}>/</span>
          <span>scroll ↓</span>
        </div>
      </div>

      {/* Display headline with inline photo cutouts */}
      <div className="hero__title-wrap">
        <h1 className="hero__title">
          <div className="row1">
            <span>СОЗДАЁМ</span>
            <PhotoFig kind="hoodie" color="yellow"
              className="hero__photo hero__photo--tilted"
              num="01/" label="ЦЕХ · ПОШИВ" />
            <span>МЕРЧ,</span>
          </div>
          <div className="row2">КОТОРЫЙ НОСЯТ</div>
          <div className="row3">
            <span>НЕ ТОЛЬКО</span>
            <PhotoFig kind="tee" color="orange"
              className="hero__photo hero__photo--tilted-r hero__photo--sm"
              num="02/" label="ФУТБОЛКА" />
            <span>В ОФИСЕ</span>
          </div>
        </h1>
      </div>

      <div className="hero__bottom">
        <div>
          <p className="hero__lede">
            Шьём корпоративную одежду и промо-мерч под ключ — от лекала до готовой партии с вашим брендингом. Тираж от 30 шт., 9 методов нанесения, образец перед запуском.
          </p>
          <div className="badges">
            <span className="badge">Собственный цех</span>
            <span className="badge">9 методов нанесения</span>
            <span className="badge">Образец перед тиражом</span>
            <span className="badge">Работаем с юрлицами</span>
          </div>
        </div>
        <div className="hero__ctas" style={{ justifyContent: 'flex-end' }}>
          <a href="#request" className="btn btn--primary">Рассчитать стоимость →</a>
          <a href="#catalog" className="btn btn--ghost">Смотреть каталог</a>
        </div>
      </div>

      <div className="hero__stats">
        <div className="stat">
          <div className="stat__num">14<span className="unit">дней</span></div>
          <div className="stat__label">Стандартный срок от макета до отгрузки</div>
        </div>
        <div className="stat">
          <div className="stat__num">100<span className="unit">%</span></div>
          <div className="stat__label">Своё производство — без посредников</div>
        </div>
        <div className="stat">
          <div className="stat__num">9<span className="unit">мет.</span></div>
          <div className="stat__label">Способов брендирования под любую задачу</div>
        </div>
        <div className="stat">
          <div className="stat__num">30<span className="unit">шт.</span></div>
          <div className="stat__label">Минимальный тираж — даже для теста</div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- MARQUEE strip between sections ---------- */
const Marquee = ({ items, variant }) => {
  const loop = [...items, ...items];
  return (
    <div className={`marquee ${variant === 'yellow' ? 'marquee--yellow' : ''}`}>
      <div className="marquee__track">
        {loop.map((t, i) => (
          <React.Fragment key={i}>
            <span>{t}</span>
            <span className="dot">●</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

/* ---------- ADVANTAGES ---------- */
const advantages = [
  { n: '01', title: 'Пошив под задачу', body: 'Свои лекала, ткани от поставщиков-партнёров, контроль каждого шва.' },
  { n: '02', title: 'Брендирование внутри производства', body: 'Цех нанесения соседствует с пошивом — экономим до 5 дней на логистике.' },
  { n: '03', title: 'Контроль качества', body: 'Образец перед тиражом, проверка ОТК на трёх этапах, замена брака за наш счёт.' },
  { n: '04', title: 'Доставка по России', body: 'Транспортные компании на выбор, маркировка для маркетплейсов и складов.' },
];

const Advantages = () => (
  <section className="advantages">
    <div className="shell">
      <div className="advantages__grid">
        {advantages.map(a => (
          <div className="adv" key={a.n}>
            <div className="adv__num">{a.n} /</div>
            <div className="adv__icon">
              <AdvIcon n={a.n} />
            </div>
            <div className="adv__title">{a.title}</div>
            <div className="adv__body">{a.body}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AdvIcon = ({ n }) => {
  const props = { width: 40, height: 40, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 };
  if (n === '01') return <svg {...props} viewBox="0 0 40 40"><path d="M8 16 L14 10 L17 12 Q20 14 23 12 L26 10 L32 16 L29 21 L26 19 L26 32 L14 32 L14 19 L11 21 Z"/></svg>;
  if (n === '02') return <svg {...props} viewBox="0 0 40 40"><circle cx="20" cy="20" r="12"/><path d="M14 20 L18 24 L26 16"/></svg>;
  if (n === '03') return <svg {...props} viewBox="0 0 40 40"><path d="M20 6 L32 12 L32 22 Q32 30 20 34 Q8 30 8 22 L8 12 Z"/><path d="M14 20 L18 24 L26 16"/></svg>;
  return <svg {...props} viewBox="0 0 40 40"><rect x="6" y="14" width="20" height="14"/><path d="M26 18 L32 18 L34 22 L34 28 L26 28"/><circle cx="14" cy="30" r="3"/><circle cx="30" cy="30" r="3"/></svg>;
};

/* ---------- ABOUT ---------- */
const About = () => (
  <section className="section" id="about">
    <div className="shell">
      <div className="about__top">
        <div className="about__kicker">
          <div className="eyebrow">(02) — О производстве</div>
          <h2 className="h-section about__title">
            ВЕЩИ — ЭТО <em style={{ fontStyle: 'normal', background: 'var(--yellow)', padding: '0 12px' }}>МАТЕРИАЛ.</em>
            <br />МЫ РАБОТАЕМ С НИМ&nbsp;ЧЕСТНО.
          </h2>
        </div>
        <div>
          <p className="about__lead">
            Мы <em>не закупаем</em> готовое — мы шьём с нуля. Цех в Подмосковье, 24 швеи, своё нанесение, своя упаковка.
          </p>
          <div className="about__body">
            <p>Каждый заказ ведёт один менеджер — от заявки до отгрузки. Мы знаем, что промо-мерч заказывают «вчера», и научились собирать партии в 10–14 дней без потери качества.</p>
            <p>Работаем по полному пакету документов: договор, счёт, акт, маркировка. Для юрлиц — отсрочка платежа и возможность пилотных партий до 30 шт.</p>
          </div>
          <div className="about__cta">
            <a href="/about/" className="btn btn--ink">Подробнее о компании</a>
            <a href="#request" className="arrow-link">Рассчитать проект →</a>
          </div>
        </div>
      </div>

      <div className="about__gallery">
        <PhotoFig kind="factory" color="orange" num="01/" label="ЦЕХ · ПОДМОСКОВЬЕ" />
        <PhotoFig kind="machine" color="yellow" num="02/" label="ОБОРУДОВАНИЕ" />
        <PhotoFig kind="stack" color="paper" num="03/" label="ГОТОВАЯ ПАРТИЯ" />
      </div>

      <div className="about__facts">
        <div className="fact">
          <div className="fact__num">11<span className="unit">лет</span></div>
          <div className="fact__label">На рынке корпоративного мерча</div>
        </div>
        <div className="fact">
          <div className="fact__num">240<span className="unit">+</span></div>
          <div className="fact__label">Реализованных проектов в 2025 году</div>
        </div>
        <div className="fact">
          <div className="fact__num">24<span className="unit">шв.</span></div>
          <div className="fact__label">Швей в собственном цехе</div>
        </div>
        <div className="fact">
          <div className="fact__num">600<span className="unit">м²</span></div>
          <div className="fact__label">Площадь производства и склада</div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- CATALOG ---------- */
const catalog = [
  { slug: 'futbolki',  num: '01', name: 'Футболки',  desc: 'Хлопок 160–220 г/м², от 30 шт.',     kind: 'tee',        color: 'yellow' },
  { slug: 'hudi',      num: '02', name: 'Худи',      desc: 'Двунитка/трёхнитка с начёсом.',     kind: 'hoodie',     color: 'orange' },
  { slug: 'svitshoty', num: '03', name: 'Свитшоты',  desc: 'Без капюшона, плотность 280–340.',  kind: 'sweat',      color: 'purple' },
  { slug: 'longslivy', num: '04', name: 'Лонгсливы', desc: 'Слим и oversize, длинный рукав.',    kind: 'longsleeve', color: 'paper' },
  { slug: 'sumki',     num: '05', name: 'Сумки',     desc: 'Шопперы и рюкзаки, бязь и оксфорд.', kind: 'bag',        color: 'blue' },
  { slug: 'zhiletki',  num: '06', name: 'Жилетки',   desc: 'Утеплённые и сетчатые, под печать.', kind: 'vest',       color: 'green' },
  { slug: 'kurtki',    num: '07', name: 'Куртки',    desc: 'Софтшелл, ветровки, утеплённые.',    kind: 'jacket',     color: 'ink' },
  { slug: 'dozhdeviki',num: '08', name: 'Дождевики', desc: 'PVC и нейлон, с капюшоном.',         kind: 'raincoat',   color: 'yellow' },
];

const CatalogSection = () => (
  <section className="section" id="catalog">
    <div className="shell">
      <div className="catalog__head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>(03) — Каталог</div>
          <h2 className="h-section">
            КАТАЛОГ <span style={{ background: 'var(--accent)', color: '#fff', padding: '0 12px' }}>ПРОМО-</span>
            <br />ОДЕЖДЫ И МЕРЧА
          </h2>
        </div>
        <p className="catalog__lede">
          8 базовых категорий — основа, на которую ложится любое брендирование. Любую позицию можно скорректировать под задачу: ткань, посадку, упаковку.
        </p>
      </div>

      <div className="catalog__grid">
        {catalog.map((c, i) => (
          <article className="cat-card" key={c.slug}>
            <div className="cat-card__media">
              <PhotoFig kind={c.kind} color={c.color} style={{ height: '100%' }}>
                <div className="cat-card__num">{c.num} /</div>
                <div className="cat-card__chip">Брендирование</div>
              </PhotoFig>
            </div>
            <h3 className="cat-card__title">{c.name}</h3>
            <p className="cat-card__desc">{c.desc}</p>
            <div className="cat-card__actions">
              <a href={`/catalog/${c.slug}/`} className="cat-card__link">Подробнее</a>
              <a href="#request" className="cat-card__add">В расчёт →</a>
            </div>
          </article>
        ))}
      </div>

      <div className="catalog__more">
        <a href="/catalog/" className="btn btn--ghost">Смотреть весь каталог →</a>
      </div>
    </div>
  </section>
);

/* ---------- BRANDING ---------- */
const branding = [
  { slug: 'embroidery',  num: '01', title: 'Вышивка',     desc: 'Объёмная фактура, износостойко, премиум на полотне.',     tags: ['до 12 цветов', 'от 30 шт'] },
  { slug: 'chevrons',    num: '02', title: 'Шевроны',     desc: 'Нашивки с прямой пришивкой или на липучке.',              tags: ['ПВХ / ткань', 'тираж от 50'] },
  { slug: 'silk',        num: '03', title: 'Шелкография', desc: 'Стойкая печать большими тиражами, плотный краситель.',    tags: ['до 8 цветов', 'тираж от 50'] },
  { slug: 'dtf',         num: '04', title: 'DTF',         desc: 'Полноцветная плёнка, фотоизображения, мелкие детали.',   tags: ['CMYK + W', 'от 1 шт'] },
  { slug: 'dtg',         num: '05', title: 'DTG',         desc: 'Прямая печать на ткани, для сложной графики и фото.',     tags: ['фото-качество', 'от 1 шт'] },
  { slug: 'sublim',      num: '06', title: 'Сублимация',  desc: 'Полноцвет по всей поверхности синтетики.',                tags: ['100% полиэстер', 'all-over'] },
  { slug: 'deboss',      num: '07', title: 'Тиснение',    desc: 'Сухое и фольгированное на коже и плотной ткани.',         tags: ['фольга', 'клише'] },
  { slug: 'laser',       num: '08', title: 'Гравировка',  desc: 'Лазерная маркировка по металлу, дереву, коже.',           tags: ['от 1 шт', 'без краски'] },
  { slug: 'labels',      num: '09', title: 'Бирки и этикетки', desc: 'Тканые, кожаные, бумажные — финальный штрих.',     tags: ['жаккард', 'крой'] },
];

const Branding = () => (
  <section className="section branding" id="branding">
    <div className="shell">
      <div className="branding__head">
        <div>
          <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 16 }}>(04) — Нанесение</div>
          <h2 className="h-section">
            БРЕНДИРОВАНИЕ
            <br />И ПЕРСОНАЛИЗАЦИЯ
          </h2>
        </div>
        <p className="branding__lede">
          9 методов под любую задачу: от вышивки на корпоративных поло до полноцветной DTF-печати на промо-футболках. Подбираем технологию под ткань, тираж и бюджет.
        </p>
      </div>

      <div className="branding__grid">
        {branding.map(b => (
          <a href={`/branding/${b.slug}/`} className="brand-card" key={b.slug}>
            <div className="brand-card__num">{b.num} /</div>
            <div className="brand-card__icon">
              <BrandIcon slug={b.slug} />
            </div>
            <div className="brand-card__title">{b.title}</div>
            <div className="brand-card__desc">{b.desc}</div>
            <div className="brand-card__tags">
              {b.tags.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>
            <svg className="brand-card__arrow" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M5 17 L17 5 M9 5 L17 5 L17 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        ))}
      </div>

      <div style={{ marginTop: 60, display: 'flex', justifyContent: 'center' }}>
        <a href="/branding/" className="btn btn--ghost-light">Смотреть все способы →</a>
      </div>
    </div>
  </section>
);

const BrandIcon = ({ slug }) => {
  const p = { width: 28, height: 28, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 };
  switch (slug) {
    case 'embroidery': return <svg {...p} viewBox="0 0 28 28"><circle cx="14" cy="14" r="9"/><path d="M14 5 L14 23 M5 14 L23 14"/></svg>;
    case 'chevrons':   return <svg {...p} viewBox="0 0 28 28"><path d="M4 18 L14 8 L24 18 L20 22 L14 16 L8 22 Z"/></svg>;
    case 'silk':       return <svg {...p} viewBox="0 0 28 28"><rect x="4" y="4" width="20" height="20"/><path d="M9 9 L19 9 M9 14 L19 14 M9 19 L19 19"/></svg>;
    case 'dtf':        return <svg {...p} viewBox="0 0 28 28"><rect x="4" y="6" width="20" height="14"/><path d="M8 6 L8 20 M14 6 L14 20 M20 6 L20 20"/></svg>;
    case 'dtg':        return <svg {...p} viewBox="0 0 28 28"><path d="M4 10 L24 10 L20 22 L8 22 Z"/><circle cx="14" cy="16" r="2.5"/></svg>;
    case 'sublim':     return <svg {...p} viewBox="0 0 28 28"><path d="M6 22 Q6 6 14 6 Q22 6 22 22 Z"/></svg>;
    case 'deboss':     return <svg {...p} viewBox="0 0 28 28"><rect x="4" y="6" width="20" height="16"/><path d="M10 14 L18 14" strokeWidth="3"/></svg>;
    case 'laser':      return <svg {...p} viewBox="0 0 28 28"><path d="M4 24 L24 24 M14 4 L14 20 M10 16 L14 20 L18 16"/></svg>;
    case 'labels':     return <svg {...p} viewBox="0 0 28 28"><path d="M4 8 L18 4 L24 14 L18 24 L4 20 Z"/><circle cx="10" cy="14" r="2"/></svg>;
    default: return null;
  }
};

/* ---------- WORK STEPS ---------- */
const steps = [
  { num: '01', title: 'Заявка',          body: 'Заполните форму или позвоните — ответим в течение часа в рабочее время.', meta: '1 час' },
  { num: '02', title: 'Подбор решения',  body: 'Менеджер уточнит задачу: ткань, тираж, способы нанесения, дедлайн.',     meta: 'до 1 дня' },
  { num: '03', title: 'Расчёт',          body: 'Сметa, варианты тканей, образцы методов нанесения на ваш бюджет.',      meta: '1–2 дня' },
  { num: '04', title: 'Макет и образец', body: 'Дизайнер собирает макет, шьём pre-production sample на согласование.',    meta: '3–5 дней' },
  { num: '05', title: 'Производство',    body: 'Тираж в цехе с контролем ОТК на каждом этапе раскрой → пошив → нанесение.', meta: '7–14 дней' },
  { num: '06', title: 'Упаковка и отгрузка', body: 'Индивидуальная упаковка, маркировка, отправка ТК или курьером.',      meta: '1 день' },
];

const WorkSteps = () => (
  <section className="section dark" id="how-we-work">
    <div className="shell">
      <div className="work__head">
        <div>
          <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 16 }}>(05) — Процесс</div>
          <h2 className="h-section">
            КАК МЫ
            <br />РАБОТАЕМ
          </h2>
        </div>
        <p className="work__lede">
          От первого звонка до отгрузки — шесть прозрачных шагов. Вы видите статус заказа, согласовываете макет и получаете образец до запуска тиража.
        </p>
      </div>

      <div className="work__grid">
        {steps.map((s, i) => (
          <div className={`step ${i === 3 ? 'active' : ''}`} key={s.num}>
            <div className="step__num">{s.num}</div>
            <div className="step__title">{s.title}</div>
            <div className="step__body">{s.body}</div>
            <div className="step__meta">⏱ {s.meta}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- PORTFOLIO ---------- */
const portfolio = [
  { slug: 'it-startup',    type: 'IT-компания',    title: 'МЕРЧ-КИТ ДЛЯ ОНБОРДИНГА',
    task: 'Welcome-набор для новых сотрудников', edition: '320 шт', tech: 'Вышивка + DTF', term: '12 дней',
    kind: 'hoodie', color: 'orange' },
  { slug: 'event-agency',  type: 'Event-агентство', title: 'ФИРМЕННАЯ ОДЕЖДА ДЛЯ ФЕСТИВАЛЯ',
    task: 'Худи и кепки для команды на open-air', edition: '180 шт', tech: 'Шелкография', term: '9 дней',
    kind: 'cap', color: 'yellow' },
  { slug: 'sport-club',    type: 'Спортивный клуб', title: 'ФОРМА ДЛЯ ЛЮБИТЕЛЬСКОЙ ЛИГИ',
    task: 'Игровая и тренировочная форма', edition: '90 комплектов', tech: 'Сублимация', term: '14 дней',
    kind: 'tee', color: 'blue' },
  { slug: 'restaurant',    type: 'Ресторан', title: 'УНИФОРМА ДЛЯ ЗАЛА',
    task: 'Рубашки и фартуки с вышивкой логотипа', edition: '60 шт', tech: 'Вышивка + бирки', term: '11 дней',
    kind: 'longsleeve', color: 'purple' },
  { slug: 'retail',        type: 'Ритейл-сеть', title: 'СУМКИ-ШОППЕРЫ ДЛЯ АКЦИИ',
    task: 'Партия шопперов к запуску коллекции', edition: '1 200 шт', tech: 'Шелкография', term: '18 дней',
    kind: 'bag', color: 'green' },
  { slug: 'coffee',        type: 'Кофейня', title: 'ФАРТУКИ И ФУТБОЛКИ БАРИСТ',
    task: 'Рабочая форма с вышивкой', edition: '45 шт', tech: 'Вышивка', term: '8 дней',
    kind: 'vest', color: 'paper' },
];

const Portfolio = () => (
  <section className="section" id="portfolio">
    <div className="shell">
      <div className="portfolio__head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>(06) — Кейсы</div>
          <h2 className="h-section">
            ПОРТФОЛИО — <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>240+</em>
            <br />ПРОЕКТОВ В&nbsp;ДЕЛЕ
          </h2>
        </div>
        <p className="portfolio__lede">
          Шесть из последних кейсов: от welcome-наборов для IT до тиражей в 1 200 шопперов для ритейл-сети. Каждый — с задачей, цифрами и сроками.
        </p>
      </div>

      <div className="portfolio__grid">
        {portfolio.map(c => (
          <article className="case" key={c.slug}>
            <div className="case__media">
              <PhotoFig kind={c.kind} color={c.color} style={{ height: '100%' }}>
                <div className="case__chip">{c.type}</div>
              </PhotoFig>
            </div>
            <div className="case__body">
              <h3 className="case__title">{c.title}</h3>
              <dl className="case__table">
                <dt>Задача</dt><dd>{c.task}</dd>
                <dt>Тираж</dt><dd>{c.edition}</dd>
                <dt>Технологии</dt><dd>{c.tech}</dd>
                <dt>Срок</dt><dd>{c.term}</dd>
              </dl>
              <div className="case__actions">
                <a href={`/portfolio/${c.slug}/`} className="cat-card__link">Смотреть кейс</a>
                <a href="#request" className="cat-card__add">Рассчитать похожий →</a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: 60, display: 'flex', justifyContent: 'center' }}>
        <a href="/portfolio/" className="btn btn--ghost">Смотреть все кейсы →</a>
      </div>
    </div>
  </section>
);

/* ---------- CLIENTS ---------- */
const clients = [
  { mark: 'IT', name: 'IT-компания',           type: 'SaaS · 200+ сотр.' },
  { mark: 'EV', name: 'Event-агентство',       type: 'Фестивали, форумы' },
  { mark: 'PR', name: 'Производство',          type: 'Промышленное' },
  { mark: 'SP', name: 'Спортивный клуб',       type: 'Любительская лига' },
  { mark: 'RS', name: 'Ресторан',              type: 'HoReCa · 4 точки' },
  { mark: 'CF', name: 'Кофейня',               type: 'Сеть, 12 точек' },
  { mark: 'RT', name: 'Ритейл-сеть',           type: 'Fashion · 30+ магазинов' },
  { mark: 'MA', name: 'Маркетинговое агент.',  type: 'B2B-промо' },
];

const Clients = () => (
  <section className="section clients" id="clients">
    <div className="shell">
      <div className="clients__head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>(07) — Клиенты</div>
          <h2 className="h-section">
            НАМ ДОВЕРЯЮТ
            <br />КОМПАНИИ
          </h2>
        </div>
        <p className="clients__lede">
          От стартапов до сетевого ритейла. Логотипы скроем под NDA — покажем по запросу под договор.
        </p>
      </div>

      <div className="clients__grid">
        {clients.map(c => (
          <div className="client" key={c.name}>
            <div className="client__mark">{c.mark}</div>
            <div>
              <div className="client__name">{c.name}</div>
              <div className="client__type">{c.type}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- FAQ ---------- */
const faqItems = [
  { q: 'Какой минимальный тираж?', a: 'От 30 шт. на одну позицию. На некоторые ткани и методы нанесения — от 50 шт. На DTF и DTG можно сделать даже одну единицу для образца или подарка.' },
  { q: 'Можно увидеть образец перед запуском тиража?', a: 'Да — образец (pre-production sample) шьём и согласовываем до запуска основной партии. Это занимает 3–5 рабочих дней. Стоимость образца входит в смету при тираже от 100 шт.' },
  { q: 'Сколько времени занимает производство?', a: 'Стандартный срок — 10–14 дней с момента согласования макета и образца. Срочные тиражи до 100 шт. собираем за 5–7 дней с доплатой за приоритет.' },
  { q: 'Какие способы брендирования вы используете?', a: '9 методов: вышивка, шевроны, шелкография, DTF, DTG, сублимация, тиснение, лазерная гравировка, тканые бирки. Технологию подбираем под ткань, тираж и эффект.' },
  { q: 'Работаете ли с юридическими лицами?', a: 'Да, полный пакет документов: договор, счёт, акт, УПД, маркировка для маркетплейсов. При повторных заказах — отсрочка платежа до 14 дней.' },
  { q: 'Как происходит доставка?', a: 'По Москве — собственный курьер или СДЭК. По России — ТК на выбор (Деловые Линии, Байкал, ПЭК, СДЭК), маркировка для складов и WB/Ozon при необходимости.' },
];

const FAQ = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section" id="faq">
      <div className="shell">
        <div className="faq__head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>(08) — FAQ</div>
            <h2 className="h-section">
              ЧАСТО
              <br />СПРАШИВАЮТ
            </h2>
          </div>
          <p className="faq__lede">
            Шесть вопросов, которые задают чаще всего перед первым заказом. На остальные ответим в чате или по телефону.
          </p>
        </div>

        <div className="faq__list">
          {faqItems.map((f, i) => (
            <div className={`qa ${open === i ? 'open' : ''}`} key={i}>
              <button className="qa__btn" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="qa__num">{String(i + 1).padStart(2, '0')} /</span>
                <span className="qa__q">{f.q}</span>
                <span className="qa__toggle">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2 L7 12 M2 7 L12 7" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </button>
              <div className="qa__a">
                <div>
                  <div className="qa__body">{f.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- SEO TEXT ---------- */
const SeoText = () => (
  <section className="section seo">
    <div className="shell">
      <div className="seo__inner">
        <div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>(09) — Подробнее</div>
          <h2>Промо-одежда и&nbsp;корпоративный мерч под&nbsp;ключ</h2>
        </div>
        <div>
          <p>Производим корпоративную одежду и промо-мерч для бизнеса в собственном швейном цехе. Шьём футболки, худи, свитшоты, лонгсливы, поло, ветровки, дождевики, жилеты и сумки — с любой плотностью ткани и под любую посадку. Все этапы — от лекала и раскроя до нанесения и упаковки — проходят на одной площадке, поэтому мы контролируем сроки и качество без посредников.</p>
          <p>Брендируем 9 способами: вышивка, шевроны, шелкография, DTF, DTG, сублимация, тиснение, лазерная гравировка и пришивные тканые бирки. Подбираем технологию под ткань, тираж и бюджет, шьём pre-production sample до запуска тиража, работаем с юрлицами по полному пакету документов и доставляем готовые партии по всей России — включая маркировку для маркетплейсов и складов.</p>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- REQUEST FORM ---------- */
const RequestForm = () => {
  const [sent, setSent] = React.useState(false);
  return (
    <section className="section request" id="request">
      <div className="shell">
        <div className="request__head">
          <div>
            <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 16 }}>(10) — Заявка</div>
            <h2 className="h-section">
              РАССЧИТАТЬ
              <br />СТОИМОСТЬ
            </h2>
          </div>
          <p className="request__lede">
            Заполните форму — менеджер свяжется в течение часа в рабочее время. Можно прикрепить ТЗ, логотип или макет — поможем с подбором тканей и методов нанесения.
          </p>
        </div>

        <div className="request__inner">
          <div className="request__bullets">
            <div className="bullet">
              <div className="bullet__num">01</div>
              <div>
                <div className="bullet__title">Отвечаем за 1 час</div>
                <div className="bullet__body">В будни с 9:00 до 19:00 — менеджер вернётся со сметой и сроками.</div>
              </div>
            </div>
            <div className="bullet">
              <div className="bullet__num">02</div>
              <div>
                <div className="bullet__title">Считаем 2–3 варианта</div>
                <div className="bullet__body">Под разный бюджет, разные ткани, разные методы нанесения.</div>
              </div>
            </div>
            <div className="bullet">
              <div className="bullet__num">03</div>
              <div>
                <div className="bullet__title">Образец до тиража</div>
                <div className="bullet__body">Шьём pre-production sample, согласовываем, запускаем партию.</div>
              </div>
            </div>
            <div className="bullet">
              <div className="bullet__num">04</div>
              <div>
                <div className="bullet__title">Полный пакет документов</div>
                <div className="bullet__body">Договор, счёт, акт, УПД, маркировка — без задержек для бухгалтерии.</div>
              </div>
            </div>
          </div>

          <form className="form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
            {sent ? (
              <div style={{ padding: '40px 0', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--display)', fontSize: 48, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>
                  Заявка принята<span style={{ color: 'var(--accent)' }}>!</span>
                </div>
                <p style={{ color: '#b8b8b8', maxWidth: 360, margin: '0 auto' }}>
                  Менеджер свяжется с вами в течение часа в рабочее время. Хорошего дня!
                </p>
              </div>
            ) : (
              <>
                <div className="form__row">
                  <div className="field">
                    <label>ФИО <span className="req">*</span></label>
                    <input type="text" placeholder="Как к вам обращаться" required />
                  </div>
                  <div className="field">
                    <label>Компания</label>
                    <input type="text" placeholder="ООО «Название»" />
                  </div>
                </div>
                <div className="form__row">
                  <div className="field">
                    <label>Телефон <span className="req">*</span></label>
                    <input type="tel" placeholder="+7 (___) ___-__-__" required />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input type="email" placeholder="name@company.ru" />
                  </div>
                </div>
                <div className="form__row">
                  <div className="field">
                    <label>Способ связи</label>
                    <select defaultValue="">
                      <option value="" disabled>Выберите</option>
                      <option>Звонок</option><option>Telegram</option><option>WhatsApp</option><option>Email</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Тираж</label>
                    <select defaultValue="">
                      <option value="" disabled>Выберите</option>
                      <option>30–100 шт</option><option>100–300 шт</option><option>300–1000 шт</option><option>1000+ шт</option>
                    </select>
                  </div>
                </div>
                <div className="form__row">
                  <div className="field">
                    <label>Что нужно изготовить <span className="req">*</span></label>
                    <select defaultValue="" required>
                      <option value="" disabled>Выберите тип</option>
                      <option>Футболки</option><option>Худи</option><option>Свитшоты</option>
                      <option>Сумки / шопперы</option><option>Куртки / ветровки</option>
                      <option>Комплект (welcome-набор)</option><option>Другое</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Срок</label>
                    <select defaultValue="">
                      <option value="" disabled>Выберите</option>
                      <option>Стандарт (10–14 дней)</option>
                      <option>Срочно (5–7 дней)</option>
                      <option>Гибкий</option>
                    </select>
                  </div>
                </div>
                <div className="form__row form__row--single">
                  <div className="field">
                    <label>Комментарий</label>
                    <textarea placeholder="Опишите задачу, цвета, размеры, ТЗ…" rows="4"></textarea>
                  </div>
                </div>
                <div className="form__row form__row--single">
                  <label className="file">
                    <span className="file__icon">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M14 3 L4 13 Q1 16 4 19 Q7 22 10 19 L19 10 Q21 8 19 6 Q17 4 15 6 L8 13" stroke="currentColor" strokeWidth="1.5"/></svg>
                    </span>
                    <span>Прикрепить файл — логотип, ТЗ, макет (до 10 МБ)</span>
                    <input type="file" hidden />
                  </label>
                </div>
                <div className="form__submit">
                  <button type="submit" className="btn btn--primary">Отправить заявку →</button>
                  <span className="consent">
                    Нажимая, вы соглашаетесь с <a href="/privacy">политикой обработки данных</a>.
                  </span>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

/* ---------- FOOTER ---------- */
const Footer = () => (
  <footer className="footer">
    <div className="shell">
      <div className="footer__top">
        <div className="footer__brand">
          <h3>МЕРЧ.<br/>ЦЕХ<span style={{ color: 'var(--accent)' }}>.</span></h3>
          <p>Шьём корпоративную одежду и промо-мерч для бизнеса. Собственный цех, 9 методов нанесения, работа с юрлицами.</p>
        </div>
        <div className="footer__col">
          <h5>Каталог</h5>
          <ul>
            <li><a href="/catalog/futbolki/">Футболки</a></li>
            <li><a href="/catalog/hudi/">Худи</a></li>
            <li><a href="/catalog/svitshoty/">Свитшоты</a></li>
            <li><a href="/catalog/sumki/">Сумки</a></li>
            <li><a href="/catalog/">Все категории →</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h5>Компания</h5>
          <ul>
            <li><a href="/about/">О нас</a></li>
            <li><a href="/portfolio/">Кейсы</a></li>
            <li><a href="/branding/">Способы нанесения</a></li>
            <li><a href="/contacts/">Контакты</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h5>Связаться</h5>
          <ul>
            <li>+7 (495) 000–00–00</li>
            <li>hello@merchcex.ru</li>
            <li>Москва, ул. Промзона, 12</li>
            <li>Пн–Пт · 9:00–19:00</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <div>© 2014–2026 МЕРЧ.ЦЕХ — все права защищены</div>
        <div className="row" style={{ display: 'flex' }}>
          <a href="/privacy">Политика конфиденциальности</a>
          <a href="/cookies">Cookies</a>
          <a href="/terms">Договор-оферта</a>
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, {
  Hero, Marquee, Advantages, About, CatalogSection, Branding, WorkSteps,
  Portfolio, Clients, FAQ, SeoText, RequestForm, Footer
});
