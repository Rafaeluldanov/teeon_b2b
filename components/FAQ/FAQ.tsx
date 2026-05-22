'use client';

import { useState } from 'react';
import Link from 'next/link';
import { faqHomeFeatured } from '@/lib/faq';
import styles from './FAQ.module.css';

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M8 2 L8 14 M2 8 L14 8" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);

const ArrowIc = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
);

export default function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="section-spacer" aria-labelledby="faq-title">
      <div className="v6-section-head">
        <div>
          <div className="v6-kicker">(08) — FAQ</div>
          <h2 id="faq-title">Часто <em>спрашивают</em></h2>
        </div>
        <p>Шесть вопросов, которые задают перед первым заказом. На остальные — в чате или по телефону.</p>
      </div>

      <dl className={styles.list}>
        {faqHomeFeatured.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
              <dt>
                <button
                  className={styles.question}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                >
                  <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.qtext}>{f.question}</span>
                  <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} aria-hidden="true">
                    <PlusIcon />
                  </span>
                </button>
              </dt>
              <dd id={`faq-${i}`} className={styles.answer} hidden={!isOpen}>
                <div className={styles.answerBody}>{f.answer}</div>
              </dd>
            </div>
          );
        })}
      </dl>

      <div className={styles.footer}>
        <Link href="/faq/" className="v6-btn v6-btn--ghost-d">
          Все вопросы и ответы
          <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
        </Link>
      </div>
    </section>
  );
}
