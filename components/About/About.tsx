import Link from 'next/link';
import styles from './About.module.css';

const ArrowIc = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
);

export default function About() {
  return (
    <section id="about" className="section-spacer" aria-labelledby="about-title">
      <div className="v6-section-head">
        <div>
          <div className="v6-kicker">(02) — О компании</div>
          <h2 id="about-title">Производим в&nbsp;<em>Москве</em>,<br />полный цикл под&nbsp;ключ</h2>
        </div>
        <p>
          Собственное производство 1000 м² в Москве с 2018 года: швейный цех на 50 промышленных машин Juki и 15+ станков по персонализации. Идея → дизайн → персонализация → пошив → упаковка → поставка — всё внутри одной производственной площадки.
        </p>
      </div>

      <div className={styles.bentogrid}>
        {/* Tile 1: yellow — main stat */}
        <div className={styles.tileYellow}>
          <div className="v6-kicker on-yellow">с 2018 года</div>
          <div className={styles.bigNum} style={{ marginTop: 14 }}>
            3000<span className={styles.bigNumAccent}>+</span>
          </div>
          <div className={styles.tileLabel}>реализованных кейсов</div>
          <p className={styles.tileText} style={{ marginTop: 12, maxWidth: 380 }}>
            От подарочных наборов госструктур и брендированной формы СИБУР до welcome-паков агросектора. Каждый проект — один менеджер, один договор, одна площадка.
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

        {/* Tile 2: 2 small stat tiles */}
        <div className={styles.tileCol3}>
          <div className={styles.tileSmall}>
            <div className="v6-kicker">Площадь</div>
            <div className={styles.bigNum} style={{ fontSize: 52, marginTop: 8 }}>
              1000<span className={styles.bigNumCoral} style={{ fontSize: 20 }}>м²</span>
            </div>
            <div className="v6-kicker" style={{ marginTop: 'auto', paddingTop: 12 }}>производство + склад 300 м²</div>
          </div>
          <div className={styles.tileInk}>
            <div className="v6-kicker on-dark">Швейный цех</div>
            <div className={styles.bigNum} style={{ fontSize: 52, marginTop: 8 }}>
              50<span className={styles.bigNumYellow} style={{ fontSize: 18 }}>Juki</span>
            </div>
            <div className="v6-kicker on-dark" style={{ marginTop: 'auto', paddingTop: 12 }}>+ 15 станков персонализации</div>
          </div>
        </div>

        {/* Row 2 */}
        <div className={styles.tileStats}>
          <div className="v6-kicker">Мощность</div>
          <div className={styles.bigNum} style={{ marginTop: 12, fontSize: 44 }}>150 000</div>
          <div className={styles.tileLabel} style={{ marginTop: 4 }}>изделий в месяц</div>
          <p className={styles.tileText} style={{ marginTop: 'auto', paddingTop: 12 }}>
            от единичных образцов до крупных тиражей — любой уровень сложности
          </p>
        </div>

        <div className={styles.tilePhoto2} role="img" aria-label="Готовая партия">
          <div className={styles.photoPlaceholder}>
            <PhotoSvg />
            <span className={styles.photoLabel}>Готовая партия</span>
          </div>
        </div>

        <div className={styles.tileBlue}>
          <div className="v6-kicker on-dark">Клиенты</div>
          <div className={styles.bigNum} style={{ marginTop: 12, fontSize: 36 }}>
            300+<br />компаний<br />с 2018
          </div>
          <p className={styles.tileText} style={{ marginTop: 'auto', paddingTop: 12, opacity: 0.8 }}>
            СИБУР, Россети, Юнармия, Агрорус и Ко, Уголь-Транс и др.
          </p>
        </div>
      </div>
    </section>
  );
}
