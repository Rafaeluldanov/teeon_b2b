/* V6 — sections matching full TEEON spec */

const { MarkV6, Logotype, Photo } = window;

/* ---------- HEADER WITH MEGA-MENU ---------- */
const HeaderV6 = () => {
  const [open, setOpen] = React.useState(null); // 'catalog' | 'branding' | null
  return (
    <header className="hd" onMouseLeave={() => setOpen(null)}>
      <a href="#" className="hd__logo">
        <Logotype size={26} />
      </a>

      <nav className="hd__nav">
        <ul className="hd__list">
          <li className={open === 'catalog' ? 'open active' : ''}
              onMouseEnter={() => setOpen('catalog')}>
            <a href="catalog.html">
              Каталог
              <svg className="hd__caret" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </a>
          </li>
          <li className={open === 'branding' ? 'open active' : ''}
              onMouseEnter={() => setOpen('branding')}>
            <button>
              Нанесение
              <svg className="hd__caret" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
          </li>
          <li onMouseEnter={() => setOpen(null)}><a href="#portfolio">Кейсы</a></li>
          <li onMouseEnter={() => setOpen(null)}><a href="#about">О нас</a></li>
          <li onMouseEnter={() => setOpen(null)}><a href="#faq">FAQ</a></li>
          <li onMouseEnter={() => setOpen(null)}><a href="/contacts/">Контакты</a></li>
        </ul>

        {open === 'catalog' && <CatalogMega />}
        {open === 'branding' && <BrandingMega />}
      </nav>

      <div className="hd__contacts">
        <a href="tel:+74950000000" className="hd__phone">+7 (495) 000-00-00</a>
        <a href="https://t.me/teeon" className="hd__tg" aria-label="Telegram">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M2.5 9.5 L17.5 3.5 L14.5 17.5 L11 12.5 L15 6 L8.5 12 L2.5 9.5 Z" fill="currentColor"/>
          </svg>
        </a>
        <a href="#request" className="hd__cta">
          Консультация
          <span className="ic">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
          </span>
        </a>
      </div>
    </header>
  );
};

const catalogMegaItems = [
  { slug: 'futbolki',  t: 'Футболки',   d: 'хлопок 160–220 г/м²' },
  { slug: 'hudi',      t: 'Худи',       d: 'двунитка, трёхнитка' },
  { slug: 'svitshoty', t: 'Свитшоты',   d: 'плотные 280–340 г' },
  { slug: 'longslivy', t: 'Лонгсливы',  d: 'слим, oversize' },
  { slug: 'sumki',     t: 'Сумки',      d: 'шопперы, рюкзаки' },
  { slug: 'zhiletki',  t: 'Жилетки',    d: 'утеплённые, сетка' },
  { slug: 'kurtki',    t: 'Куртки',     d: 'софтшелл, ветровки' },
  { slug: 'dozhdeviki',t: 'Дождевики',  d: 'PVC, нейлон' },
];

const brandingMegaItems = [
  { slug: 'embroidery', t: 'Вышивка',     d: 'до 12 цветов' },
  { slug: 'silk',       t: 'Шелкография', d: 'крупные тиражи' },
  { slug: 'dtf',        t: 'DTF',         d: 'полноцвет' },
  { slug: 'dtg',        t: 'DTG',         d: 'прямая печать' },
  { slug: 'sublim',     t: 'Сублимация',  d: 'all-over' },
  { slug: 'chevrons',   t: 'Шевроны',     d: 'нашивки, липучки' },
  { slug: 'deboss',     t: 'Тиснение',    d: 'фольга, клише' },
  { slug: 'laser',      t: 'Гравировка',  d: 'лазер' },
  { slug: 'labels',     t: 'Бирки',       d: 'жаккард, кожа' },
];

const MegaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="14" height="11" rx="1.5"/>
    <path d="M2 7 L16 7"/>
  </svg>
);

const CatalogMega = () => (
  <div className="megamenu">
    {catalogMegaItems.map(i => (
      <a className="megamenu__item" key={i.slug} href={`category.html?slug=${i.slug}`}>
        <span className="megamenu__ic"><MegaIcon /></span>
        <div>
          <div className="megamenu__title">{i.t}</div>
          <div className="megamenu__sub">{i.d}</div>
        </div>
      </a>
    ))}
    <a className="megamenu__all" href="catalog.html">
      <span>Смотреть весь каталог · 8 категорий</span>
      <span className="ic">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
      </span>
    </a>
  </div>
);

const BrandingMega = () => (
  <div className="megamenu">
    {brandingMegaItems.map(i => (
      <a className="megamenu__item" key={i.slug} href={`/branding/${i.slug}/`}>
        <span className="megamenu__ic"><MegaIcon /></span>
        <div>
          <div className="megamenu__title">{i.t}</div>
          <div className="megamenu__sub">{i.d}</div>
        </div>
      </a>
    ))}
    <a className="megamenu__all" href="/branding/">
      <span>Все способы брендирования · 9 методов</span>
      <span className="ic">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
      </span>
    </a>
  </div>
);

