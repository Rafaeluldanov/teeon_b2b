'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import styles from './RequestForm.module.css';

interface RequestFormProps {
  title?: string;
  subtitle?: string;
  embedded?: boolean;
}

const DEFAULT_SUBTITLE =
  'Оставьте имя и телефон — мы свяжемся с вами, уточним задачу и подготовим расчёт.';

function FormContent() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [prefillComment, setPrefillComment] = useState('');
  const [sourceLabel, setSourceLabel] = useState('');
  const [sourceImage, setSourceImage] = useState('');
  const [ready, setReady] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setReady(true);
    try {
      // Источник заявки: из какой карточки (товар / кейс) клиент открыл форму.
      // Кладёт сюда RequestModal через data-request-source / data-request-image.
      const src = localStorage.getItem('teeon_request_source');
      const img = localStorage.getItem('teeon_request_image');
      if (src) setSourceLabel(src);
      if (img) setSourceImage(img);
    } catch { /* ignore */ }

    try {
      // Priority 1: multi-item format
      const rawItems = localStorage.getItem('teeon_quote_items');
      if (rawItems) {
        const items = JSON.parse(rawItems) as Array<Record<string, string>>;
        if (Array.isArray(items) && items.length > 0) {
          const lines: string[] = ['Выбранные позиции для расчёта:'];
          items.forEach((item, idx) => {
            lines.push(`${idx + 1}.`);
            if (item.categorySlug) lines.push(`  Категория: ${item.categorySlug}`);
            if (item.modelTitle) lines.push(`  Модель: ${item.modelTitle}`);
            if (item.optionTitle) lines.push(`  Вариант: ${item.optionTitle}`);
            if (item.material) lines.push(`  Материал: ${item.material}`);
            if (item.density) lines.push(`  Плотность: ${item.density}`);
            if (item.color) lines.push(`  Цвет: ${item.color}`);
            if (item.size) lines.push(`  Размеры: ${item.size}`);
            if (item.quantity) lines.push(`  Тираж: ${item.quantity}`);
            if (item.branding) lines.push(`  Брендирование: ${item.branding}`);
            if (item.printPosition) lines.push(`  Расположение логотипа: ${item.printPosition}`);
          });
          setPrefillComment(lines.join('\n'));
          return;
        }
      }

      // Priority 2: selected variant from ModelVariantBlock
      const rawVariant = localStorage.getItem('teeon_selected_variant');
      if (rawVariant) {
        const v = JSON.parse(rawVariant) as { categoryTitle?: string; modelName?: string; variantName?: string };
        const vLines: string[] = ['Выбранный вариант:'];
        if (v.categoryTitle) vLines.push(`Категория: ${v.categoryTitle}`);
        if (v.modelName) vLines.push(`Модель: ${v.modelName}`);
        if (v.variantName) vLines.push(`Вариант: ${v.variantName}`);
        setPrefillComment(vLines.join('\n'));
        return;
      }

      // Priority 3: legacy single-item format
      const raw = localStorage.getItem('teeon_quote_selection');
      if (!raw) return;
      const sel = JSON.parse(raw) as Record<string, string>;
      const lines: string[] = ['Выбранная конфигурация:'];
      if (sel.categorySlug) lines.push(`Категория: ${sel.categorySlug}`);
      if (sel.modelTitle) lines.push(`Модель: ${sel.modelTitle}`);
      if (sel.optionTitle) lines.push(`Вариант: ${sel.optionTitle}`);
      if (sel.material) lines.push(`Материал: ${sel.material}`);
      if (sel.density) lines.push(`Плотность: ${sel.density}`);
      if (sel.color) lines.push(`Цвет: ${sel.color}`);
      if (sel.size) lines.push(`Размеры: ${sel.size}`);
      if (sel.quantity) lines.push(`Тираж: ${sel.quantity}`);
      if (sel.branding) lines.push(`Брендирование: ${sel.branding}`);
      setPrefillComment(lines.join('\n'));
    } catch {
      // ignore
    }
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (honeypot) return;
    setErrorMsg('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set('website', honeypot);

    try {
      const res = await fetch('/api/request', { method: 'POST', body: formData });
      const json = await res.json() as { success: boolean; message: string; previewUrl?: string };

      if (!res.ok || !json.success) {
        setErrorMsg(json.message ?? 'Произошла ошибка. Попробуйте снова.');
        setLoading(false);
        return;
      }

      try {
        localStorage.removeItem('teeon_quote_items');
        localStorage.removeItem('teeon_quote_selection');
        localStorage.removeItem('teeon_selected_variant');
        localStorage.removeItem('teeon_request_source');
        localStorage.removeItem('teeon_request_image');
      } catch { /* ignore */ }

      if (json.previewUrl) setPreviewUrl(json.previewUrl);
      setSubmitted(true);
    } catch {
      setErrorMsg('Ошибка сети. Проверьте подключение и попробуйте снова.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <div className={styles.successIcon} aria-hidden="true">✓</div>
        <h3 className={styles.successTitle}>Заявка принята!</h3>
        <p className={styles.successText}>
          Спасибо! Мы свяжемся с вами для уточнения деталей. Обычно отвечаем в течение рабочего дня.
        </p>
        {previewUrl && (
          <a href={previewUrl} target="_blank" rel="noopener noreferrer" className={styles.previewLink}>
            Открыть тестовое письмо →
          </a>
        )}
        <button className={styles.resetBtn} onClick={() => { setSubmitted(false); setPreviewUrl(''); }}>
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      id="rf-form"
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      data-ready={ready ? 'true' : undefined}
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, pointerEvents: 'none' }}
      />

      {/* Hidden: config from catalog/modelVariantBlock */}
      {prefillComment && (
        <input type="hidden" name="comment" value={prefillComment} />
      )}

      {errorMsg && (
        <div className={styles.errorBanner} role="alert" data-testid="form-error">
          {errorMsg}
        </div>
      )}

      <div className={styles.grid}>
        {/* ФИО */}
        <div className={styles.field}>
          <label htmlFor="rf-name" className={styles.label}>
            Имя <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="rf-name"
            name="name"
            className={styles.input}
            placeholder="Иван Иванов"
            required
            autoComplete="name"
          />
        </div>

        {/* Телефон */}
        <div className={styles.field}>
          <label htmlFor="rf-phone" className={styles.label}>
            Телефон <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            id="rf-phone"
            name="phone"
            className={styles.input}
            placeholder="+7 (___) ___-__-__"
            required
            autoComplete="tel"
          />
        </div>

        {/* Email */}
        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label htmlFor="rf-email" className={styles.label}>Email</label>
          <input
            type="email"
            id="rf-email"
            name="email"
            className={styles.input}
            placeholder="mail@company.ru"
            autoComplete="email"
          />
        </div>
      </div>

      <div className={styles.footer}>
        <button
          id="rf-submit"
          type="submit"
          className={styles.submitBtn}
          disabled={loading}
        >
          {loading ? 'Отправляем…' : 'Отправить заявку'}
          {!loading && (
            <span className={styles.submitIc} aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
            </span>
          )}
        </button>
        <p className={styles.consent}>
          Нажимая на кнопку, вы соглашаетесь с{' '}
          <a href="/privacy/" className={styles.consentLink}>
            политикой обработки персональных данных
          </a>
        </p>
      </div>
    </form>
  );
}

