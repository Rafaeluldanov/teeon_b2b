import Link from 'next/link';
import styles from './About.module.css';

const ArrowIc = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
);

const PhotoSvg = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <rect x="8" y="20" width="64" height="44" rx="6" stroke="currentColor" strokeWidth="2"/>
    <circle cx="40" cy="42" r="12" stroke="currentColor" strokeWidth="2"/>
    <path d="M28 20 L32 12 L48 12 L52 20" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export default function About() {
  return (
    <section id="about" className="section-spacer" aria-labelledby="about-title">
      <div className="v6-section-head">
        <div>
          <div className="v6-kicker">(02) — О компании</div>
          <h2 id="about-title">Шьём с&nbsp;<em>нуля</em>,<br />а&nbsp;не закупаем</h2>
        </div>
        <p>
          Свой цех в Подмосковье — 24 швеи, своё нанесение, своя упаковка. Все этапы под одной крышей: лекало, раскрой, пошив, брендирование, отгрузка. Без посредников и потерь времени между подрядчиками.
        </p>
      </div>

      <div className={styles.bentogrid}>
        {/* Tile 1: yellow — main stat */}
        <div className={styles.tileYellow}>
          <div className="v6-kicker on-yellow">с 2014 года</div>
          <div className={styles.bigNum} style={{ marginTop: 14 }}>
            240<span className={styles.bigNumAccent}>+</span>
          </div>
          <div className={styles.tileLabel}>проектов в год</div>
          <p className={styles.tileText} style={{ marginTop: 12, maxWidth: 380 }}>
            От welcome-наборов IT-стартапов до тиражей в 1 200 шопперов для ритейл-сетей. Каждый заказ — один менеджер, один договор, одна площадка.
          </p>
          <div className={styles.tileActions}>
            <Link href="/about/" className="v6-btn v6-btn--ink">
              Подробнее <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
            </Link>
            <a href="#request" className="v6-btn v6-btn--ghost-d">
              Рассчитать <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
            </a>
          </div>
        </div>

        {/* Tile 2: photo placeholder */}
        <div className={styles.tilePhoto1} role="img" aria-label="Фото швейного цеха">
          <div className={styles.photoPlaceholder}>
            <PhotoSvg />
            <span className={styles.photoLabel}>Цех · Подмосковье</span>
          </div>
        </div>

        {/* Tile 3: 2 small stat tiles */}
        <div className={styles.tileCol3}>
          <div className={styles.tileSmall}>
            <div className="v6-kicker">Площадь</div>
            <div className={styles.bigNum} style={{ fontSize: 52, marginTop: 8 }}>
              600<span className={styles.bigNumCoral} style={{ fontSize: 20 }}>м²</span>
            </div>
            <div className="v6-kicker" style={{ marginTop: 'auto', paddingTop: 12 }}>производство + склад</div>
          </div>
          <div className={styles.tileInk}>
            <div className="v6-kicker on-dark">Команда</div>
            <div className={styles.bigNum} style={{ fontSize: 52, marginTop: 8 }}>
              24<span className={styles.bigNumYellow} style={{ fontSize: 18 }}>швеи</span>
            </div>
            <div className="v6-kicker on-dark" style={{ marginTop: 'auto', paddingTop: 12 }}>+ 6 чел. нанесение</div>
          </div>
        </div>

        {/* Row 2 */}
        <div className={styles.tileStats}>
          <div className="v6-kicker">За 11 лет</div>
          <div className={styles.bigNum} style={{ marginTop: 12, fontSize: 44 }}>≈ 320 000</div>
          <div className={styles.tileLabel} style={{ marginTop: 4 }}>единиц пошито</div>
          <p className={styles.tileText} style={{ marginTop: 'auto', paddingTop: 12 }}>
            от 30-шт. пилотов до 5 000-шт. сетевых партий
          </p>
        </div>

        <div className={styles.tilePhoto2} role="img" aria-label="Готовая партия">
          <div className={styles.photoPlaceholder}>
            <PhotoSvg />
            <span className={styles.photoLabel}>Готовая партия</span>
          </div>
        </div>

        <div className={styles.tileBlue}>
          <div className="v6-kicker on-dark">Документы</div>
          <div className={styles.bigNum} style={{ marginTop: 12, fontSize: 36 }}>
            УПД,<br />договор,<br />отсрочка
          </div>
          <p className={styles.tileText} style={{ marginTop: 'auto', paddingTop: 12, opacity: 0.8 }}>
            работаем с юрлицами, маркировка для WB/Ozon
          </p>
        </div>
      </div>
    </section>
  );
}