/* ---------- HERO (1) ---------- */
const HeroV6 = () => (
  <>
    <section className="hero">
      <div className="hero__bg"></div>
      <div className="hero__overlay"></div>
      <div className="hero__inner">
        <span className="hero__eyebrow">
          <span className="dot"></span>
          B2B · мерч с 2014 года · открыты для проектов
        </span>
        <h1>
          Корпоративный мерч,<br />
          в котором <em>не стыдно</em><br />
          ходить и за пределами офиса
        </h1>
        <p className="hero__sub">
          Шьём промо-одежду и корпоративный мерч в собственном цехе. 9 методов нанесения, образец до тиража, тираж от 30 шт. — от лекала до отгрузки на одной площадке.
        </p>
        <div className="hero__cta">
          <a href="#request" className="btn btn--yellow">
            Рассчитать стоимость
            <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
          </a>
          <a href="#catalog" className="btn btn--ghost">
            Смотреть каталог
            <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7 L11 7 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.7"/></svg></span>
          </a>
        </div>
      </div>

      <div className="hero__badges">
        <div className="hero__badge">
          <span className="hero__badge__ic">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 9 L8 6 L9 7 Q11 8 13 7 L14 6 L17 9 L15 12 L13 11 L13 17 L9 17 L9 11 L7 12 Z"/></svg>
          </span>
          <div>
            <div className="hero__badge__t">Свой цех</div>
            <div className="hero__badge__d">от лекала до отгрузки</div>
          </div>
        </div>
        <div className="hero__badge">
          <span className="hero__badge__ic">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="10" cy="10" r="6"/><path d="M7 10 L9 12 L13 8"/></svg>
          </span>
          <div>
            <div className="hero__badge__t">9 методов нанесения</div>
            <div className="hero__badge__d">от вышивки до DTF</div>
          </div>
        </div>
        <div className="hero__badge">
          <span className="hero__badge__ic">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M10 3 L16 6 L16 11 Q16 15 10 17 Q4 15 4 11 L4 6 Z"/><path d="M7 10 L9 12 L13 8"/></svg>
          </span>
          <div>
            <div className="hero__badge__t">Образец до тиража</div>
            <div className="hero__badge__d">pre-production sample</div>
          </div>
        </div>
        <div className="hero__badge">
          <span className="hero__badge__ic">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="7" width="10" height="7"/><path d="M13 9 L16 9 L17 11 L17 14 L13 14"/><circle cx="7" cy="15" r="1.5"/><circle cx="15" cy="15" r="1.5"/></svg>
          </span>
          <div>
            <div className="hero__badge__t">Доставка по РФ</div>
            <div className="hero__badge__d">УПД, маркировка</div>
          </div>
        </div>
      </div>
    </section>

    {/* Stats row right under hero */}
    <section className="hero-stats">
      <div className="hs-card">
        <div className="hs-card__k">⏱ Сроки</div>
        <div className="hs-card__v">10–14<span className="u">дней</span></div>
        <div className="hs-card__d">стандартный тираж от лекала до отгрузки</div>
      </div>
      <div className="hs-card yellow">
        <div className="hs-card__k">⌂ Производство</div>
        <div className="hs-card__v">600<span className="u">м²</span></div>
        <div className="hs-card__d">собственный швейный цех в Подмосковье</div>
      </div>
      <div className="hs-card blue">
        <div className="hs-card__k">✦ Брендирование</div>
        <div className="hs-card__v">9<span className="u">методов</span></div>
        <div className="hs-card__d">от вышивки и шелкографии до DTF и тиснения</div>
      </div>
      <div className="hs-card">
        <div className="hs-card__k">∑ Расчёт</div>
        <div className="hs-card__v">от 30<span className="u">шт</span></div>
        <div className="hs-card__d">минимальный тираж под расчёт и образец</div>
      </div>
    </section>
  </>
);

/* ---------- 2. ADVANTAGES ---------- */
const advItems = [
  { n: '01', t: 'Пошив\nпод задачу',         d: 'Свои лекала, ткани от поставщиков-партнёров, любые посадки.', bg: '' },
  { n: '02', t: 'Брендирование\nвнутри цеха', d: 'Один цех, минус неделя на логистике между подрядчиками.',     bg: 'yellow' },
  { n: '03', t: 'Контроль\nкачества',        d: 'Образец до тиража, ОТК на трёх этапах, замена за наш счёт.',  bg: '' },
  { n: '04', t: 'Доставка\nпо России',       d: 'Любая ТК, маркировка для WB/Ozon, отгрузка партиями.',         bg: 'blue' },
];

