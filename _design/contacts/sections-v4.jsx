/* V4 — brand-book moodboard sections */

const { MarkV4, Logotype, Photo } = window;

/* ---------- NAV ---------- */
const NavV4 = () => (
  <nav className="nav">
    <a href="#" className="nav__logo">
      <Logotype size={28} />
    </a>
    <ul className="nav__links">
      <li><a href="#about">О нас</a></li>
      <li><a href="#catalog">Каталог</a></li>
      <li><a href="#branding">Нанесение</a></li>
      <li><a href="#portfolio">Кейсы</a></li>
      <li><a href="#how-we-work">Процесс</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
    <a href="#request" className="nav__cta">
      Рассчитать
      <span className="ic">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
      </span>
    </a>
  </nav>
);

/* ---------- HERO MOODBOARD ---------- */
const HeroV4 = () => (
  <section className="hero">
    {/* TOP ROW — 4 cards (last spans 2 rows) */}
    <div className="t-photo col-3">
      <div className="t-photo__bg t-photo__bg--moody"></div>
      <span className="t-photo__chip">Цех · 2026</span>
      <span className="t-photo__lbl">Худи · образец</span>
    </div>

    <div className="t-construct col-3">
      <div className="t-construct__lines"></div>
      <div className="t-construct__mark">
        <MarkV4 size={220} color="var(--paper)" />
      </div>
      <span className="t-construct__lbl">Бренд-марка · 01</span>
    </div>

    <div className="t-phone col-3">
      <div className="t-phone__bezel">
        <span className="t-phone__notch"></span>
        <div className="t-phone__status">
          <span>9:41</span>
          <span>● ● ●</span>
        </div>
        <div className="t-phone__icons">
          <span className="icon ours"><MarkV4 size={28} color="var(--ink)" /></span>
          <span className="icon cal">MON<b>6</b></span>
          <span className="icon pic"></span>
          <span className="icon cam">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="6" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="11" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>
          </span>
        </div>
        <div className="t-phone__lblrow">
          <span>МЦ</span>
          <span>Кал.</span>
          <span>Фото</span>
          <span>Кам.</span>
        </div>
      </div>
      <span className="t-phone__caption">Бренд-iD · digital</span>
    </div>

    <div className="t-tote col-3 row-2">
      <div className="t-tote__bg"></div>
      <div className="t-tote__bag">
        <div className="bag">
          <div className="slogan">
            ВСЁ<br />
            <em>ЛЕЖИТ</em><br />
            НА НАС
          </div>
          <div className="bagmark">
            <MarkV4 size={56} color="var(--paper)" />
          </div>
        </div>
      </div>
    </div>

    {/* MID ROW — big hero card */}
    <div className="t-hero col-9">
      <span className="t-hero__since">с 2014 · Москва</span>
      <span className="t-hero__b2b">B2B · мерч под ключ</span>
      <div className="t-hero__brand">
        <MarkV4 size={92} color="var(--ink)" />
        <span className="t-hero__wm">мерч<span className="dot">.</span>цех</span>
      </div>
      <p className="t-hero__strap">
        Шьём промо-одежду и корпоративный мерч в собственном цехе. <strong>9 методов нанесения, образец до тиража, тираж от 30 шт.</strong> — без посредников.
      </p>
      <div className="t-hero__cta">
        <a href="#request" className="btn btn--ink">
          Рассчитать стоимость
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
        <a href="#catalog" className="btn btn--ghost">
          Смотреть каталог
          <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7 L11 7 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.7"/></svg></span>
        </a>
      </div>
    </div>

    {/* BOTTOM ROW — brand-book details */}
    <div className="t-type col-3">
      <div className="t-type__name">
        Manrope<br /><span style={{ color: 'var(--muted)', fontWeight: 500 }}>ExtraBold · Sans</span>
      </div>
      <div className="t-type__swatches">
        <span className="sw sw--ink"></span>
        <span className="sw sw--blue"></span>
        <span className="sw sw--yellow"></span>
        <span className="sw sw--paper"></span>
      </div>
    </div>

    <div className="t-icons col-3">
      <span className="ic">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 19 L19 19 M13 4 Q7 4 7 10 L7 15 L5 18 L21 18 L19 15 L19 10 Q19 4 13 4 Z"/></svg>
      </span>
      <span className="ic active">
        <MarkV4 size={34} color="var(--ink)" />
        <span className="badge">2</span>
      </span>
      <span className="ic">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9 L20 9 M8 3 L8 7 M16 3 L16 7 M9 13 L11 15 L15 11"/></svg>
      </span>
    </div>

    <div className="t-search col-3">
      <div className="t-search__field">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="9" r="6"/><path d="M13.5 13.5 L17 17"/></svg>
        <span>мерч-цех.рф</span>
      </div>
    </div>

    <div className="t-cta col-3">
      <div className="t-cta__t">
        Заявка<br />за 1 час
      </div>
      <a href="#request" className="t-cta__btn">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 17 L17 5 M8 5 L17 5 L17 14" stroke="currentColor" strokeWidth="2"/></svg>
      </a>
    </div>
  </section>
);

