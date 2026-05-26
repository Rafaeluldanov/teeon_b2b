'use client';

import { useEffect, useState, useCallback } from 'react';
import RequestForm from '@/components/RequestForm/RequestForm';
import styles from './RequestModal.module.css';

// Имя кастомного события, через которое любые кнопки на сайте открывают модалку.
// Использовать helper openRequestModal() из './openRequestModal.ts' — НЕ диспатчить
// событие напрямую, чтобы при будущей миграции на Context API можно было заменить
// один файл.
export const REQUEST_MODAL_OPEN_EVENT = 'teeon:open-request';

// Монтируется один раз глобально в app/layout.tsx. Лениво показывает форму
// поверх страницы, не требует никаких изменений в RequestForm — он уже клиентский
// и сам читает localStorage с предзаполнением.
export default function RequestModal() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(REQUEST_MODAL_OPEN_EVENT, handler);
    return () => window.removeEventListener(REQUEST_MODAL_OPEN_EVENT, handler);
  }, []);

  // Global delegation: перехватываем клики по любым <a href="#request"> и
  // <a href="/#request"> на всём сайте — открываем модалку вместо скролла.
  // Это избавляет от необходимости заменять каждую ссылку вручную (их 25+).
  // Кнопка с modifier (cmd/ctrl/middle-click) и иные интенты — пропускаем.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        if (el.tagName === 'A') {
          const href = (el as HTMLAnchorElement).getAttribute('href') || '';
          // Совпадают: "#request", "/#request", "https://teeon.ru/#request" и т.п.
          if (href === '#request' || href === '/#request' || href.endsWith('/#request')) {
            e.preventDefault();
            setOpen(true);
          }
          return;
        }
        el = el.parentElement;
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // ESC закрывает + блокируем body-scroll пока открыто.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Заявка на расчёт"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className={styles.dialog}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={close}
          aria-label="Закрыть"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6L18 18M6 18L18 6" />
          </svg>
        </button>
        <div className={styles.body}>
          <RequestForm
            embedded
            title="Заявка на расчёт"
            subtitle="Оставьте имя и телефон — свяжемся, уточним задачу и подготовим расчёт."
          />
        </div>
      </div>
    </div>
  );
}