const AdvIco = ({ n }) => {
  const p = { width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 1.7 };
  if (n === '01') return <svg {...p} viewBox="0 0 22 22"><path d="M5 9 L8 6 L9 7 Q11 8 13 7 L14 6 L17 9 L15 12 L13 11 L13 17 L9 17 L9 11 L7 12 Z"/></svg>;
  if (n === '02') return <svg {...p} viewBox="0 0 22 22"><circle cx="11" cy="11" r="6"/><path d="M8 11 L10 13 L14 9"/></svg>;
  if (n === '03') return <svg {...p} viewBox="0 0 22 22"><path d="M11 3 L17 5 L17 10 Q17 15 11 18 Q5 15 5 10 L5 5 Z"/><path d="M8 11 L10 13 L14 9"/></svg>;
  return <svg {...p} viewBox="0 0 22 22"><rect x="3" y="8" width="11" height="7"/><path d="M14 10 L18 10 L19 12 L19 15 L14 15"/><circle cx="7" cy="16" r="1.5"/><circle cx="17" cy="16" r="1.5"/></svg>;
};

const AdvantagesV6 = () => (
  <section className="adv-grid section-spacer">
    {advItems.map(a => (
      <div className={`adv ${a.bg}`} key={a.n}>
        <div className="adv__head">
          <span className="adv__num">{a.n} /</span>
          <span className="adv__ic"><AdvIco n={a.n} /></span>
        </div>
        <div className="adv__t">{a.t}</div>
        <div className="adv__d">{a.d}</div>
      </div>
    ))}
  </section>
);

/* ---------- 3. ABOUT ---------- */
const AboutV6 = () => (
  <section id="about" className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(02) — О компании</div>
        <h2>Шьём с&nbsp;<em>нуля</em>,<br />а&nbsp;не закупаем</h2>
      </div>
      <p>Свой цех в Подмосковье — 24 швеи, своё нанесение, своя упаковка. Все этапы под одной крышей: лекало, раскрой, пошив, брендирование, отгрузка. Без посредников и потерь времени между подрядчиками.</p>
    </div>

    <div className="about-grid">
      <div className="tile yellow col-5" style={{ minHeight: 360 }}>
        <div className="kicker on-yellow">с 2014 года</div>
        <h2 style={{ marginTop: 14 }}>240<span style={{ color: 'var(--blue)' }}>+</span></h2>
        <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 22, marginTop: 4 }}>проектов в год</div>
        <p style={{ marginTop: 14, maxWidth: 420, fontSize: 14.5, lineHeight: 1.55 }}>
          От welcome-наборов IT-стартапов до тиражей в 1 200 шопперов для ритейл-сетей. Каждый заказ — один менеджер, один договор, одна площадка.
        </p>
        <div style={{ marginTop: 'auto', display: 'flex', gap: 10, paddingTop: 24 }}>
          <a href="/about/" className="btn btn--ink">Подробнее <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span></a>
          <a href="#request" className="btn btn--ghost-d">Рассчитать <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span></a>
        </div>
      </div>

      <div className="tile photo col-4" style={{ minHeight: 360 }}>
        <Photo tint="sand" kind="person" num="01/" label="Цех · Подмосковье" />
      </div>

      <div className="col-3" style={{ display: 'grid', gap: 12 }}>
        <div className="tile" style={{ minHeight: 174 }}>
          <div className="kicker">Площадь</div>
          <div className="big" style={{ marginTop: 8, fontSize: 56 }}>600<span style={{ fontSize: 22, color: 'var(--coral)', marginLeft: 4 }}>м²</span></div>
          <div className="kicker" style={{ marginTop: 'auto' }}>производство + склад</div>
        </div>
        <div className="tile ink" style={{ minHeight: 174 }}>
          <div className="kicker on-dark">Команда</div>
          <div className="big" style={{ marginTop: 8, fontSize: 56 }}>24<span style={{ fontSize: 22, color: 'var(--yellow)', marginLeft: 4 }}>швеи</span></div>
          <div className="kicker on-dark" style={{ marginTop: 'auto' }}>+ 6 чел. нанесение</div>
        </div>
      </div>

      <div className="tile col-4" style={{ minHeight: 220 }}>
        <div className="kicker">За 11 лет</div>
        <h2 style={{ marginTop: 12, fontSize: 48 }}>≈ 320 000</h2>
        <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 18, marginTop: 4 }}>единиц пошито</div>
        <p style={{ marginTop: 'auto', color: 'var(--muted)', fontSize: 13.5 }}>от 30-шт. пилотов до 5 000-шт. сетевых партий</p>
      </div>

      <div className="tile photo col-4" style={{ minHeight: 220 }}>
        <Photo tint="steel" kind="hoodie" num="02/" label="Готовая партия" />
      </div>

      <div className="tile blue col-4" style={{ minHeight: 220 }}>
        <div className="kicker on-dark">Документы</div>
        <h2 style={{ marginTop: 12, fontSize: 36, color: 'var(--paper)' }}>УПД,<br />договор,<br />отсрочка</h2>
        <p style={{ marginTop: 'auto', fontSize: 13.5, opacity: .9 }}>работаем с юрлицами, маркировка для WB/Ozon</p>
      </div>
    </div>
  </section>
);

