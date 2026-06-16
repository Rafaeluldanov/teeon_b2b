import styles from './WorkSteps.module.css';

const steps = [
  { n: '01', t: 'Заявка',             d: 'Форма или звонок — отвечаем в течение часа в рабочее время.', m: '⏱ 1 час',     active: false },
  { n: '02', t: 'Подбор решения',     d: 'Ткань, тираж, способы нанесения, дедлайн — обсуждаем.',       m: '⏱ до 1 дня', active: false },
  { n: '03', t: 'Расчёт',             d: 'Смета, варианты тканей, образцы методов нанесения.',           m: '⏱ 1–2 дня',  active: false },
  { n: '04', t: 'Макет и образец',    d: 'Дизайнер собирает макет, шьём pre-production sample.',         m: '⏱ 3–5 дней', active: true  },
  { n: '05', t: 'Производство',       d: 'Тираж в цехе с контролем ОТК на каждом этапе.',               m: '⏱ 7–14 дней',active: false },
  { n: '06', t: 'Упаковка, отгрузка', d: 'Индивидуальная упаковка, маркировка, отправка ТК.',            m: '⏱ 1 день',   active: false },
];

export default function WorkSteps() {
  return (
    <section id="how-we-work" className="section-spacer" aria-labelledby="steps-title">
      <div className="v6-section-head">
        <div>
          <div className="v6-kicker">(05) — Процесс</div>
          <h2 id="steps-title">Как мы<br /><em>производим тираж</em></h2>
        </div>
        <p>От первого звонка до отгрузки — шесть прозрачных шагов. Образец до тиража, статус заказа в реальном времени, контроль ОТК на трёх этапах.</p>
      </div>

      <ol className={styles.grid}>
        {steps.map((s) => (
          <li key={s.n} className={`${styles.step} ${s.active ? styles.active : ''}`}>
            <div className={styles.num}>{s.n}</div>
            <div className={styles.title}>{s.t}</div>
            <div className={styles.desc}>{s.d}</div>
            <div className={styles.time}>{s.m}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}
