'use client';

import { useState, useEffect } from 'react';
import { contacts as defaultC } from '@/lib/contacts';
import { CONTACTS_LS_KEY } from '@/lib/editableContacts';
import type { EditableContacts } from '@/lib/editableContacts';
import styles from './Footer.module.css';

export default function FooterContactsClient() {
  const [c, setC] = useState<EditableContacts | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONTACTS_LS_KEY);
      if (raw) setC(JSON.parse(raw) as EditableContacts);
    } catch { /* ignore */ }
  }, []);

  const phone = c?.phone ?? defaultC.phone;
  const phoneRaw = c?.phoneRaw ?? defaultC.phoneRaw;
  const email = c?.email ?? defaultC.email;
  const city = c?.city ?? defaultC.city;
  const schedule = c?.schedule ?? defaultC.schedule;
  const telegram = c?.telegram ?? defaultC.telegram;

  return (
    <>
      <div className={styles.contactsList}>
        <a href={`tel:+${phoneRaw}`} className={styles.contactPhone}>{phone}</a>
        <a href={`mailto:${email}`} className={styles.contactEmail}>{email}</a>
      </div>
      <div className={styles.address}>
        <span>{city}</span>
        <span>{schedule}</span>
      </div>
      <div className={styles.messengers}>
        <a
          href={`https://t.me/${telegram.replace('@', '')}`}
          className={styles.messengerBtn}
          aria-label="Написать в Telegram"
        >TG</a>
        <a
          href={`https://wa.me/${phoneRaw}`}
          className={styles.messengerBtn}
          aria-label="Написать в WhatsApp"
        >WA</a>
      </div>
    </>
  );
}