export default function RequestForm({
  title,
  subtitle,
  embedded = false,
}: RequestFormProps) {
  if (embedded) {
    return <FormContent />;
  }

  const BulletIc = ({ d }: { d: string }) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d={d}/>
    </svg>
  );

  return (
    <section className={`${styles.section} section-spacer`} id="request" aria-labelledby="form-title">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className="v6-kicker on-dark">(10) — Заявка</div>
          <h2 id="form-title">
            {title ?? 'Рассчитать стоимость'} <em>пошива и&nbsp;брендирования</em>
          </h2>
          <p className={styles.headerSub}>
            {subtitle ?? DEFAULT_SUBTITLE}
          </p>
          <div className={styles.bullets} aria-label="Наши преимущества">
            <div className={styles.bullet}>
              <span className={styles.bulletIcon}><BulletIc d="M7 2 L7 7 L9 9 M2 7 L12 7" /></span>
              <span className={styles.bulletText}>Отвечаем за 1 час · будни 9:00–19:00</span>
            </div>
            <div className={styles.bullet}>
              <span className={styles.bulletIcon}><BulletIc d="M2 3 L12 3 L12 11 L2 11 Z M4 6 L10 6 M4 8 L8 8" /></span>
              <span className={styles.bulletText}>Считаем 2–3 варианта по разным методам</span>
            </div>
            <div className={styles.bullet}>
              <span className={styles.bulletIcon}><BulletIc d="M7 2 L11 5 L11 10 Q11 12 7 13 Q3 12 3 10 L3 5 Z M5 7 L7 9 L10 6" /></span>
              <span className={styles.bulletText}>Образец до тиража · pre-production sample</span>
            </div>
            <div className={styles.bullet}>
              <span className={styles.bulletIcon}><BulletIc d="M2 3 L12 3 L12 11 L2 11 Z M4 5 L10 5 M4 7 L8 7" /></span>
              <span className={styles.bulletText}>УПД, договор, маркировка WB/Ozon</span>
            </div>
          </div>
        </div>

        <div className={styles.formCard}>
          <h3>Заявка на расчёт</h3>
          <FormContent />
        </div>
      </div>
    </section>
  );
}
