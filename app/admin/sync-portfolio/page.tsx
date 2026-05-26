'use client';

import { useEffect, useState } from 'react';

const LS_KEY = 'teeon_admin_portfolio_cases';

export default function SyncPortfolioPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error' | 'empty'>('idle');
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    void (async () => {
      try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) {
          setStatus('empty');
          setMessage('В localStorage нет данных портфолио. Открой админку, убедись что кейсы есть, и вернись сюда.');
          return;
        }
        const data: unknown = JSON.parse(raw);
        const arr = Array.isArray(data) ? data : [];
        setCount(arr.length);
        setStatus('sending');
        const res = await fetch('/api/admin/portfolio-sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: raw,
        });
        if (!res.ok) {
          setStatus('error');
          setMessage(`Ошибка отправки: ${res.status}`);
          return;
        }
        const json = await res.json() as { ok: boolean; count?: number; bytes?: number };
        setStatus('done');
        setMessage(`Отправлено: ${json.count ?? arr.length} кейсов, ${json.bytes ?? raw.length} байт.`);
      } catch (e) {
        setStatus('error');
        setMessage(e instanceof Error ? e.message : 'Неизвестная ошибка');
      }
    })();
  }, []);

  const colorMap = {
    idle: '#64748b',
    sending: '#0284c7',
    done: '#16a34a',
    error: '#dc2626',
    empty: '#d97706',
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, background: '#f8fafc' }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, maxWidth: 560, width: '100%', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1.5px solid #e2e8f0' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0, marginBottom: 8 }}>
          Синхронизация портфолио
        </h1>
        <p style={{ fontSize: 14, color: '#64748b', margin: 0, marginBottom: 24 }}>
          Эта страница автоматически выгружает кейсы из твоего браузера на сервер,
          чтобы Claude мог их прочитать и заполнить.
        </p>
        <div style={{ padding: 16, background: '#f1f5f9', borderRadius: 10, fontSize: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: colorMap[status], flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>
              {status === 'idle' && 'Подготовка…'}
              {status === 'sending' && `Отправляем ${count} кейсов на сервер…`}
              {status === 'done' && 'Готово ✓'}
              {status === 'error' && 'Ошибка'}
              {status === 'empty' && 'Пусто'}
            </div>
            {message && <div style={{ color: '#475569', fontSize: 13 }}>{message}</div>}
          </div>
        </div>
        {status === 'done' && (
          <p style={{ marginTop: 20, padding: 12, background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: 8, color: '#065f46', fontSize: 13 }}>
            Данные сохранены на сервере. Напиши Claude в чате — он прочитает их и продолжит работу.
          </p>
        )}
      </div>
    </main>
  );
}
