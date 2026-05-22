'use client';

import { useState, useEffect } from 'react';
import { editablePages } from '@/lib/editablePages';
import type { EditablePageContent, EditableTextBlock, EditableFaqItem } from '@/lib/editablePages';
import { defaultContacts, CONTACTS_LS_KEY } from '@/lib/editableContacts';
import type { EditableContacts } from '@/lib/editableContacts';
import styles from './AdminPagesEditor.module.css';

const PAGES_LS_KEY = 'teeon_admin_page_content';
function uid() { return `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`; }

type SectionId = 'contacts' | 'pages';

// ── ContactsEditor ─────────────────────────────────────────────────────────────
function ContactsEditor() {
  const [d, setD] = useState<EditableContacts>(defaultContacts);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONTACTS_LS_KEY);
      if (raw) setD(JSON.parse(raw) as EditableContacts);
    } catch { /* ignore */ }
  }, []);

  const showStatus = (msg: string) => { setStatusMsg(msg); setTimeout(() => setStatusMsg(''), 3000); };

  const save = () => {
    try { localStorage.setItem(CONTACTS_LS_KEY, JSON.stringify(d)); showStatus('Контакты сохранены'); }
    catch { showStatus('Ошибка сохранения'); }
  };

  const reset = () => {
    setD(defaultContacts);
    try { localStorage.removeItem(CONTACTS_LS_KEY); } catch { /* ignore */ }
    showStatus('Контакты сброшены к данным проекта');
  };

  const set = <K extends keyof EditableContacts>(k: K, v: EditableContacts[K]) => setD(p => ({ ...p, [k]: v }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {statusMsg && <div className={styles.statusBar}>{statusMsg}</div>}

      <div style={{ display: 'flex', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
        <button type="button" className={styles.btnPrimary} onClick={save}>💾 Сохранить контакты</button>
        <button type="button" className={styles.btnSecondary} onClick={reset}>↩ Сбросить</button>
      </div>

      <div className={styles.seoNotice}>
        После сохранения обновите страницу — шапка, футер и страница контактов подхватят новые данные из localStorage.
        Для публикации на всех устройствах перенесите данные в lib/contacts.ts.
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className={styles.divider}>Общая информация</div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Название компании</label><input className={styles.input} value={d.companyName} onChange={e => set('companyName', e.target.value)} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Дескриптор</label><input className={styles.input} value={d.descriptor} onChange={e => set('descriptor', e.target.value)} /></div>
        </div>

        <div className={styles.divider}>Контакты</div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Телефон (отображаемый)</label><input className={styles.input} value={d.phone} placeholder="+7 (999) 000-00-00" onChange={e => set('phone', e.target.value)} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Телефон (цифры для tel:)</label><input className={styles.input} value={d.phoneRaw} placeholder="79990000000" onChange={e => set('phoneRaw', e.target.value)} /></div>
        </div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Email</label><input className={styles.input} type="email" value={d.email} onChange={e => set('email', e.target.value)} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Telegram (@username)</label><input className={styles.input} value={d.telegram} placeholder="@teeon_merch" onChange={e => set('telegram', e.target.value)} /></div>
        </div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>WhatsApp (номер)</label><input className={styles.input} value={d.whatsapp} onChange={e => set('whatsapp', e.target.value)} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Город</label><input className={styles.input} value={d.city} onChange={e => set('city', e.target.value)} /></div>
        </div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Адрес</label><input className={styles.input} value={d.address} onChange={e => set('address', e.target.value)} /></div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>График работы</label><input className={styles.input} value={d.schedule} placeholder="Пн–Пт, 10:00–19:00" onChange={e => set('schedule', e.target.value)} /></div>

        <div className={styles.divider}>Юридические реквизиты</div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Юридическое название</label><input className={styles.input} value={d.legalName} onChange={e => set('legalName', e.target.value)} /></div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>ИНН</label><input className={styles.input} value={d.inn} onChange={e => set('inn', e.target.value)} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>ОГРН</label><input className={styles.input} value={d.ogrn} onChange={e => set('ogrn', e.target.value)} /></div>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 16 }}>
        <button type="button" className={styles.btnPrimary} onClick={save}>💾 Сохранить контакты</button>
      </div>
    </div>
  );
}