/* ---------- 4. CATALOG ---------- */
const catalog = [
  { slug: 'futbolki',  num: '01', name: 'Футболки',  desc: 'Хлопок 160–220 г/м², от 30 шт.',     kind: 'tee',        bg: 'paper-2' },
  { slug: 'hudi',      num: '02', name: 'Худи',      desc: 'Двунитка/трёхнитка с начёсом.',     kind: 'hoodie',     bg: 'yellow' },
  { slug: 'svitshoty', num: '03', name: 'Свитшоты',  desc: 'Без капюшона, плотность 280–340.',  kind: 'sweat',      bg: 'paper-2' },
  { slug: 'longslivy', num: '04', name: 'Лонгсливы', desc: 'Слим и oversize, длинный рукав.',    kind: 'longsleeve', bg: 'blue' },
  { slug: 'sumki',     num: '05', name: 'Сумки',     desc: 'Шопперы и рюкзаки, бязь и оксфорд.', kind: 'bag',        bg: 'mint' },
  { slug: 'zhiletki',  num: '06', name: 'Жилетки',   desc: 'Утеплённые и сетчатые, под печать.', kind: 'vest',       bg: 'paper-2' },
  { slug: 'kurtki',    num: '07', name: 'Куртки',    desc: 'Софтшелл, ветровки, утеплённые.',    kind: 'jacket',     bg: 'ink' },
  { slug: 'dozhdeviki',num: '08', name: 'Дождевики', desc: 'PVC и нейлон, с капюшоном.',         kind: 'raincoat',   bg: 'coral' },
];

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
    {kind === 'cap'        && <g fill="currentColor"><path d="M60 130 Q60 80 100 80 Q140 80 140 130 L155 138 L155 150 L45 150 L45 138 Z"/></g>}
  </svg>
);

const CatalogV6 = () => (
  <section id="catalog" className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(03) — Каталог</div>
        <h2>Каталог <span className="hl">промо-одежды</span></h2>
      </div>
      <p>8 базовых категорий — основа, на которую ложится любое брендирование. Любую позицию подгоняем под задачу: ткань, посадка, упаковка, фурнитура.</p>
    </div>

    <div className="cat-grid">
      {catalog.map(c => (
        <article className="cat" key={c.slug}>
          <div className={`cat__media ${c.bg}`}>
            <span className="cat__num">{c.num} /</span>
            <span className="cat__pill">✦ Брендирование</span>
            {renderSilhouette(c.kind, c.bg === 'paper-2' ? 0.55 : 0.45)}
          </div>
          <div className="cat__body">
            <div className="cat__name">{c.name}</div>
            <div className="cat__desc">{c.desc}</div>
            <div className="cat__row">
              <a href={`/catalog/${c.slug}/`} className="cat__btn">Подробнее</a>
              <a href="#request" className="cat__quote">В расчёт →</a>
            </div>
          </div>
        </article>
      ))}
    </div>

    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
      <a href="/catalog/" className="btn btn--ink">
        Смотреть весь каталог
        <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
      </a>
    </div>
  </section>
);

/* ---------- 5. BRANDING ---------- */
const brands = [
  { slug: 'embroidery', num: '01', t: 'Вышивка',     d: 'Объёмная фактура, износостойко, премиум на полотне.',   tags: ['до 12 цв.', 'от 30 шт'], bg: '' },
  { slug: 'silk',       num: '02', t: 'Шелкография', d: 'Стойкая печать большими тиражами, плотный краситель.',  tags: ['до 8 цв.', 'от 50'],     bg: 'yellow' },
  { slug: 'dtf',        num: '03', t: 'DTF',         d: 'Полноцветная плёнка, фото-изображения, мелкие детали.', tags: ['CMYK+W', 'от 1 шт'],     bg: 'blue' },
  { slug: 'dtg',        num: '04', t: 'DTG',         d: 'Прямая печать на ткани, сложная графика и фото.',       tags: ['фото-кач.', 'от 1 шт'],  bg: '' },
  { slug: 'sublim',     num: '05', t: 'Сублимация',  d: 'Полноцвет по всей поверхности синтетики.',              tags: ['100% PE', 'all-over'],   bg: '' },
  { slug: 'chevrons',   num: '06', t: 'Шевроны',     d: 'Нашивки с пришивкой или на липучке.',                   tags: ['ПВХ / ткань', 'от 50'],  bg: 'yellow' },
  { slug: 'deboss',     num: '07', t: 'Тиснение',    d: 'Сухое и фольгированное на коже и плотной ткани.',        tags: ['фольга', 'клише'],       bg: 'ink' },
  { slug: 'laser',      num: '08', t: 'Гравировка',  d: 'Лазерная маркировка по металлу, дереву, коже.',          tags: ['от 1 шт', 'без краски'], bg: '' },
  { slug: 'labels',     num: '09', t: 'Бирки',       d: 'Тканые, кожаные, бумажные — финальный штрих.',           tags: ['жаккард', 'крой'],       bg: 'blue' },
];

