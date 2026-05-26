import styles from './Clients.module.css';

const clients = [
  { logo: '/clients/gp.webp',      name: 'GRAND PRIX' },
  { logo: '/clients/ss.webp',      name: 'Sakura S/F' },
  { logo: '/clients/ni.webp',      name: 'NIBK' },
  { logo: '/clients/ns.webp',      name: 'Nyberg School' },
  { logo: '/clients/vc.webp',      name: 'VIC' },
  { logo: '/clients/ut.webp',      name: 'Уголь-Транс' },
  { logo: '/clients/ar.webp',      name: 'АРВЭ' },
  { logo: '/clients/sv.webp',      name: 'Россия — страна возможностей' },
  { logo: '/clients/ak.webp',      name: 'Агрорус и Ко' },
  { logo: '/clients/rs.webp',      name: 'Россети' },
  { logo: '/clients/un.webp',      name: 'Юнармия' },
  { logo: '/clients/aa.webp',      name: 'Агро-Альянс' },
  { logo: '/clients/bx.webp',      name: 'brixo' },
  { logo: '/clients/kp.webp',      name: 'Kompozit' },
  { logo: '/clients/os.webp',      name: 'Ostendorf' },
  { logo: '/clients/st.webp',      name: 'Steingot' },
  { logo: '/clients/rl.webp',      name: 'Росагролизинг' },
  { logo: '/clients/sb.webp',      name: 'СИБУР' },
  { logo: '/clients/ol.webp',      name: 'Олимпийский' },
  { logo: '/clients/bz.webp',      name: 'BIZONE' },
  { logo: '/clients/mb.webp',      name: 'Мой Бизнес' },
  { logo: '/clients/mp.webp',      name: 'majorpack' },
  { logo: '/clients/la.webp',      name: 'Лидеры АПК' },
  { logo: '/clients/it.webp',      name: 'Итэлма' },
  { logo: '/clients/ch1.webp',     name: 'Чайхона №1' },
  { logo: '/clients/mistral.webp', name: 'Мистраль' },
];

export default function Clients() {
  return (
    <section id="clients" className="section-spacer" aria-labelledby="clients-title">
      <div className="v6-section-head">
        <div>
          <div className="v6-kicker">(07) — Нам доверяют</div>
          <h2 id="clients-title">Более 300 <em>постоянных</em> заказчиков</h2>
        </div>
        <p>Промышленность, госструктуры, агросектор, образование и крупный бизнес. Ниже — компании, для которых мы реализовали проекты с брендированием.</p>
      </div>

      <ul className={styles.grid} aria-label="Наши клиенты">
        {clients.map((c) => (
          <li key={c.name} className={styles.tile} title={c.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.logo}
              alt={c.name}
              className={styles.logo}
              loading="lazy"
              width={160}
              height={90}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
