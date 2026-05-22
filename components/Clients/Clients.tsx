import styles from './Clients.module.css';

const clients = [
  { mark: 'IT', name: 'IT-компания',        type: 'SaaS · 200+ сотр.',    bg: '' },
  { mark: 'EV', name: 'Event-агентство',    type: 'Фестивали, форумы',    bg: 'yellow' },
  { mark: 'PR', name: 'Производство',       type: 'Промышленное',         bg: '' },
  { mark: 'SP', name: 'Спортивный клуб',    type: 'Любительская лига',    bg: 'blue' },
  { mark: 'RS', name: 'Ресторан',           type: 'HoReCa · 4 точки',     bg: '' },
  { mark: 'CF', name: 'Кофейня',            type: 'Сеть, 12 точек',       bg: 'yellow' },
  { mark: 'RT', name: 'Ритейл-сеть',        type: 'Fashion · 30+ маг.',   bg: '' },
  { mark: 'MA', name: 'Маркетинг-агент.',   type: 'B2B-промо',            bg: 'blue' },
];

export default function Clients() {
  return (
    <section id="clients" className="section-spacer" aria-labelledby="clients-title">
      <div className="v6-section-head">
        <div>
          <div className="v6-kicker">(07) — Клиенты</div>
          <h2 id="clients-title">Нам доверяют <em>компании</em></h2>
        </div>
        <p>От стартапов до сетевого ритейла. Логотипы под NDA — покажем по запросу под договор.</p>
      </div>

      <ul className={styles.grid} aria-label="Наши клиенты">
        {clients.map((c) => (
          <li key={c.mark} className={`${styles.card} ${c.bg ? styles[c.bg as keyof typeof styles] : ''}`}>
            <span className={styles.mark} aria-hidden="true">{c.mark}</span>
            <div>
              <div className={styles.name}>{c.name}</div>
              <div className={styles.type}>{c.type}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