/* ---------- ADVANTAGES ---------- */
const advV4 = [
  { n: '01', t: 'Свой швейный\nцех',     d: '24 швеи, 600 м², полный цикл от лекала до упаковки.', bg: '' },
  { n: '02', t: 'Брендирование\nна площадке', d: 'Цех нанесения соседствует с пошивом — минус неделя.',  bg: 'dark' },
  { n: '03', t: 'Образец\nдо тиража',    d: 'Pre-production sample, замена брака за наш счёт.',     bg: 'yellow' },
  { n: '04', t: 'Документы\nи доставка', d: 'УПД, договор, маркировка для WB/Ozon, ТК на выбор.',  bg: '' },
];

const Ico = ({ n }) => {
  const p = { width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 1.7 };
  if (n === '01') return <svg {...p} viewBox="0 0 22 22"><path d="M5 9 L8 6 L9 7 Q11 8 13 7 L14 6 L17 9 L15 12 L13 11 L13 17 L9 17 L9 11 L7 12 Z"/></svg>;
  if (n === '02') return <svg {...p} viewBox="0 0 22 22"><circle cx="11" cy="11" r="6"/><path d="M8 11 L10 13 L14 9"/></svg>;
  if (n === '03') return <svg {...p} viewBox="0 0 22 22"><path d="M11 3 L17 5 L17 10 Q17 15 11 18 Q5 15 5 10 L5 5 Z"/><path d="M8 11 L10 13 L14 9"/></svg>;
  return <svg {...p} viewBox="0 0 22 22"><rect x="3" y="8" width="11" height="7"/><path d="M14 10 L18 10 L19 12 L19 15 L14 15"/><circle cx="7" cy="16" r="1.5"/><circle cx="17" cy="16" r="1.5"/></svg>;
};

const AdvantagesV4 = () => (
  <section className="adv-grid">
    {advV4.map(a => (
      <div className={`adv ${a.bg}`} key={a.n}>
        <div className="adv__head">
          <span className="adv__num">{a.n} /</span>
          <span className="adv__ic"><Ico n={a.n} /></span>
        </div>
        <div className="adv__t">{a.t}</div>
        <div className="adv__d">{a.d}</div>
      </div>
    ))}
  </section>
);

