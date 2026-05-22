/* V2 sections — Dark bento with lime + orange accents */

const { PhotoV2 } = window;

/* ---------- NAV ---------- */
const NavV2 = () => (
  <nav className="nav">
    <a href="#" className="nav__logo">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 4 L24 4 L4 24 L24 24" stroke="currentColor" strokeWidth="2.5" />
      </svg>
      <span>МЕРЧ.ЦЕХ</span>
    </a>
    <ul className="nav__links">
      <li><a href="#about">О нас</a></li>
      <li><a href="#catalog">Каталог</a></li>
      <li><a href="#branding">Нанесение</a></li>
      <li><a href="#portfolio">Кейсы</a></li>
      <li><a href="#how-we-work">Процесс</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
    <a href="#request" className="nav__support">
      Связаться
      <span className="ico">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4 L7 8 L12 4 M2 4 L2 11 L12 11 L12 4" stroke="currentColor" strokeWidth="1.5"/></svg>
      </span>
    </a>
  </nav>
);

/* ---------- HERO ---------- */
const HeroV2 = () => (
  <section className="hero-wrap">
    <div className="hero">
      <div style={{ minWidth: 0 }}>
        <div className="hero__title">
          <div className="line">
            <span>МЕРЧ</span>
            <span className="pic-bubble" aria-hidden></span>
          </div>
          <div className="line">
            <span>•ЦЕХ</span>
            <span className="arrow">B2B</span>
          </div>
        </div>
        <div className="hero__sub">Корпоративная одежда · промо-мерч · от 30 шт</div>
      </div>

      <div className="hero__portrait" aria-hidden>
        <div className="person">
          <svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMax meet">
            <g fill="rgba(0,0,0,.32)">
              <ellipse cx="100" cy="74" rx="28" ry="32"/>
              <path d="M52 240 Q52 120 100 120 Q148 120 148 240 Z"/>
              <rect x="78" y="120" width="44" height="22" fill="rgba(255,235,180,.5)"/>
            </g>
          </svg>
        </div>
      </div>

      <a href="#request" className="hero__cta">
        <span className="arrow-up">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 15 L15 5 M7 5 L15 5 L15 13" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        </span>
        <span className="vertical">РАССЧИТАТЬ</span>
      </a>
    </div>
  </section>
);