const BrIco = ({ slug }) => {
  const p = { width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 1.7 };
  switch (slug) {
    case 'embroidery': return <svg {...p} viewBox="0 0 22 22"><circle cx="11" cy="11" r="6"/><path d="M11 5 L11 17 M5 11 L17 11"/></svg>;
    case 'chevrons':   return <svg {...p} viewBox="0 0 22 22"><path d="M3 14 L11 6 L19 14 L17 17 L11 12 L5 17 Z"/></svg>;
    case 'silk':       return <svg {...p} viewBox="0 0 22 22"><rect x="3" y="3" width="16" height="16"/><path d="M7 7 L15 7 M7 11 L15 11 M7 15 L15 15"/></svg>;
    case 'dtf':        return <svg {...p} viewBox="0 0 22 22"><rect x="3" y="5" width="16" height="12"/><path d="M7 5 L7 17 M11 5 L11 17 M15 5 L15 17"/></svg>;
    case 'dtg':        return <svg {...p} viewBox="0 0 22 22"><path d="M3 8 L19 8 L16 17 L6 17 Z"/><circle cx="11" cy="12" r="2.5"/></svg>;
    case 'sublim':     return <svg {...p} viewBox="0 0 22 22"><path d="M5 17 Q5 5 11 5 Q17 5 17 17 Z"/></svg>;
    case 'deboss':     return <svg {...p} viewBox="0 0 22 22"><rect x="3" y="5" width="16" height="12"/><path d="M8 11 L14 11" strokeWidth="3"/></svg>;
    case 'laser':      return <svg {...p} viewBox="0 0 22 22"><path d="M3 19 L19 19 M11 3 L11 15 M8 12 L11 15 L14 12"/></svg>;
    case 'labels':     return <svg {...p} viewBox="0 0 22 22"><path d="M3 6 L14 3 L19 11 L14 19 L3 16 Z"/><circle cx="9" cy="11" r="2"/></svg>;
    default: return null;
  }
};

const BrandingV6 = () => (
  <section id="branding" className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(04) — Нанесение</div>
        <h2>9 способов<br /><em>персонализации</em></h2>
      </div>
      <p>Подбираем технологию под ткань, тираж и бюджет. От вышивки на корпоративных поло до полноцветной DTF на промо-футболках.</p>
    </div>

    <div className="brand-grid">
      {brands.map(b => (
        <a className={`brandcard ${b.bg}`} key={b.slug} href={`/branding/${b.slug}/`}>
          <div className="brandcard__head">
            <span className="brandcard__ic"><BrIco slug={b.slug} /></span>
            <span className="brandcard__num">{b.num}</span>
          </div>
          <div className="brandcard__t">{b.t}</div>
          <div className="brandcard__d">{b.d}</div>
          <div className="brandcard__tags">
            {b.tags.map(t => <span className="brandcard__tag" key={t}>{t}</span>)}
          </div>
          <span className="brandcard__link">
            Подробнее
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10 L10 2 M4 2 L10 2 L10 8" stroke="currentColor" strokeWidth="1.5"/></svg>
          </span>
        </a>
      ))}
    </div>

    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
      <a href="/branding/" className="btn btn--ink">
        Все способы брендирования
        <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
      </a>
    </div>
  </section>
);

/* ---------- 6. WORK STEPS ---------- */
const steps = [
  { n: '01', t: 'Заявка',           d: 'Форма или звонок — отвечаем в течение часа в рабочее время.', m: '1 час' },
  { n: '02', t: 'Подбор решения',   d: 'Ткань, тираж, способы нанесения, дедлайн — обсуждаем.',       m: 'до 1 дня' },
  { n: '03', t: 'Расчёт',           d: 'Смета, варианты тканей, образцы методов нанесения.',          m: '1–2 дня' },
  { n: '04', t: 'Макет и образец',  d: 'Дизайнер собирает макет, шьём pre-production sample.',         m: '3–5 дней', active: true },
  { n: '05', t: 'Производство',     d: 'Тираж в цехе с контролем ОТК на каждом этапе.',                m: '7–14 дней' },
  { n: '06', t: 'Упаковка, отгрузка', d: 'Индивидуальная упаковка, маркировка, отправка ТК.',          m: '1 день' },
];

const WorkV6 = () => (
  <section id="how-we-work" className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(05) — Процесс</div>
        <h2>Как мы<br /><em>работаем</em></h2>
      </div>
      <p>От первого звонка до отгрузки — шесть прозрачных шагов. Образец до тиража, статус заказа в реальном времени, контроль ОТК на трёх этапах.</p>
    </div>

    <ol className="steps-grid" style={{ listStyle: 'none', padding: 0 }}>
      {steps.map(s => (
        <li key={s.n} className={`step ${s.active ? 'active' : ''}`}>
          <div className="step__num">{s.n}</div>
          <div className="step__t">{s.t}</div>
          <div className="step__d">{s.d}</div>
          <div className="step__time">⏱ {s.m}</div>
        </li>
      ))}
    </ol>
  </section>
);