// ── PageForm ───────────────────────────────────────────────────────────────────
interface PageFormProps { page: EditablePageContent; onSave: (p: EditablePageContent) => void; onReset: () => void; }
function PageForm({ page, onSave, onReset }: PageFormProps) {
  const [d, setD] = useState<EditablePageContent>(page);
  const set = <K extends keyof EditablePageContent>(k: K, v: EditablePageContent[K]) => setD(p => ({ ...p, [k]: v }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setD(page); }, [page.slug]);

  const updateBlock = (i: number, field: keyof EditableTextBlock, val: string | boolean) =>
    setD(p => ({ ...p, blocks: p.blocks.map((b, idx) => idx === i ? { ...b, [field]: val } : b) }));
  const addBlock = () => setD(p => ({ ...p, blocks: [...p.blocks, { id: uid(), title: '', text: '', isActive: true }] }));
  const removeBlock = (i: number) => setD(p => ({ ...p, blocks: p.blocks.filter((_, idx) => idx !== i) }));

  const updateFaq = (i: number, field: keyof EditableFaqItem, val: string) =>
    setD(p => ({ ...p, faq: p.faq.map((f, idx) => idx === i ? { ...f, [field]: val } : f) }));
  const addFaq = () => setD(p => ({ ...p, faq: [...p.faq, { question: '', answer: '' }] }));
  const removeFaq = (i: number) => setD(p => ({ ...p, faq: p.faq.filter((_, idx) => idx !== i) }));

  return (
    <div className={styles.formCol}>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>{d.label} — {d.url}</h3>
        <div className={styles.formActions}>
          <button type="button" className={styles.btnSecondary} onClick={onReset}>↩ Сбросить</button>
          <button type="button" className={styles.btnPrimary} onClick={() => onSave(d)}>💾 Сохранить страницу</button>
        </div>
      </div>
      <div className={styles.formBody}>
        <div className={styles.alertWarning}>
          Поля SEO и тексты страниц сохраняются в localStorage как прототип.
          Для публикации всем пользователям нужен CMS/backend или перенос в data-файлы.
          SEO metadata (<code>title</code>/<code>description</code> в &lt;head&gt;) обновляются только через код.
        </div>

        <div className={styles.divider}>Основной контент</div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>H1 страницы</label><input className={styles.input} value={d.h1} onChange={e => set('h1', e.target.value)} /></div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Title (тег title)</label><input className={styles.input} value={d.title} onChange={e => set('title', e.target.value)} /></div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Description (meta)</label><textarea className={styles.textarea} rows={2} value={d.description} onChange={e => set('description', e.target.value)} /></div>

        <div className={styles.divider}>SEO</div>
        <div className={styles.seoNotice}>SEO-поля не применяются к публичным страницам автоматически — только хранятся для будущего backend/CMS.</div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>SEO Title</label><input className={styles.input} value={d.seoTitle} onChange={e => set('seoTitle', e.target.value)} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>SEO Description</label><textarea className={styles.textarea} rows={2} value={d.seoDescription} onChange={e => set('seoDescription', e.target.value)} /></div>
        </div>

        <div className={styles.divider}>
          Блоки контента
          <button type="button" className={styles.btnSmall} onClick={addBlock}>+ Добавить блок</button>
        </div>
        {d.blocks.length === 0 && <p className={styles.emptyNote}>Блоков нет. Нажмите «+ Добавить блок».</p>}
        {d.blocks.map((b, i) => (
          <div key={b.id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className={styles.fieldLabel}>Блок {i + 1}</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <label className={styles.fieldLabel}><input type="checkbox" checked={b.isActive} onChange={e => updateBlock(i, 'isActive', e.target.checked)} /> Активен</label>
                <button type="button" className={styles.btnDangerSm} onClick={() => removeBlock(i)}>✕</button>
              </div>
            </div>
            <div className={styles.row2}>
              <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Заголовок</label><input className={styles.input} value={b.title} onChange={e => updateBlock(i, 'title', e.target.value)} /></div>
              <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Подзаголовок</label><input className={styles.input} value={b.subtitle ?? ''} onChange={e => updateBlock(i, 'subtitle', e.target.value)} /></div>
            </div>
            <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Текст</label><textarea className={styles.textarea} rows={3} value={b.text} onChange={e => updateBlock(i, 'text', e.target.value)} /></div>
          </div>
        ))}

        <div className={styles.divider}>
          FAQ
          <button type="button" className={styles.btnSmall} onClick={addFaq}>+ Добавить вопрос</button>
        </div>
        {d.faq.length === 0 && <p className={styles.emptyNote}>FAQ пустой.</p>}
        {d.faq.map((f, i) => (
          <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className={styles.fieldLabel}>Вопрос {i + 1}</span>
              <button type="button" className={styles.btnDangerSm} onClick={() => removeFaq(i)}>✕</button>
            </div>
            <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Вопрос</label><input className={styles.input} value={f.question} onChange={e => updateFaq(i, 'question', e.target.value)} /></div>
            <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Ответ</label><textarea className={styles.textarea} rows={2} value={f.answer} onChange={e => updateFaq(i, 'answer', e.target.value)} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function AdminPagesEditor() {
  const [section, setSection] = useState<SectionId>('contacts');
  const [pages, setPages] = useState<EditablePageContent[]>(editablePages);
  const [selectedSlug, setSelectedSlug] = useState<string>(editablePages[0]?.slug ?? '');
  const [statusMsg, setStatusMsg] = useState('');
  const [exportJson, setExportJson] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PAGES_LS_KEY);
      if (raw) setPages(JSON.parse(raw) as EditablePageContent[]);
    } catch { /* ignore */ }
  }, []);

  const showStatus = (msg: string) => { setStatusMsg(msg); setTimeout(() => setStatusMsg(''), 3000); };

  const persist = (data: EditablePageContent[]) => {
    setPages(data);
    try { localStorage.setItem(PAGES_LS_KEY, JSON.stringify(data)); } catch { /* ignore */ }
  };

  const selectedPage = pages.find(p => p.slug === selectedSlug) ?? pages[0];
  const originalPage = editablePages.find(p => p.slug === selectedSlug);

  const handleSave = (page: EditablePageContent) => {
    persist(pages.map(p => p.slug === page.slug ? page : p));
    showStatus('Страница сохранена');
  };

  const handleReset = () => {
    if (!originalPage) return;
    persist(pages.map(p => p.slug === selectedSlug ? originalPage : p));
    showStatus('Сброшено к данным проекта');
  };

  return (
    <div className={styles.editor}>
      {statusMsg && <div className={styles.statusBar}>{statusMsg}</div>}

      {/* Section switcher */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '2px solid #e2e8f0', marginBottom: 4 }}>
        {([
          { id: 'contacts' as SectionId, label: '📞 Контакты и реквизиты' },
          { id: 'pages' as SectionId, label: '📄 Тексты страниц' },
        ]).map(s => (
          <button key={s.id} type="button"
            style={{ padding: '8px 16px', fontSize: 13, fontWeight: 600, color: section === s.id ? '#0f172a' : '#64748b', background: 'transparent', border: 'none', borderBottom: section === s.id ? '2px solid #0f172a' : '2px solid transparent', marginBottom: -2, cursor: 'pointer', fontFamily: 'inherit', borderRadius: '6px 6px 0 0' }}
            onClick={() => setSection(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {section === 'contacts' && <ContactsEditor />}

      {section === 'pages' && (
        <div className={styles.layout}>
          <div className={styles.listCol}>
            <div className={styles.colHeader}><span className={styles.colTitle}>Страницы</span></div>
            <div className={styles.itemList}>
              {pages.map(p => (
                <div key={p.slug} className={`${styles.item} ${p.slug === selectedSlug ? styles.itemActive : ''}`} onClick={() => setSelectedSlug(p.slug)}>
                  <div className={styles.itemBody}>
                    <span className={styles.itemName}>{p.label}</span>
                    <span className={styles.itemSub}>{p.url}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.formCol}>
            {selectedPage && (
              <PageForm key={selectedPage.slug} page={selectedPage} onSave={handleSave} onReset={handleReset} />
            )}
          </div>
        </div>
      )}

      {section === 'pages' && (
        <details className={styles.advanced}>
          <summary className={styles.advancedSummary}>Экспорт / Импорт / Сброс</summary>
          <div className={styles.advancedBody}>
            <div className={styles.advancedRow}>
              <button type="button" className={styles.btnSecondary} onClick={() => setExportJson(JSON.stringify(pages, null, 2))}>📤 Экспорт</button>
              <button type="button" className={styles.btnSecondary} onClick={() => { persist(editablePages); showStatus('Все страницы сброшены'); setExportJson(''); }}>↩ Сбросить всё</button>
            </div>
            {exportJson && <textarea className={styles.jsonTextarea} rows={8} value={exportJson} readOnly />}
          </div>
        </details>
      )}
    </div>
  );
}
