import Link from 'next/link';
import styles from './CatalogSection.module.css';
import { catalogCategories } from '@/lib/catalog';

const ArrowIc = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
);

type CatKind = 'tee' | 'hoodie' | 'sweat' | 'longsleeve' | 'bag' | 'vest' | 'jacket' | 'raincoat';
type BgKey  = 'paper-2' | 'yellow' | 'blue' | 'mint' | 'coral' | 'ink';

const CAT_META: Record<string, { kind: CatKind; bg: BgKey; num: string }> = {
  futbolki:   { kind: 'tee',        bg: 'paper-2', num: '01' },
  hudi:       { kind: 'hoodie',     bg: 'yellow',  num: '02' },
  svitshoty:  { kind: 'sweat',      bg: 'paper-2', num: '03' },
  longslivy:  { kind: 'longsleeve', bg: 'blue',    num: '04' },
  sumki:      { kind: 'bag',        bg: 'mint',    num: '05' },
  zhiletki:   { kind: 'vest',       bg: 'paper-2', num: '06' },
  kurtki:     { kind: 'jacket',     bg: 'ink',     num: '07' },
  dozhdeviki: { kind: 'raincoat',   bg: 'coral',   num: '08' },
};

const BG_CLASS: Record<BgKey, string> = {
  'paper-2': styles['bg-paper2'],
  yellow:    styles['bg-yellow'],
  blue:      styles['bg-blue'],
  mint:      styles['bg-mint'],
  coral:     styles['bg-coral'],
  ink:       styles['bg-ink'],
};

function Silhouette({ kind, opacity = 0.45 }: { kind: CatKind; opacity?: number }) {
  return (
    <svg
      viewBox="0 0 200 240"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }}
      aria-hidden="true"
    >
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
}

export default function CatalogSection() {
  return (
    <section id="catalog" className="section-spacer" aria-labelledby="catalog-title">
      <div className="v6-section-head">
        <div>
          <div className="v6-kicker">(03) — Каталог</div>
          <h2 id="catalog-title">Каталог <span className="hl" style={{ background: 'var(--yellow)', color: 'var(--ink)', borderRadius: 8, padding: '0 10px' }}>промо-одежды</span></h2>
        </div>
        <p>8 базовых категорий — основа, на которую ложится любое брендирование. Любую позицию подгоняем под задачу: ткань, посадка, упаковка, фурнитура.</p>
      </div>

      <ul className={styles.grid}>
        {catalogCategories.map((cat) => {
          const meta = CAT_META[cat.slug] ?? { kind: 'tee' as CatKind, bg: 'paper-2' as BgKey, num: '—' };
          const bgClass = BG_CLASS[meta.bg] ?? '';
          const opacity = meta.bg === 'paper-2' ? 0.55 : 0.45;
          return (
            <li key={cat.slug} className={styles.card}>
              <div className={`${styles.media} ${bgClass}`}>
                <span className={styles.mediaNum}>{meta.num} /</span>
                <span className={styles.mediaPill}>✦ Брендирование</span>
                <Silhouette kind={meta.kind} opacity={opacity} />
              </div>
              <div className={styles.body}>
                <div className={styles.name}>{cat.name}</div>
                <div className={styles.desc}>{cat.shortDesc}</div>
                <div className={styles.actions}>
                  <Link href={`/catalog/${cat.slug}/`} className={styles.btn}>Подробнее</Link>
                  <a href="#request" className={styles.quote}>В расчёт →</a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.footer}>
        <Link href="/catalog/" className="v6-btn v6-btn--ink">
          Смотреть весь каталог
          <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
        </Link>
      </div>
    </section>
  );
}