/* ---------- HERO EXTRAS (bento row right after hero) ---------- */
const HeroExtras = () => (
  <section className="hero-extras">
    {/* LEFT column */}
    <div className="left">
      <div className="physical">
        <div>
          <div className="kicker" style={{ color: '#8a8c83', marginBottom: 12 }}>СВОЙ ЦЕХ</div>
          <div className="physical__label" style={{ fontSize: 17, lineHeight: 1.35 }}>
            <strong>Промо-одежда + брендирование</strong><br />
            в одном производстве
          </div>
          <div style={{ marginTop: 28, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span className="pill" style={{ borderColor: 'rgba(255,255,255,.2)', color: '#d6d7cf' }}>24 швеи</span>
            <span className="pill" style={{ borderColor: 'rgba(255,255,255,.2)', color: '#d6d7cf' }}>9 методов</span>
            <span className="pill" style={{ borderColor: 'rgba(255,255,255,.2)', color: '#d6d7cf' }}>образец до тиража</span>
          </div>
        </div>
        <div className="physical__pic">
          <PhotoV2 kind="person" tint="sand" shape="rect" />
        </div>
      </div>

      {/* lime fashion-house card */}
      <div className="fh">
        <div>
          <div className="fh__brand">
            <span className="mark">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 3 L17 3 L10 11 Z M3 17 L17 17 L10 9 Z" fill="currentColor"/></svg>
            </span>
            <span className="name">FASHION HOUSE</span>
          </div>
          <div className="fh__big">Уникальные<br/>продукты</div>
        </div>
        <div>
          <div className="kicker" style={{ color: '#2a3504', marginBottom: 8 }}>СОЗДАЁМ</div>
          <div className="fh__body">
            На стыке корпоративного дресс-кода и стрит-моды — мерч, в котором не стыдно ходить и за пределами офиса.
          </div>
        </div>
      </div>
    </div>

    {/* RIGHT column */}
    <div className="right">
      <div className="standard">
        <div className="standard__head">
          <span className="pill">NEW GEN WORLD</span>
          <a href="#request" className="arrow-link" style={{ borderColor: 'var(--ink)' }}>Запросить смету →</a>
        </div>
        <h3>Новый стандарт корпоративного мерча — <strong>от лекала до отгрузки на одной площадке</strong></h3>
        <div className="join">
          <div className="join__num">01</div>
          <div className="join__heads">
            <span className="head" style={{ background: 'linear-gradient(135deg,#ffd9a8,#a96b3a)' }}></span>
            <span className="head" style={{ background: 'linear-gradient(135deg,#cfd9e6,#6e8aa6)' }}></span>
            <span className="head" style={{ background: 'linear-gradient(135deg,#dbb8ff,#5a3681)' }}></span>
          </div>
          <div className="join__txt">
            ВОТ КТО<br/>УЖЕ С НАМИ
          </div>
        </div>
      </div>

      {/* timeline rows */}
      <div className="tl">
        <div className="tl__row">
          <span className="tl__dot"></span>
          <div className="tl__title">Запустили партию мерч-китов для IT-команды</div>
          <div className="tl__date">14.05.2026</div>
          <div className="tl__action">
            <span className="tl__icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="3"/><path d="M3 7 L1 7 M11 7 L13 7 M7 3 L7 1 M7 11 L7 13" stroke="currentColor" strokeWidth="1.2"/></svg>
            </span>
          </div>
        </div>
        <div className="tl__row">
          <span className="tl__dot"></span>
          <div className="tl__title">Шопперы 1 200 шт. — ритейл-сеть, шелкография</div>
          <div className="tl__date">02.05.2026</div>
          <div className="tl__action">
            <a className="tl__btn" href="#portfolio">Кейс →</a>
          </div>
        </div>
        <div className="tl__row">
          <span className="tl__dot"></span>
          <div className="tl__title">Форма барист для сети из 12 кофеен, вышивка</div>
          <div className="tl__date">21.04.2026</div>
          <div className="tl__action">
            <a className="tl__btn" href="#portfolio">Кейс →</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- ADVANTAGES (4-col bento) ---------- */
const advantagesV2 = [
  { n: '01', t: 'Пошив\nпод задачу',                   d: 'Свои лекала, ткани от поставщиков-партнёров.', dark: true },
  { n: '02', t: 'Брендирование\nвнутри производства',  d: 'Один цех, минус неделя на логистике.',          accent: 'lime' },
  { n: '03', t: 'Контроль\nкачества',                  d: 'Образец до тиража, ОТК на трёх этапах.',        dark: true },
  { n: '04', t: 'Доставка\nпо России',                 d: 'Любая ТК, маркировка для маркетплейсов.',       dark: true },
];

const AdvantagesV2 = () => (
  <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
    {advantagesV2.map(a => (
      <div className={`card ${a.accent === 'lime' ? 'lime' : 'dark'}`} key={a.n}
           style={{ display: 'flex', flexDirection: 'column', gap: 18, minHeight: 240 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ fontFamily: 'var(--display)', fontSize: 14, fontWeight: 600, opacity: 0.7 }}>{a.n} /</span>
          <span style={{
            width: 40, height: 40, borderRadius: 12,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: a.accent === 'lime' ? 'var(--ink)' : 'var(--lime)',
            color: a.accent === 'lime' ? 'var(--lime)' : 'var(--ink)',
          }}>
            <AdvIco n={a.n} />
          </span>
        </div>
        <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 24, lineHeight: 1.05, letterSpacing: '-0.015em', whiteSpace: 'pre-line' }}>
          {a.t}
        </div>
        <div style={{ fontSize: 13.5, lineHeight: 1.5, color: a.accent === 'lime' ? '#2a3504' : '#b5b6ad', marginTop: 'auto' }}>
          {a.d}
        </div>
      </div>
    ))}
  </section>
);

const AdvIco = ({ n }) => {
  const p = { width: 20, height: 20, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 };
  if (n === '01') return <svg {...p} viewBox="0 0 20 20"><path d="M4 8 L7 5 L8 6 Q10 7 12 6 L13 5 L16 8 L14 11 L13 10 L13 16 L7 16 L7 10 L6 11 Z"/></svg>;
  if (n === '02') return <svg {...p} viewBox="0 0 20 20"><circle cx="10" cy="10" r="6"/><path d="M7 10 L9 12 L13 8"/></svg>;
  if (n === '03') return <svg {...p} viewBox="0 0 20 20"><path d="M10 3 L16 6 L16 11 Q16 15 10 17 Q4 15 4 11 L4 6 Z"/><path d="M7 10 L9 12 L13 8"/></svg>;
  return <svg {...p} viewBox="0 0 20 20"><rect x="3" y="7" width="10" height="7"/><path d="M13 9 L16 9 L17 11 L17 14 L13 14"/><circle cx="7" cy="15" r="1.5"/><circle cx="15" cy="15" r="1.5"/></svg>;
};

/* ---------- ABOUT ---------- */
const AboutV2 = () => (
  <section id="about">
    <div className="section-head">
      <div>
        <div className="kicker">(02) — О производстве</div>
        <h2>Шьём <em>с нуля</em>,<br />а не закупаем</h2>
      </div>
      <p>
        Свой швейный цех в Подмосковье — 24 швеи, своё нанесение, своя упаковка. Все этапы под одной крышей: лекало, раскрой, пошив, брендирование, упаковка, отгрузка.
      </p>
    </div>

    <div className="bento">
      <div className="card dark col-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 360 }}>
        <div>
          <div className="kicker" style={{ marginBottom: 12 }}>с 2014 года</div>
          <h3 style={{ marginBottom: 16 }}>240+ проектов в год</h3>
          <p style={{ fontSize: 14, color: '#b5b6ad', lineHeight: 1.55, maxWidth: 320 }}>
            От welcome-наборов IT-стартапов до тиражей в 1 200 шопперов для ритейл-сетей. Каждый заказ — один менеджер, один договор, одна площадка.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
          <span className="pill" style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}>УПД</span>
          <span className="pill" style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}>Договор</span>
          <span className="pill" style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}>Отсрочка</span>
        </div>
      </div>
      <div className="col-4" style={{ borderRadius: 'var(--rad)', overflow: 'hidden' }}>
        <PhotoV2 kind="factory" tint="sand" shape="rect" num="01/" label="ЦЕХ · ПОДМОСКОВЬЕ" style={{ aspectRatio: '1 / 1.05', minHeight: 360 }} />
      </div>
      <div className="col-4" style={{ display: 'grid', gap: 16 }}>
        <div style={{ borderRadius: 'var(--rad)', overflow: 'hidden' }}>
          <PhotoV2 kind="machine" tint="cool" shape="rect" num="02/" label="ОБОРУДОВАНИЕ" style={{ aspectRatio: '2 / 1', minHeight: 172 }} />
        </div>
        <div className="card lime" style={{ minHeight: 172, display: 'flex', flexDirection: 'column' }}>
          <div className="kicker" style={{ color: '#2a3504', marginBottom: 12 }}>ЗА 11 ЛЕТ</div>
          <h3 style={{ fontSize: 38, lineHeight: 0.95 }}>≈ 320 000 единиц</h3>
          <p style={{ fontSize: 13, color: '#2a3504', marginTop: 'auto' }}>пошито и отгружено клиентам</p>
        </div>
      </div>

      {/* fact strip */}
      {[
        { n: '11', u: 'лет', l: 'На рынке корпоративного мерча' },
        { n: '240', u: '+', l: 'Проектов реализовано в 2025' },
        { n: '24', u: 'шв.', l: 'Швей в собственном цехе' },
        { n: '600', u: 'м²', l: 'Площадь производства и склада' },
      ].map(f => (
        <div className="card dark col-3" key={f.n} style={{ padding: '24px 28px' }}>
          <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 56, lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            {f.n}<span style={{ fontSize: 22, color: 'var(--lime)', marginLeft: 4 }}>{f.u}</span>
          </div>
          <div style={{ marginTop: 10, fontSize: 13, color: '#b5b6ad' }}>{f.l}</div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- CATALOG ---------- */
const catalogV2 = [
  { slug: 'futbolki',  num: '01', name: 'Футболки',  desc: 'Хлопок 160–220 г/м², от 30 шт.',     kind: 'tee',        tint: 'sand' },
  { slug: 'hudi',      num: '02', name: 'Худи',      desc: 'Двунитка/трёхнитка с начёсом.',     kind: 'hoodie',     tint: 'lime', lime: true },
  { slug: 'svitshoty', num: '03', name: 'Свитшоты',  desc: 'Без капюшона, плотность 280–340.',  kind: 'sweat',      tint: 'plum' },
  { slug: 'longslivy', num: '04', name: 'Лонгсливы', desc: 'Слим и oversize, длинный рукав.',    kind: 'longsleeve', tint: 'cool' },
  { slug: 'sumki',     num: '05', name: 'Сумки',     desc: 'Шопперы и рюкзаки, бязь и оксфорд.', kind: 'bag',        tint: 'orange' },
  { slug: 'zhiletki',  num: '06', name: 'Жилетки',   desc: 'Утеплённые и сетчатые, под печать.', kind: 'vest',       tint: 'sea' },
  { slug: 'kurtki',    num: '07', name: 'Куртки',    desc: 'Софтшелл, ветровки, утеплённые.',    kind: 'jacket',     tint: 'coal' },
  { slug: 'dozhdeviki',num: '08', name: 'Дождевики', desc: 'PVC и нейлон, с капюшоном.',         kind: 'raincoat',   tint: 'cream' },
];

const CatalogV2 = () => (
  <section id="catalog">
    <div className="section-head">
      <div>
        <div className="kicker">(03) — Каталог</div>
        <h2>Каталог <span className="accent">промо-одежды</span></h2>
      </div>
      <p>8 базовых категорий — основа, на которую ложится любое брендирование. Любую позицию подгоняем под задачу: ткань, посадка, упаковка.</p>
    </div>

    <div className="cat-grid">
      {catalogV2.map(c => (
        <article className={`cat ${c.lime ? 'cat--lime' : ''}`} key={c.slug}>
          <div className="cat__media">
            <PhotoV2 kind={c.kind} tint={c.tint} shape="rect" style={{ borderRadius: 0 }} />
            <span className="num" style={{ color: c.tint === 'cream' || c.lime ? '#2a3504' : 'rgba(255,255,255,.85)' }}>{c.num} /</span>
            <span className="pill">БРЕНДИРОВАНИЕ</span>
          </div>
          <div className="cat__body">
            <div className="cat__name">{c.name}</div>
            <div className="cat__desc">{c.desc}</div>
            <div className="cat__row">
              <a href={`/catalog/${c.slug}/`} className="cat__link">Подробнее</a>
              <a href="#request" className="cat__quote">В расчёт →</a>
            </div>
          </div>
        </article>
      ))}
    </div>

    <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
      <a href="/catalog/" className="btn btn--lime">Смотреть весь каталог
        <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.5"/></svg></span>
      </a>
    </div>
  </section>
);

/* ---------- BRANDING ---------- */
const brandingV2 = [
  { slug: 'embroidery',  num: '01', t: 'Вышивка',     d: 'Объёмная фактура, износостойко, премиум на полотне.',   tags: ['до 12 цв.', 'от 30 шт'] },
  { slug: 'chevrons',    num: '02', t: 'Шевроны',     d: 'Нашивки с пришивкой или на липучке.',                   tags: ['ПВХ / ткань', 'от 50'] },
  { slug: 'silk',        num: '03', t: 'Шелкография', d: 'Стойкая печать большими тиражами, плотный краситель.',  tags: ['до 8 цв.', 'от 50'] },
  { slug: 'dtf',         num: '04', t: 'DTF',         d: 'Полноцветная плёнка, фото-изображения, мелкие детали.', tags: ['CMYK+W', 'от 1 шт'] },
  { slug: 'dtg',         num: '05', t: 'DTG',         d: 'Прямая печать на ткани, сложная графика и фото.',       tags: ['фото-кач.', 'от 1 шт'] },
  { slug: 'sublim',      num: '06', t: 'Сублимация',  d: 'Полноцвет по всей поверхности синтетики.',              tags: ['100% PE', 'all-over'] },
  { slug: 'deboss',      num: '07', t: 'Тиснение',    d: 'Сухое и фольгированное на коже и плотной ткани.',        tags: ['фольга', 'клише'] },
  { slug: 'laser',       num: '08', t: 'Гравировка',  d: 'Лазерная маркировка по металлу, дереву, коже.',          tags: ['от 1 шт', 'без краски'] },
  { slug: 'labels',      num: '09', t: 'Бирки',       d: 'Тканые, кожаные, бумажные — финальный штрих.',           tags: ['жаккард', 'крой'] },
];

const BrandIco = ({ slug }) => {
  const p = { width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 };
  switch (slug) {
    case 'embroidery': return <svg {...p} viewBox="0 0 22 22"><circle cx="11" cy="11" r="6"/><path d="M11 5 L11 17 M5 11 L17 11"/></svg>;
    case 'chevrons':   return <svg {...p} viewBox="0 0 22 22"><path d="M3 14 L11 6 L19 14 L16 17 L11 12 L6 17 Z"/></svg>;
    case 'silk':       return <svg {...p} viewBox="0 0 22 22"><rect x="3" y="3" width="16" height="16"/><path d="M7 7 L15 7 M7 11 L15 11 M7 15 L15 15"/></svg>;
    case 'dtf':        return <svg {...p} viewBox="0 0 22 22"><rect x="3" y="5" width="16" height="12"/><path d="M7 5 L7 17 M11 5 L11 17 M15 5 L15 17"/></svg>;
    case 'dtg':        return <svg {...p} viewBox="0 0 22 22"><path d="M3 8 L19 8 L16 17 L6 17 Z"/><circle cx="11" cy="12" r="2"/></svg>;
    case 'sublim':     return <svg {...p} viewBox="0 0 22 22"><path d="M5 17 Q5 5 11 5 Q17 5 17 17 Z"/></svg>;
    case 'deboss':     return <svg {...p} viewBox="0 0 22 22"><rect x="3" y="5" width="16" height="12"/><path d="M8 11 L14 11" strokeWidth="3"/></svg>;
    case 'laser':      return <svg {...p} viewBox="0 0 22 22"><path d="M3 19 L19 19 M11 3 L11 15 M8 12 L11 15 L14 12"/></svg>;
    case 'labels':     return <svg {...p} viewBox="0 0 22 22"><path d="M3 6 L14 3 L19 11 L14 19 L3 16 Z"/><circle cx="8" cy="11" r="1.5"/></svg>;
    default: return null;
  }
};

const BrandingV2 = () => (
  <section id="branding">
    <div className="section-head">
      <div>
        <div className="kicker">(04) — Нанесение</div>
        <h2>9 способов<br /><em>персонализации</em></h2>
      </div>
      <p>Подбираем технологию под ткань, тираж и бюджет. От вышивки на корпоративных поло до полноцветной DTF на промо-футболках.</p>
    </div>

    <div className="brand-grid">
      {brandingV2.map(b => (
        <a className="brand" key={b.slug} href={`/branding/${b.slug}/`}>
          <div className="brand__top">
            <span className="brand__ico"><BrandIco slug={b.slug} /></span>
            <span className="brand__num">{b.num}</span>
          </div>
          <div>
            <div className="brand__title">{b.t}</div>
            <div className="brand__desc" style={{ marginTop: 6 }}>{b.d}</div>
          </div>
          <div className="brand__bottom">
            <div className="brand__tags">
              {b.tags.map(t => <span className="pill" key={t}>{t}</span>)}
            </div>
            <span className="brand__arrow">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.5"/></svg>
            </span>
          </div>
        </a>
      ))}
    </div>
  </section>
);

/* ---------- WORK STEPS ---------- */
const stepsV2 = [
  { n: '01', t: 'Заявка',          d: 'Форма или звонок — отвечаем в течение часа.',                m: '1 час' },
  { n: '02', t: 'Подбор',          d: 'Ткань, тираж, способы нанесения, дедлайн.',                  m: 'до 1 дня' },
  { n: '03', t: 'Расчёт',          d: 'Смета, варианты тканей, образцы методов нанесения.',         m: '1–2 дня' },
  { n: '04', t: 'Макет и образец', d: 'Дизайнер собирает макет, шьём pre-production sample.',       m: '3–5 дней', active: true },
  { n: '05', t: 'Производство',    d: 'Тираж в цехе с контролем ОТК на каждом этапе.',              m: '7–14 дней' },
  { n: '06', t: 'Отгрузка',        d: 'Индивидуальная упаковка, маркировка, отправка ТК.',          m: '1 день' },
];

const WorkV2 = () => (
  <section id="how-we-work">
    <div className="section-head">
      <div>
        <div className="kicker">(05) — Процесс</div>
        <h2>Как мы<br /><em>работаем</em></h2>
      </div>
      <p>От первого звонка до отгрузки — шесть прозрачных шагов. Образец до тиража, статус в реальном времени.</p>
    </div>

    <div className="steps-grid">
      {stepsV2.map(s => (
        <div className={`step ${s.active ? 'active' : ''}`} key={s.n}>
          <div className="step__num">{s.n}</div>
          <div className="step__t">{s.t}</div>
          <div className="step__b">{s.d}</div>
          <div className="step__time">⏱ {s.m}</div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- PORTFOLIO ---------- */
const portfolioV2 = [
  { slug: 'it-startup',  type: 'IT-компания',     t: 'Welcome-кит для онбординга',         task: 'Welcome-набор', ed: '320 шт',         tech: 'Вышивка + DTF',  term: '12 дней', date: '14.05', kind: 'hoodie',     tint: 'orange' },
  { slug: 'event',       type: 'Event-агентство', t: 'Форма для фестиваля',                task: 'Худи и кепки',  ed: '180 шт',         tech: 'Шелкография',    term: '9 дней',  date: '02.05', kind: 'cap',        tint: 'lime' },
  { slug: 'sport',       type: 'Спорт-клуб',      t: 'Форма для любительской лиги',        task: 'Игровая',       ed: '90 комп.',       tech: 'Сублимация',     term: '14 дней', date: '21.04', kind: 'tee',        tint: 'sea' },
  { slug: 'restaurant',  type: 'Ресторан',        t: 'Униформа для зала',                  task: 'Рубашки',       ed: '60 шт',          tech: 'Вышивка',        term: '11 дней', date: '12.04', kind: 'longsleeve', tint: 'plum' },
  { slug: 'retail',      type: 'Ритейл-сеть',     t: 'Шопперы для запуска коллекции',      task: 'Шопперы',       ed: '1 200 шт',       tech: 'Шелкография',    term: '18 дней', date: '28.03', kind: 'bag',        tint: 'cool' },
  { slug: 'coffee',      type: 'Кофейня',         t: 'Фартуки и футболки барист',          task: 'Униформа',      ed: '45 шт',          tech: 'Вышивка',        term: '8 дней',  date: '15.03', kind: 'vest',       tint: 'sand' },
];

const PortfolioV2 = () => (
  <section id="portfolio">
    <div className="section-head">
      <div>
        <div className="kicker">(06) — Кейсы</div>
        <h2>240+ <span className="accent">проектов</span><br />в деле</h2>
      </div>
      <p>Шесть из последних: от welcome-наборов для IT до тиражей в 1 200 шопперов для ритейл-сети. Каждый — с задачей, цифрами и сроками.</p>
    </div>

    <div className="case-grid">
      {portfolioV2.map(c => (
        <article className="case" key={c.slug}>
          <div className="case__media">
            <PhotoV2 kind={c.kind} tint={c.tint} shape="rect" style={{ borderRadius: 0 }} />
            <span className="case__chip">{c.type}</span>
            <span className="case__date">{c.date}.2026</span>
          </div>
          <div className="case__body">
            <h3 className="case__title">{c.t}</h3>
            <dl className="case__meta">
              <dt>Задача</dt><dd>{c.task}</dd>
              <dt>Тираж</dt><dd>{c.ed}</dd>
              <dt>Метод</dt><dd>{c.tech}</dd>
              <dt>Срок</dt><dd>{c.term}</dd>
            </dl>
            <div className="case__actions">
              <a href={`/portfolio/${c.slug}/`} className="cat__link" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>Смотреть кейс</a>
              <a href="#request" className="cat__quote" style={{ color: 'var(--orange)' }}>Рассчитать похожий →</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

/* ---------- CLIENTS ---------- */
const clientsV2 = [
  { mark: 'IT', n: 'IT-компания',          tp: 'SaaS · 200+ сотр.' },
  { mark: 'EV', n: 'Event-агентство',      tp: 'Фестивали, форумы' },
  { mark: 'PR', n: 'Производство',         tp: 'Промышленное' },
  { mark: 'SP', n: 'Спортивный клуб',      tp: 'Любительская лига' },
  { mark: 'RS', n: 'Ресторан',             tp: 'HoReCa · 4 точки' },
  { mark: 'CF', n: 'Кофейня',              tp: 'Сеть, 12 точек' },
  { mark: 'RT', n: 'Ритейл-сеть',          tp: 'Fashion · 30+ магазинов' },
  { mark: 'MA', n: 'Маркетинг-агентство',  tp: 'B2B-промо' },
];

const ClientsV2 = () => (
  <section id="clients">
    <div className="section-head">
      <div>
        <div className="kicker">(07) — Клиенты</div>
        <h2>Нам доверяют<br /><em>компании</em></h2>
      </div>
      <p>От стартапов до сетевого ритейла. Логотипы под NDA — покажем по запросу под договор.</p>
    </div>

    <div className="clients-grid">
      {clientsV2.map(c => (
        <div className="client" key={c.n}>
          <span className="client__mark">{c.mark}</span>
          <div>
            <div className="client__name">{c.n}</div>
            <div className="client__type">{c.tp}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- FAQ ---------- */
const faqV2 = [
  { q: 'Какой минимальный тираж?', a: 'От 30 шт. на одну позицию. На некоторые ткани — от 50 шт. На DTF и DTG возможен заказ от 1 единицы для образца или подарка.' },
  { q: 'Можно увидеть образец до тиража?', a: 'Да — pre-production sample шьём и согласовываем до запуска основной партии. Это 3–5 рабочих дней. Стоимость образца входит в смету при тираже от 100 шт.' },
  { q: 'Сколько занимает производство?', a: 'Стандарт — 10–14 дней с момента согласования макета и образца. Срочные партии до 100 шт. — 5–7 дней с доплатой за приоритет.' },
  { q: 'Какие способы брендирования?', a: '9 методов: вышивка, шевроны, шелкография, DTF, DTG, сублимация, тиснение, лазерная гравировка, тканые бирки. Технологию подбираем под ткань, тираж и эффект.' },
  { q: 'Работаете ли с юрлицами?', a: 'Да — договор, счёт, акт, УПД, маркировка для WB/Ozon. При повторных заказах — отсрочка платежа до 14 дней.' },
  { q: 'Как происходит доставка?', a: 'По Москве — собственный курьер или СДЭК. По России — ТК на выбор (Деловые Линии, Байкал, ПЭК, СДЭК). При необходимости — маркировка для маркетплейсов.' },
];

const FAQV2 = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq">
      <div className="section-head">
        <div>
          <div className="kicker">(08) — FAQ</div>
          <h2>Часто <em>спрашивают</em></h2>
        </div>
        <p>Шесть вопросов, которые задают перед первым заказом. На остальные — в чате или по телефону.</p>
      </div>

      <div className="faq-wrap">
        {faqV2.map((f, i) => (
          <div className={`qa ${open === i ? 'open' : ''}`} key={i}>
            <button className="qa__btn" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="qa__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="qa__q">{f.q}</span>
              <span className="qa__t">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2 L7 12 M2 7 L12 7" stroke="currentColor" strokeWidth="1.5"/></svg>
              </span>
            </button>
            <div className="qa__a"><div><div className="qa__body">{f.a}</div></div></div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ---------- SEO TEXT ---------- */
const SeoV2 = () => (
  <section>
    <div className="card" style={{ padding: '48px 56px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48 }}>
      <div>
        <div className="kicker" style={{ marginBottom: 16 }}>(09) — Подробнее</div>
        <h3 style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 36, lineHeight: 1, letterSpacing: '-0.02em' }}>
          Промо-одежда и&nbsp;корпоративный мерч под&nbsp;ключ
        </h3>
      </div>
      <div style={{ color: '#333', fontSize: 14.5, lineHeight: 1.65, maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p>Производим корпоративную одежду и промо-мерч для бизнеса в собственном швейном цехе. Шьём футболки, худи, свитшоты, лонгсливы, поло, ветровки, дождевики, жилеты и сумки — с любой плотностью ткани и под любую посадку.</p>
        <p>Брендируем 9 способами: вышивка, шевроны, шелкография, DTF, DTG, сублимация, тиснение, лазерная гравировка и тканые бирки. Все этапы — от лекала и раскроя до нанесения и упаковки — проходят на одной площадке, поэтому мы контролируем сроки и качество без посредников. Работаем с юрлицами по полному пакету документов и доставляем по всей России.</p>
      </div>
    </div>
  </section>
);

/* ---------- REQUEST FORM ---------- */
const RequestV2 = () => {
  const [sent, setSent] = React.useState(false);
  return (
    <section id="request">
      <div className="section-head">
        <div>
          <div className="kicker">(10) — Заявка</div>
          <h2>Рассчитать <em>стоимость</em></h2>
        </div>
        <p>Заполните форму — менеджер свяжется в течение часа в рабочее время. Можно прикрепить ТЗ, логотип или макет.</p>
      </div>

      <div className="form-wrap">
        <div className="form-side">
          <h3>4 шага до образца</h3>
          <p>От первого касания до согласованного pre-production sample — без долгих переписок.</p>
          <div className="bullets">
            {[
              { n: '01', t: 'Отвечаем за 1 час',           d: 'В будни 9:00–19:00 со сметой и сроками.' },
              { n: '02', t: 'Считаем 2–3 варианта',         d: 'Разный бюджет, ткани, методы нанесения.' },
              { n: '03', t: 'Шьём образец до тиража',       d: 'Pre-production sample на согласование.' },
              { n: '04', t: 'Полный пакет документов',      d: 'Договор, счёт, акт, УПД, маркировка.' },
            ].map(b => (
              <div className="bullet" key={b.n}>
                <span className="bullet__n">{b.n}</span>
                <div>
                  <div className="bullet__t">{b.t}</div>
                  <div className="bullet__d">{b.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form className="form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
          {sent ? (
            <div style={{ padding: '60px 0', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--lime)', color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 14 L12 20 L22 8" stroke="currentColor" strokeWidth="2.5"/></svg>
              </div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 10 }}>
                Заявка принята
              </div>
              <p style={{ color: '#b5b6ad', maxWidth: 360, margin: '0 auto', fontSize: 15 }}>
                Менеджер свяжется в течение часа в рабочее время. Хорошего дня!
              </p>
            </div>
          ) : (
            <>
              <div className="row">
                <div className="field">
                  <label>ФИО <span className="req">*</span></label>
                  <input type="text" placeholder="Как к вам обращаться" required />
                </div>
                <div className="field">
                  <label>Компания</label>
                  <input type="text" placeholder="ООО «Название»" />
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label>Телефон <span className="req">*</span></label>
                  <input type="tel" placeholder="+7 (___) ___-__-__" required />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input type="email" placeholder="name@company.ru" />
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label>Способ связи</label>
                  <select defaultValue=""><option value="" disabled>Выберите</option><option>Звонок</option><option>Telegram</option><option>WhatsApp</option><option>Email</option></select>
                </div>
                <div className="field">
                  <label>Тираж</label>
                  <select defaultValue=""><option value="" disabled>Выберите</option><option>30–100 шт</option><option>100–300 шт</option><option>300–1000 шт</option><option>1000+ шт</option></select>
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label>Что нужно <span className="req">*</span></label>
                  <select defaultValue="" required><option value="" disabled>Выберите</option><option>Футболки</option><option>Худи</option><option>Свитшоты</option><option>Сумки</option><option>Welcome-набор</option><option>Другое</option></select>
                </div>
                <div className="field">
                  <label>Срок</label>
                  <select defaultValue=""><option value="" disabled>Выберите</option><option>Стандарт (10–14 дней)</option><option>Срочно (5–7 дней)</option><option>Гибкий</option></select>
                </div>
              </div>
              <div className="row row--single">
                <div className="field">
                  <label>Комментарий</label>
                  <textarea placeholder="Опишите задачу: цвета, размеры, ТЗ…" rows="3"></textarea>
                </div>
              </div>
              <div className="row row--single">
                <label className="file">
                  <span className="file__icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 3 L4 12 Q1 15 4 18 Q7 21 10 18 L17 11 Q19 9 17 7 Q15 5 13 7 L7 13" stroke="currentColor" strokeWidth="1.5"/></svg>
                  </span>
                  <span>Прикрепить файл — логотип, ТЗ, макет (до 10 МБ)</span>
                  <input type="file" hidden />
                </label>
              </div>
              <div className="form__submit">
                <button type="submit" className="btn btn--lime">
                  Отправить заявку
                  <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.5"/></svg></span>
                </button>
                <span className="consent">
                  Нажимая, вы соглашаетесь с <a href="/privacy">политикой обработки данных</a>.
                </span>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

/* ---------- SCROLL TEXT ---------- */
const ScrollText = () => (
  <section className="scrolltext">
    МЕРЧ.ЦЕХ <span className="accent">— ОТ ЛЕКАЛА</span> ДО ОТГРУЗКИ ·
  </section>
);

/* ---------- FOOTER ---------- */
const FooterV2 = () => (
  <footer className="footer">
    <div>
      <h3>МЕРЧ.<br />ЦЕХ<span style={{ color: 'var(--lime)' }}>.</span></h3>
      <p>Шьём корпоративную одежду и промо-мерч для бизнеса. Собственный цех, 9 методов нанесения, работа с юрлицами.</p>
    </div>
    <div>
      <h5>Каталог</h5>
      <ul>
        <li><a href="/catalog/futbolki/">Футболки</a></li>
        <li><a href="/catalog/hudi/">Худи</a></li>
        <li><a href="/catalog/svitshoty/">Свитшоты</a></li>
        <li><a href="/catalog/sumki/">Сумки</a></li>
        <li><a href="/catalog/">Все категории →</a></li>
      </ul>
    </div>
    <div>
      <h5>Компания</h5>
      <ul>
        <li><a href="/about/">О нас</a></li>
        <li><a href="/portfolio/">Кейсы</a></li>
        <li><a href="/branding/">Способы нанесения</a></li>
        <li><a href="/contacts/">Контакты</a></li>
      </ul>
    </div>
    <div>
      <h5>Связаться</h5>
      <ul>
        <li>+7 (495) 000–00–00</li>
        <li>hello@merchcex.ru</li>
        <li>Москва, ул. Промзона, 12</li>
        <li>Пн–Пт · 9:00–19:00</li>
      </ul>
    </div>
    <div className="footer__bottom">
      <div>© 2014–2026 МЕРЧ.ЦЕХ — все права защищены</div>
      <div className="links">
        <a href="/privacy">Политика</a>
        <a href="/cookies">Cookies</a>
        <a href="/terms">Оферта</a>
      </div>
    </div>
  </footer>
);

Object.assign(window, {
  NavV2, HeroV2, HeroExtras, AdvantagesV2, AboutV2,
  CatalogV2, BrandingV2, WorkV2, PortfolioV2, ClientsV2,
  FAQV2, SeoV2, RequestV2, ScrollText, FooterV2,
});