/* ---------- 7. PORTFOLIO ---------- */
const portfolio = [
  { slug: 'it-startup',  type: 'IT-компания',     t: 'Welcome-кит для онбординга',         task: 'Welcome-набор', ed: '320 шт',   tech: 'Вышивка + DTF',  term: '12 дней', date: '14.05.26', kind: 'hoodie',     bg: 'paper-2' },
  { slug: 'event',       type: 'Event-агентство', t: 'Форма для open-air фестиваля',       task: 'Худи и кепки',  ed: '180 шт',   tech: 'Шелкография',    term: '9 дней',  date: '02.05.26', kind: 'cap',        bg: 'yellow' },
  { slug: 'sport',       type: 'Спорт-клуб',      t: 'Форма для любительской лиги',        task: 'Игровая',       ed: '90 комп.', tech: 'Сублимация',     term: '14 дней', date: '21.04.26', kind: 'tee',        bg: 'blue' },
  { slug: 'restaurant',  type: 'Ресторан',        t: 'Униформа зала с вышивкой логотипа',  task: 'Рубашки',       ed: '60 шт',    tech: 'Вышивка',        term: '11 дней', date: '12.04.26', kind: 'longsleeve', bg: 'paper-2' },
  { slug: 'retail',      type: 'Ритейл-сеть',     t: 'Шопперы к запуску коллекции',        task: 'Шопперы',       ed: '1 200 шт', tech: 'Шелкография',    term: '18 дней', date: '28.03.26', kind: 'bag',        bg: 'yellow' },
  { slug: 'coffee',      type: 'Кофейня',         t: 'Фартуки и футболки барист',          task: 'Униформа',      ed: '45 шт',    tech: 'Вышивка',        term: '8 дней',  date: '15.03.26', kind: 'vest',       bg: 'paper-2' },
];

const PortfolioV6 = () => (
  <section id="portfolio" className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(06) — Кейсы</div>
        <h2>240<em>+</em> проектов<br />в&nbsp;<span className="hl">деле</span></h2>
      </div>
      <p>Шесть из последних кейсов: от welcome-наборов для IT до тиражей в 1 200 шопперов для ритейл-сети. Каждый — с задачей, цифрами и сроками.</p>
    </div>

    <div className="case-grid">
      {portfolio.map(c => (
        <article className="case" key={c.slug}>
          <div className={`case__media ${c.bg}`}>
            <span className="case__chip">{c.type}</span>
            <span className="case__date">{c.date}</span>
            {renderSilhouette(c.kind, c.bg === 'paper-2' ? 0.55 : 0.45)}
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
              <a href={`/portfolio/${c.slug}/`} className="cat__btn">Смотреть кейс</a>
              <a href="#request" className="cat__quote" style={{ marginLeft: 'auto' }}>Рассчитать похожий →</a>
            </div>
          </div>
        </article>
      ))}
    </div>

    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
      <a href="/portfolio/" className="btn btn--ink">
        Смотреть все кейсы
        <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
      </a>
    </div>
  </section>
);

/* ---------- 8. CLIENTS ---------- */
const clients = [
  { mark: 'IT', n: 'IT-компания',         tp: 'SaaS · 200+ сотр.',     bg: '' },
  { mark: 'EV', n: 'Event-агентство',     tp: 'Фестивали, форумы',     bg: 'yellow' },
  { mark: 'PR', n: 'Производство',        tp: 'Промышленное',          bg: '' },
  { mark: 'SP', n: 'Спортивный клуб',     tp: 'Любительская лига',     bg: 'blue' },
  { mark: 'RS', n: 'Ресторан',            tp: 'HoReCa · 4 точки',      bg: '' },
  { mark: 'CF', n: 'Кофейня',             tp: 'Сеть, 12 точек',        bg: 'yellow' },
  { mark: 'RT', n: 'Ритейл-сеть',         tp: 'Fashion · 30+ маг.',    bg: '' },
  { mark: 'MA', n: 'Маркетинг-агент.',    tp: 'B2B-промо',             bg: 'blue' },
];

