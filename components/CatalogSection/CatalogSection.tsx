import Link from 'next/link';
import styles from './CatalogSection.module.css';
import { catalogCategories } from '@/lib/catalog';
import { collectCategoryImages } from '@/lib/catalogModels';
import { getMergedCatalogModels } from '@/lib/serverData';
import CatalogCategoryIcon from '@/components/CatalogCategoryIcon/CatalogCategoryIcon';
import SafeImg from '@/components/SafeImg/SafeImg';

const ArrowIc = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
);

type BgKey  = 'paper-2' | 'yellow' | 'blue' | 'mint' | 'coral' | 'ink';

const CAT_META: Record<string, { bg: BgKey; num: string }> = {
  futbolki:   { bg: 'paper-2', num: '01' },
  hudi:       { bg: 'yellow',  num: '02' },
  svitshoty:  { bg: 'paper-2', num: '03' },
  longslivy:  { bg: 'blue',    num: '04' },
  sumki:      { bg: 'mint',    num: '05' },
  zhiletki:   { bg: 'paper-2', num: '06' },
  kurtki:     { bg: 'ink',     num: '07' },
  dozhdeviki: { bg: 'coral',   num: '08' },
};

const BG_CLASS: Record<BgKey, string> = {
  'paper-2': styles['bg-paper2'],
  yellow:    styles['bg-yellow'],
  blue:      styles['bg-blue'],
  mint:      styles['bg-mint'],
  coral:     styles['bg-coral'],
  ink:       styles['bg-ink'],
};

export default async function CatalogSection() {
  // SSR-side merge с админ-дампом — иначе collectCategoryImages не найдёт
  // фотки, добавленные через админку, и сайт покажет фолбэк-иконки.
  const modelsData = await getMergedCatalogModels();
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
          const meta = CAT_META[cat.slug] ?? { bg: 'paper-2' as BgKey, num: '—' };
          const bgClass = BG_CLASS[meta.bg] ?? '';
          const imgs = collectCategoryImages(cat.slug, 4, modelsData);
          return (
            <li key={cat.slug} className={styles.card}>
              <div className={`${styles.media} ${imgs.length > 0 ? '' : bgClass}`}>
                <span className={styles.mediaNum}>{meta.num} /</span>
                <span className={styles.mediaPill}>✦ Брендирование</span>
                {imgs.length > 0 ? (
                  <div className={styles.mediaCollage} data-count={Math.min(imgs.length, 4)}>
                    {imgs.slice(0, 4).map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={src}
                        alt=""
                        className={styles.mediaCollageImg}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    ))}
                  </div>
                ) : (
                  <span className={styles.iconWrap} aria-hidden="true">
                    <CatalogCategoryIcon slug={cat.slug} className={styles.cardIconSvg} />
                  </span>
                )}
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