/* ---------- ABOUT ---------- */
const AboutV4 = () => (
  <section id="about">
    <div className="section-head">
      <div>
        <div className="kicker">(02) — О производстве</div>
        <h2>Шьём с&nbsp;<em>нуля</em>,<br />а не закупаем</h2>
      </div>
      <p>Свой цех в Подмосковье — 24 швеи, своё нанесение, своя упаковка. Все этапы под одной крышей.</p>
    </div>

    <div className="bento">
      <div className="tile col-5" style={{ minHeight: 380 }}>
        <div className="kicker">с 2014 года</div>
        <h2 style={{ marginTop: 14 }}>240<span style={{ color: 'var(--blue)' }}>+</span></h2>
        <h3 style={{ marginTop: 8, fontWeight: 600, fontFamily: 'var(--display)' }}>проектов в год</h3>
        <p style={{ marginTop: 14, maxWidth: 420 }}>
          От welcome-наборов IT-стартапов до тиражей в 1 200 шопперов для ритейл-сетей. Каждый заказ — один менеджер, один договор, одна площадка.
        </p>
        <div style={{ marginTop: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 22 }}>
          {['УПД', 'Договор', 'Отсрочка', 'Маркировка'].map(t => (
            <span key={t} style={{ padding: '7px 12px', background: 'var(--bg-2)', borderRadius: 999, fontWeight: 600, fontSize: 11.5, letterSpacing: '0.04em' }}>{t}</span>
          ))}
        </div>
      </div>

      <div className="tile photo col-4" style={{ minHeight: 380 }}>
        <Photo tint="sand" kind="person" num="01/" label="Цех · Подмосковье" />
      </div>

      <div className="col-3" style={{ display: 'grid', gap: 12 }}>
        <div className="tile dark" style={{ minHeight: 184 }}>
          <div className="kicker" style={{ color: '#b4b6bd' }}>Площадь</div>
          <div className="big" style={{ marginTop: 10 }}>600<span style={{ fontSize: 24, color: 'var(--yellow)', marginLeft: 4 }}>м²</span></div>
          <div className="kicker" style={{ color: '#b4b6bd', marginTop: 'auto' }}>производство + склад</div>
        </div>
        <div className="tile yellow" style={{ minHeight: 184 }}>
          <div className="kicker" style={{ color: 'var(--ink)' }}>Команда</div>
          <div className="big" style={{ marginTop: 10 }}>24<span style={{ fontSize: 24, color: 'var(--blue)', marginLeft: 4 }}>швеи</span></div>
          <div className="kicker" style={{ color: 'var(--ink)', marginTop: 'auto' }}>+ 6 чел. нанесение</div>
        </div>
      </div>

      <div className="tile col-6" style={{ minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div className="kicker">за 11 лет</div>
        <div>
          <h2 style={{ fontSize: 56 }}>≈ 320 000 единиц</h2>
          <p style={{ marginTop: 12 }}>пошито и отгружено клиентам · от 30-шт. пилотов до 5 000-шт. сетевых партий</p>
        </div>
      </div>

      <div className="tile photo col-6" style={{ minHeight: 220 }}>
        <Photo tint="steel" kind="hoodie" num="02/" label="Готовая партия · отгрузка" />
      </div>
    </div>
  </section>
);

/* ---------- CATALOG ---------- */
const catV4 = [
  { slug: 'futbolki',  num: '01', name: 'Футболки',  desc: 'Хлопок 160–220 г/м², от 30 шт.',     kind: 'tee',        bg: 'cream' },
  { slug: 'hudi',      num: '02', name: 'Худи',      desc: 'Двунитка/трёхнитка с начёсом.',     kind: 'hoodie',     bg: 'dark' },
  { slug: 'svitshoty', num: '03', name: 'Свитшоты',  desc: 'Без капюшона, плотность 280–340.',  kind: 'sweat',      bg: 'yellow' },
  { slug: 'longslivy', num: '04', name: 'Лонгсливы', desc: 'Слим и oversize, длинный рукав.',    kind: 'longsleeve', bg: 'cream' },
  { slug: 'sumki',     num: '05', name: 'Сумки',     desc: 'Шопперы и рюкзаки, бязь и оксфорд.', kind: 'bag',        bg: 'blue' },
  { slug: 'zhiletki',  num: '06', name: 'Жилетки',   desc: 'Утеплённые и сетчатые, под печать.', kind: 'vest',       bg: 'cream' },
  { slug: 'kurtki',    num: '07', name: 'Куртки',    desc: 'Софтшелл, ветровки, утеплённые.',    kind: 'jacket',     bg: 'dark' },
  { slug: 'dozhdeviki',num: '08', name: 'Дождевики', desc: 'PVC и нейлон, с капюшоном.',         kind: 'raincoat',   bg: 'yellow' },
];

const renderSilhouette = (kind, opacity = 0.5) => (
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

const CatalogV4 = () => (
  <section id="catalog">
    <div className="section-head">
      <div>
        <div className="kicker">(03) — Каталог</div>
        <h2>Каталог <span className="hl">промо-одежды</span></h2>
      </div>
      <p>8 базовых категорий — основа, на которую ложится любое брендирование. Любую позицию подгоняем под задачу.</p>
    </div>

    <div className="cat-grid">
      {catV4.map(c => (
        <article className="cat" key={c.slug}>
          <div className={`cat__media ${c.bg}`}>
            <span className="cat__num">{c.num} /</span>
            <span className="cat__pill">Брендирование</span>
            {renderSilhouette(c.kind, c.bg === 'cream' ? 0.55 : 0.45)}
          </div>
          <div className="cat__body">
            <div className="cat__name">{c.name}</div>
            <div className="cat__desc">{c.desc}</div>
            <div className="cat__row">
              <a href={`/catalog/${c.slug}/`} className="cat__btn">Подробнее</a>
              <a href="#request" className="cat__plus" aria-label="В расчёт">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3 L8 13 M3 8 L13 8" stroke="currentColor" strokeWidth="2"/></svg>
              </a>
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

/* ---------- BRANDING ---------- */
const brV4 = [
  { slug: 'embroidery',  num: '01', t: 'Вышивка',     d: 'Объёмная фактура, износостойко.',          tags: ['до 12 цв.', 'от 30 шт'], bg: '' },
  { slug: 'silk',        num: '02', t: 'Шелкография', d: 'Стойкая печать большими тиражами.',        tags: ['до 8 цв.', 'от 50'],     bg: 'yellow' },
  { slug: 'dtf',         num: '03', t: 'DTF',         d: 'Полноцветная плёнка, фото и детали.',     tags: ['CMYK+W', 'от 1 шт'],     bg: 'dark' },
  { slug: 'dtg',         num: '04', t: 'DTG',         d: 'Прямая печать по ткани, фото-кач.',        tags: ['от 1 шт', 'all-over'],   bg: '' },
  { slug: 'sublim',      num: '05', t: 'Сублимация',  d: 'Полноцвет по всей поверхности синтетики.', tags: ['100% PE', 'all-over'],   bg: 'blue' },
  { slug: 'chevrons',    num: '06', t: 'Шевроны',     d: 'Нашивки с пришивкой или на липучке.',     tags: ['ПВХ/ткань', 'от 50'],    bg: '' },
  { slug: 'deboss',      num: '07', t: 'Тиснение',    d: 'Сухое и фольгированное по коже.',          tags: ['фольга', 'клише'],       bg: 'yellow' },
  { slug: 'laser',       num: '08', t: 'Гравировка',  d: 'Лазер по металлу, дереву, коже.',          tags: ['от 1 шт', 'без краски'], bg: 'dark' },
  { slug: 'labels',      num: '09', t: 'Бирки',       d: 'Тканые, кожаные, бумажные — финал.',       tags: ['жаккард', 'крой'],       bg: '' },
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

const BrandingV4 = () => (
  <section id="branding">
    <div className="section-head">
      <div>
        <div className="kicker">(04) — Нанесение</div>
        <h2>9 способов <em>персонализации</em></h2>
      </div>
      <p>Подбираем технологию под ткань, тираж и бюджет — от вышивки на корпоративных поло до полноцветной DTF на промо-футболках.</p>
    </div>

    <div className="brand-grid">
      {brV4.map(b => (
        <a className={`brand ${b.bg}`} key={b.slug} href={`/branding/${b.slug}/`}>
          <div className="brand__head">
            <span className="brand__ic"><BrIco slug={b.slug} /></span>
            <span className="brand__num">{b.num}</span>
          </div>
          <div className="brand__t">{b.t}</div>
          <div className="brand__d">{b.d}</div>
          <div className="brand__tags">
            {b.tags.map(t => <span className="brand__tag" key={t}>{t}</span>)}
          </div>
        </a>
      ))}
    </div>
  </section>
);

/* ---------- WORK STEPS ---------- */
const stV4 = [
  { n: '01', t: 'Заявка',          d: 'Форма или звонок — ответим за 1 час.',                 m: '1 час' },
  { n: '02', t: 'Подбор',          d: 'Ткань, тираж, способы нанесения, дедлайн.',            m: 'до 1 дня' },
  { n: '03', t: 'Расчёт',          d: 'Смета, варианты тканей, образцы методов.',             m: '1–2 дня' },
  { n: '04', t: 'Макет и образец', d: 'Дизайнер собирает макет, шьём pre-production sample.', m: '3–5 дней', active: true },
  { n: '05', t: 'Производство',    d: 'Тираж в цехе, контроль ОТК на каждом этапе.',          m: '7–14 дней' },
  { n: '06', t: 'Отгрузка',        d: 'Индивидуальная упаковка, маркировка, отправка ТК.',    m: '1 день' },
];

const WorkV4 = () => (
  <section id="how-we-work">
    <div className="section-head">
      <div>
        <div className="kicker">(05) — Процесс</div>
        <h2>Шесть шагов<br /><em>до отгрузки</em></h2>
      </div>
      <p>От первого звонка до отгрузки — прозрачный процесс. Образец до тиража, статус заказа в реальном времени, контроль ОТК на трёх этапах.</p>
    </div>

    <div className="steps-grid">
      {stV4.map(s => (
        <div className={`step ${s.active ? 'active' : ''}`} key={s.n}>
          <div className="step__num">{s.n}</div>
          <div className="step__t">{s.t}</div>
          <div className="step__d">{s.d}</div>
          <div className="step__time">⏱ {s.m}</div>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- PORTFOLIO ---------- */
const ptV4 = [
  { slug: 'it-startup',  type: 'IT-компания',     t: 'Welcome-кит для онбординга',         task: 'Welcome-набор', ed: '320 шт',   tech: 'Вышивка + DTF',  term: '12 дней', date: '14.05.26', kind: 'hoodie',     bg: 'cream' },
  { slug: 'event',       type: 'Event-агентство', t: 'Форма для open-air фестиваля',       task: 'Худи и кепки',  ed: '180 шт',   tech: 'Шелкография',    term: '9 дней',  date: '02.05.26', kind: 'cap',        bg: 'yellow' },
  { slug: 'sport',       type: 'Спорт-клуб',      t: 'Форма для любительской лиги',        task: 'Игровая',       ed: '90 комп.', tech: 'Сублимация',     term: '14 дней', date: '21.04.26', kind: 'tee',        bg: 'dark' },
  { slug: 'restaurant',  type: 'Ресторан',        t: 'Униформа зала с вышивкой логотипа',  task: 'Рубашки',       ed: '60 шт',    tech: 'Вышивка',        term: '11 дней', date: '12.04.26', kind: 'longsleeve', bg: 'cream' },
  { slug: 'retail',      type: 'Ритейл-сеть',     t: 'Шопперы к запуску коллекции',        task: 'Шопперы',       ed: '1 200 шт', tech: 'Шелкография',    term: '18 дней', date: '28.03.26', kind: 'bag',        bg: 'blue' },
  { slug: 'coffee',      type: 'Кофейня',         t: 'Фартуки и футболки барист',          task: 'Униформа',      ed: '45 шт',    tech: 'Вышивка',        term: '8 дней',  date: '15.03.26', kind: 'vest',       bg: 'cream' },
];

const PortfolioV4 = () => (
  <section id="portfolio">
    <div className="section-head">
      <div>
        <div className="kicker">(06) — Кейсы</div>
        <h2>240<em>+</em> проектов<br />в&nbsp;<span className="hl">деле</span></h2>
      </div>
      <p>Шесть из последних кейсов: от welcome-наборов для IT до тиражей в 1 200 шопперов для ритейл-сети. Каждый — с задачей, цифрами и сроками.</p>
    </div>

    <div className="case-grid">
      {ptV4.map(c => (
        <article className="case" key={c.slug}>
          <div className={`case__media ${c.bg}`}>
            <span className="case__chip">{c.type}</span>
            <span className="case__date">{c.date}</span>
            {renderSilhouette(c.kind, 0.55)}
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
              <a href={`/portfolio/${c.slug}/`} className="cat__btn">Кейс</a>
              <a href="#request" style={{ color: 'var(--blue)', fontWeight: 700, fontSize: 12.5, letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap', marginLeft: 'auto' }}>
                Рассчитать похожий →
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

/* ---------- CLIENTS ---------- */
const clV4 = [
  { mark: 'IT', n: 'IT-компания',         tp: 'SaaS · 200+ сотр.',     bg: '' },
  { mark: 'EV', n: 'Event-агентство',     tp: 'Фестивали, форумы',     bg: 'yellow' },
  { mark: 'PR', n: 'Производство',        tp: 'Промышленное',          bg: '' },
  { mark: 'SP', n: 'Спортивный клуб',     tp: 'Любительская лига',     bg: 'dark' },
  { mark: 'RS', n: 'Ресторан',            tp: 'HoReCa · 4 точки',      bg: '' },
  { mark: 'CF', n: 'Кофейня',             tp: 'Сеть, 12 точек',        bg: 'blue' },
  { mark: 'RT', n: 'Ритейл-сеть',         tp: 'Fashion · 30+ маг.',    bg: '' },
  { mark: 'MA', n: 'Маркетинг-агент.',    tp: 'B2B-промо',             bg: 'yellow' },
];

const ClientsV4 = () => (
  <section id="clients">
    <div className="section-head">
      <div>
        <div className="kicker">(07) — Клиенты</div>
        <h2>Нам доверяют <em>компании</em></h2>
      </div>
      <p>От стартапов до сетевого ритейла. Логотипы под NDA — покажем по запросу под договор.</p>
    </div>

    <div className="clients-grid">
      {clV4.map(c => (
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

/* ---------- FAQ ---------- */
const fqV4 = [
  { q: 'Какой минимальный тираж?', a: 'От 30 шт. на одну позицию. На некоторые ткани — от 50 шт. На DTF и DTG возможен заказ от 1 единицы для образца или подарка.' },
  { q: 'Можно увидеть образец до тиража?', a: 'Да — pre-production sample шьём и согласовываем до запуска основной партии. Это 3–5 рабочих дней. Стоимость образца входит в смету при тираже от 100 шт.' },
  { q: 'Сколько занимает производство?', a: 'Стандарт — 10–14 дней с момента согласования макета и образца. Срочные партии до 100 шт. — 5–7 дней с доплатой за приоритет.' },
  { q: 'Какие способы брендирования вы используете?', a: '9 методов: вышивка, шевроны, шелкография, DTF, DTG, сублимация, тиснение, лазерная гравировка, тканые бирки.' },
  { q: 'Работаете ли с юрлицами?', a: 'Да — договор, счёт, акт, УПД, маркировка для WB/Ozon. При повторных заказах — отсрочка платежа до 14 дней.' },
  { q: 'Как происходит доставка?', a: 'По Москве — собственный курьер или СДЭК. По России — ТК на выбор (Деловые Линии, Байкал, ПЭК, СДЭК). При необходимости — маркировка для маркетплейсов.' },
];

const FAQV4 = () => {
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
        {fqV4.map((f, i) => (
          <div className={`qa ${open === i ? 'open' : ''}`} key={i}>
            <button className="qa__btn" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="qa__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="qa__q">{f.q}</span>
              <span className="qa__t">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2 L8 14 M2 8 L14 8" stroke="currentColor" strokeWidth="1.8"/></svg>
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
const SeoV4 = () => (
  <section className="seo">
    <div>
      <div className="kicker" style={{ marginBottom: 16 }}>(09) — Подробнее</div>
      <h3>Промо-одежда и&nbsp;корпоративный мерч под&nbsp;ключ</h3>
    </div>
    <div>
      <p>Производим корпоративную одежду и промо-мерч для бизнеса в собственном швейном цехе. Шьём футболки, худи, свитшоты, лонгсливы, поло, ветровки, дождевики, жилеты и сумки — с любой плотностью ткани и под любую посадку.</p>
      <p>Брендируем 9 способами: вышивка, шевроны, шелкография, DTF, DTG, сублимация, тиснение, лазерная гравировка и тканые бирки. Все этапы — от лекала и раскроя до нанесения и упаковки — проходят на одной площадке. Работаем с юрлицами по полному пакету документов и доставляем по всей России.</p>
    </div>
  </section>
);

/* ---------- REQUEST FORM ---------- */
const RequestV4 = () => {
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
          <h3>4 шага<br />до <em>образца</em></h3>
          <p>От первого касания до согласованного pre-production sample — без долгих переписок.</p>
          <div className="bullets">
            {[
              { n: '01', t: 'Отвечаем за 1 час',          d: 'В будни 9:00–19:00 — со сметой и сроками.' },
              { n: '02', t: 'Считаем 2–3 варианта',        d: 'Разный бюджет, ткани, методы нанесения.' },
              { n: '03', t: 'Шьём образец до тиража',      d: 'Pre-production sample на согласование.' },
              { n: '04', t: 'Полный пакет документов',     d: 'Договор, счёт, акт, УПД, маркировка.' },
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
              <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'var(--yellow)', color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <svg width="32" height="32" viewBox="0 0 28 28" fill="none"><path d="M6 14 L12 20 L22 8" stroke="currentColor" strokeWidth="2.5"/></svg>
              </div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 10 }}>
                Заявка принята
              </div>
              <p style={{ color: 'var(--muted)', maxWidth: 360, margin: '0 auto', fontSize: 14.5 }}>
                Менеджер свяжется в течение часа в рабочее время. Хорошего дня!
              </p>
            </div>
          ) : (
            <>
              <div className="row">
                <div className="field"><label>ФИО <span className="req">*</span></label><input type="text" placeholder="Как к вам обращаться" required /></div>
                <div className="field"><label>Компания</label><input type="text" placeholder="ООО «Название»" /></div>
              </div>
              <div className="row">
                <div className="field"><label>Телефон <span className="req">*</span></label><input type="tel" placeholder="+7 (___) ___-__-__" required /></div>
                <div className="field"><label>Email</label><input type="email" placeholder="name@company.ru" /></div>
              </div>
              <div className="row">
                <div className="field"><label>Способ связи</label><select defaultValue=""><option value="" disabled>Выберите</option><option>Звонок</option><option>Telegram</option><option>WhatsApp</option><option>Email</option></select></div>
                <div className="field"><label>Тираж</label><select defaultValue=""><option value="" disabled>Выберите</option><option>30–100 шт</option><option>100–300 шт</option><option>300–1000 шт</option><option>1000+ шт</option></select></div>
              </div>
              <div className="row">
                <div className="field"><label>Что нужно <span className="req">*</span></label><select defaultValue="" required><option value="" disabled>Выберите</option><option>Футболки</option><option>Худи</option><option>Свитшоты</option><option>Сумки</option><option>Welcome-набор</option><option>Другое</option></select></div>
                <div className="field"><label>Срок</label><select defaultValue=""><option value="" disabled>Выберите</option><option>Стандарт (10–14 дней)</option><option>Срочно (5–7 дней)</option><option>Гибкий</option></select></div>
              </div>
              <div className="row row--single">
                <div className="field"><label>Комментарий</label><textarea placeholder="Опишите задачу: цвета, размеры, ТЗ…" rows="3"></textarea></div>
              </div>
              <div className="row row--single">
                <label className="file">
                  <span className="file__icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M14 3 L4 13 Q1 16 4 19 Q7 22 10 19 L19 10 Q21 8 19 6 Q17 4 15 6 L8 13" stroke="currentColor" strokeWidth="1.5"/></svg></span>
                  <span>Прикрепить файл — логотип, ТЗ, макет (до 10 МБ)</span>
                  <input type="file" hidden />
                </label>
              </div>
              <div className="form__submit">
                <button type="submit" className="btn btn--yellow">
                  Отправить заявку
                  <span className="ic"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg></span>
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

/* ---------- STRIP ---------- */
const StripV4 = () => {
  const items = ['Свой цех', 'образец до тиража', '9 методов нанесения', 'тираж от 30 шт', 'работа с юрлицами', 'доставка по РФ'];
  const loop = [...items, ...items, ...items];
  return (
    <div className="strip">
      <div className="strip__track">
        {loop.map((t, i) => (
          <React.Fragment key={i}>
            <span className={i % 2 ? 'accent' : ''}>{t}</span>
            <span className="star">
              <MarkV4 size={28} color="var(--yellow)" />
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

/* ---------- FOOTER ---------- */
const FooterV4 = () => (
  <footer className="footer">
    <div>
      <h3>мерч<span className="dot">.</span>цех</h3>
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
  NavV4, HeroV4, AdvantagesV4, AboutV4, CatalogV4, BrandingV4,
  WorkV4, PortfolioV4, ClientsV4, FAQV4, SeoV4, RequestV4, StripV4, FooterV4,
});