const ClientsV6 = () => (
  <section id="clients" className="section-spacer">
    <div className="section-head">
      <div>
        <div className="kicker">(07) — Клиенты</div>
        <h2>Нам доверяют <em>компании</em></h2>
      </div>
      <p>От стартапов до сетевого ритейла. Логотипы под NDA — покажем по запросу под договор.</p>
    </div>

    <div className="clients-grid">
      {clients.map(c => (
        <div className={`client ${c.bg}`} key={c.n}>
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

/* ---------- 9. FAQ ---------- */
const faqs = [
  { q: 'Какой минимальный тираж?', a: 'От 30 шт. на одну позицию. На некоторые ткани — от 50 шт. На DTF и DTG возможен заказ от 1 единицы для образца или подарка.' },
  { q: 'Можно увидеть образец перед тиражом?', a: 'Да — pre-production sample шьём и согласовываем до запуска основной партии. Это 3–5 рабочих дней. Стоимость образца входит в смету при тираже от 100 шт.' },
  { q: 'Сколько занимает производство?', a: 'Стандарт — 10–14 дней с момента согласования макета и образца. Срочные партии до 100 шт. — 5–7 дней с доплатой за приоритет.' },
  { q: 'Какие способы брендирования вы используете?', a: '9 методов: вышивка, шевроны, шелкография, DTF, DTG, сублимация, тиснение, лазерная гравировка, тканые бирки. Технологию подбираем под ткань, тираж и эффект.' },
  { q: 'Работаете ли вы с юрлицами?', a: 'Да — договор, счёт, акт, УПД, маркировка для WB/Ozon. При повторных заказах — отсрочка платежа до 14 дней.' },
  { q: 'Доставите ли вы в другой город?', a: 'По Москве — собственный курьер или СДЭК. По России — ТК на выбор (Деловые Линии, Байкал, ПЭК, СДЭК). При необходимости — маркировка для маркетплейсов.' },
];

const FAQV6 = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" className="section-spacer">
      <div className="section-head">
        <div>
          <div className="kicker">(08) — FAQ</div>
          <h2>Часто <em>спрашивают</em></h2>
        </div>
        <p>Шесть вопросов, которые задают перед первым заказом. На остальные — в чате или по телефону.</p>
      </div>

      <dl className="faq-wrap">
        {faqs.map((f, i) => (
          <div className={`qa ${open === i ? 'open' : ''}`} key={i}>
            <dt>
              <button className="qa__btn" aria-expanded={open === i} aria-controls={`qa-${i}`}
                      onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="qa__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="qa__q">{f.q}</span>
                <span className="qa__t">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2 L8 14 M2 8 L14 8" stroke="currentColor" strokeWidth="1.8"/></svg>
                </span>
              </button>
            </dt>
            <dd id={`qa-${i}`} hidden={open !== i} className="qa__a">
              <div><div className="qa__body">{f.a}</div></div>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

/* ---------- 10. SEO TEXT ---------- */
const SeoV6 = () => (
  <section className="seo section-spacer">
    <div>
      <div className="kicker" style={{ marginBottom: 16 }}>(09) — Подробнее</div>
      <h3>Промо-одежда и&nbsp;корпоративный мерч под&nbsp;ключ</h3>
    </div>
    <div>
      <p>Производим корпоративную одежду и промо-мерч для бизнеса в собственном швейном цехе. Шьём футболки, худи, свитшоты, лонгсливы, поло, ветровки, дождевики, жилеты и сумки — с любой плотностью ткани и под любую посадку.</p>
      <p>Брендируем 9 способами: вышивка, шевроны, шелкография, DTF, DTG, сублимация, тиснение, лазерная гравировка и тканые бирки. Все этапы — от лекала и раскроя до нанесения и упаковки — проходят на одной площадке, поэтому мы контролируем сроки и качество без посредников. Работаем с юрлицами по полному пакету документов и доставляем по всей России.</p>
    </div>
  </section>
);

/* ---------- 11. REQUEST FORM ---------- */
const RequestV6 = () => {
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 600);
  };
  return (
    <section id="request" className="section-spacer">
      <div className="form-section">
        <div className="form-section__left">
          <div className="kicker on-dark">(10) — Заявка</div>
          <h2>Рассчитать стоимость <em>пошива и&nbsp;брендирования</em></h2>
          <p>Заполните форму — менеджер свяжется в течение часа в рабочее время. Можно прикрепить ТЗ, логотип или макет.</p>
          <div className="form-section__bullets">
            <div className="form-section__bullet">
              <span className="ic">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="7" cy="7" r="5"/><path d="M7 4 L7 7 L9 9"/></svg>
              </span>
              <span className="t">Отвечаем за 1 час · будни 9:00–19:00</span>
            </div>
            <div className="form-section__bullet">
              <span className="ic">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3 L12 3 L12 11 L2 11 Z"/><path d="M4 6 L10 6 M4 8 L8 8"/></svg>
              </span>
              <span className="t">Считаем 2–3 варианта по разным методам</span>
            </div>
            <div className="form-section__bullet">
              <span className="ic">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 2 L11 5 L11 10 Q11 12 7 13 Q3 12 3 10 L3 5 Z"/><path d="M5 7 L7 9 L10 6"/></svg>
              </span>
              <span className="t">Образец до тиража · pre-production sample</span>
            </div>
            <div className="form-section__bullet">
              <span className="ic">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="10" height="8"/><path d="M4 5 L10 5 M4 7 L8 7"/></svg>
              </span>
              <span className="t">УПД, договор, маркировка WB/Ozon</span>
            </div>
          </div>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <h3>Заявка на расчёт</h3>
          {sent ? (
            <div style={{ padding: '40px 0 20px', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--yellow)', color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 14 L12 20 L22 8" stroke="currentColor" strokeWidth="2.5"/></svg>
              </div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 8 }}>
                ✓ Заявка принята!
              </div>
              <p style={{ color: 'var(--muted)', maxWidth: 360, margin: '0 auto', fontSize: 14 }}>
                Менеджер свяжется в течение часа в рабочее время.
              </p>
              <button type="button" onClick={() => setSent(false)}
                      className="btn btn--ghost-d" style={{ marginTop: 22 }}>
                Отправить ещё одну заявку
                <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div style={{ padding: '12px 16px', background: '#FFE6E0', color: '#9B2A12', borderRadius: 12, marginBottom: 12, fontSize: 13, fontWeight: 600 }}>
                  {error}
                </div>
              )}
              <div className="row">
                <div className="field"><label>Имя <span className="req">*</span></label><input type="text" name="name" placeholder="Как к вам обращаться" required /></div>
                <div className="field"><label>Телефон <span className="req">*</span></label><input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required /></div>
              </div>
              <div className="row">
                <div className="field"><label>Email</label><input type="email" name="email" placeholder="name@company.ru" /></div>
                <div className="field"><label>Компания</label><input type="text" name="company" placeholder="ООО «Название»" /></div>
              </div>
              <div className="row">
                <div className="field">
                  <label>Что нужно</label>
                  <select name="product" defaultValue=""><option value="" disabled>Выберите</option><option>Футболки</option><option>Худи</option><option>Свитшоты</option><option>Лонгсливы</option><option>Сумки</option><option>Welcome-набор</option><option>Другое</option></select>
                </div>
                <div className="field">
                  <label>Тираж</label>
                  <select name="quantity" defaultValue=""><option value="" disabled>Выберите</option><option>30–100 шт</option><option>100–300 шт</option><option>300–1000 шт</option><option>1000+ шт</option></select>
                </div>
              </div>
              <div className="row row--single">
                <div className="field"><label>Комментарий</label><textarea name="comment" placeholder="Опишите задачу: цвета, размеры, ТЗ…" rows="3"></textarea></div>
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
              {/* honeypot */}
              <input type="text" name="website" defaultValue="" tabIndex="-1" autoComplete="off"
                     style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }} />
              <div className="form__submit">
                <button type="submit" className="btn btn--yellow" disabled={loading}>
                  {loading ? 'Отправляем…' : 'Отправить заявку'}
                  <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
                </button>
                <span className="consent">
                  Нажимая, вы соглашаетесь с <a href="/privacy/">политикой обработки персональных данных</a>.
                </span>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

/* ---------- FOOTER ---------- */
const FooterV6 = () => (
  <footer className="footer section-spacer">
    <div>
      <h3>tee<span className="dot">on</span></h3>
      <p>Шьём корпоративную одежду и промо-мерч для бизнеса. Собственный цех, 9 методов нанесения, работа с юрлицами и доставка по всей России.</p>
      <div className="footer__messengers">
        <a href="https://t.me/teeon" aria-label="Telegram">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2.5 9.5 L17.5 3.5 L14.5 17.5 L11 12.5 L15 6 L8.5 12 L2.5 9.5 Z" fill="currentColor"/></svg>
        </a>
        <a href="https://wa.me/74950000000" aria-label="WhatsApp">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 17 L4 13 Q2 10 2.5 7 Q3 3 7 2 Q12 1 15 4 Q18 7 17 11 Q16 16 11 17 Q8 17.5 5 17 Z"/><path d="M7 7 Q7 11 11 13"/></svg>
        </a>
        <a href="mailto:hello@teeon.ru" aria-label="Email">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 6 L10 12 L18 6"/></svg>
        </a>
      </div>
      <a href="#request" className="footer__cta">
        Рассчитать заказ
        <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
      </a>
    </div>
    <div>
      <h5>Каталог</h5>
      <ul>
        <li><a href="category.html?slug=futbolki">Футболки</a></li>
        <li><a href="category.html?slug=hudi">Худи</a></li>
        <li><a href="category.html?slug=svitshoty">Свитшоты</a></li>
        <li><a href="category.html?slug=longslivy">Лонгсливы</a></li>
        <li><a href="category.html?slug=sumki">Сумки</a></li>
        <li><a href="category.html?slug=kurtki">Куртки</a></li>
        <li><a href="catalog.html">Все категории →</a></li>
      </ul>
    </div>
    <div>
      <h5>Брендирование</h5>
      <ul>
        <li><a href="/branding/embroidery/">Вышивка</a></li>
        <li><a href="/branding/silk/">Шелкография</a></li>
        <li><a href="/branding/dtf/">DTF</a></li>
        <li><a href="/branding/sublim/">Сублимация</a></li>
        <li><a href="/branding/deboss/">Тиснение</a></li>
        <li><a href="/branding/">Все методы →</a></li>
      </ul>
    </div>
    <div>
      <h5>Контакты</h5>
      <ul>
        <li>+7 (495) 000-00-00</li>
        <li>hello@teeon.ru</li>
        <li>Москва, ул. Промзона, 12</li>
        <li>Пн–Пт · 9:00–19:00</li>
        <li><a href="/about/">О нас</a></li>
        <li><a href="/portfolio/">Портфолио</a></li>
        <li><a href="/contacts/">Контакты</a></li>
        <li><a href="/souvenirs/">Сувениры</a></li>
      </ul>
    </div>
    <div className="footer__bottom">
      <div>© 2014–2026 TEEON — все права защищены</div>
      <div className="links">
        <a href="/privacy/">Политика ПД</a>
        <a href="/cookies/">Cookies</a>
        <a href="/details/">Реквизиты</a>
      </div>
    </div>
  </footer>
);

Object.assign(window, {
  HeaderV6, HeroV6, AdvantagesV6, AboutV6, CatalogV6, BrandingV6,
  WorkV6, PortfolioV6, ClientsV6, FAQV6, SeoV6, RequestV6, FooterV6,
});
