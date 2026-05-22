import styles from './Advantages.module.css';

const ADV_ICON_P = { width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 1.7 };

const items = [
  {
    num: '01', bg: '',
    title: 'Пошив\nпод задачу',
    desc: 'Свои лекала, ткани от поставщиков-партнёров, любые посадки.',
    icon: <svg {...ADV_ICON_P} viewBox="0 0 22 22"><path d="M5 9 L8 6 L9 7 Q11 8 13 7 L14 6 L17 9 L15 12 L13 11 L13 17 L9 17 L9 11 L7 12 Z"/></svg>,
  },
  {
    num: '02', bg: 'yellow',
    title: 'Брендирование\nвнутри цеха',
    desc: 'Один цех, минус неделя на логистике между подрядчиками.',
    icon: <svg {...ADV_ICON_P} viewBox="0 0 22 22"><circle cx="11" cy="11" r="6"/><path d="M8 11 L10 13 L14 9"/></svg>,
  },
  {
    num: '03', bg: '',
    title: 'Контроль\nкачества',
    desc: 'Образец до тиража, ОТК на трёх этапах, замена за наш счёт.',
    icon: <svg {...ADV_ICON_P} viewBox="0 0 22 22"><path d="M11 3 L17 5 L17 10 Q17 15 11 18 Q5 15 5 10 L5 5 Z"/><path d="M8 11 L10 13 L14 9"/></svg>,
  },
  {
    num: '04', bg: 'blue',
    title: 'Доставка\nпо России',
    desc: 'Любая ТК, маркировка для WB/Ozon, отгрузка партиями.',
    icon: <svg {...ADV_ICON_P} viewBox="0 0 22 22"><rect x="3" y="8" width="11" height="7"/><path d="M14 10 L18 10 L19 12 L19 15 L14 15"/><circle cx="7" cy="16" r="1.5"/><circle cx="17" cy="16" r="1.5"/></svg>,
  },
];

export default function Advantages() {
  return (
    <section className="section-spacer" aria-label="Преимущества">
      <ul className={styles.grid}>
        {items.map((a) => (
          <li key={a.num} className={`${styles.card} ${a.bg ? styles[a.bg as keyof typeof styles] : ''}`}>
            <div className={styles.head}>
              <span className={styles.num}>{a.num} /</span>
              <span className={styles.icon} aria-hidden="true">{a.icon}</span>
            </div>
            <div className={styles.title}>{a.title}</div>
            <div className={styles.desc}>{a.desc}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
