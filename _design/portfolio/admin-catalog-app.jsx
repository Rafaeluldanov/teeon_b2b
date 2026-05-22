/* /admin/catalog-editor/ — three-column editor backed by localStorage */

const { Logotype } = window;
const {
  defaultCategories, defaultModels,
  loadModels, saveModels, resetModels,
} = window.CatalogData;

const linesToArr = (s) => s ? s.split('\n').map(t => t.trim()).filter(Boolean) : [];
const arrToLines = (a) => (a || []).join('\n');

const newId = () => 'v-' + Math.random().toString(36).slice(2, 9);

function App() {
  const [models, setModels] = React.useState(() => loadModels());
  const [categories, setCategories] = React.useState(() => {
    try {
      const raw = localStorage.getItem('teeon_admin_categories');
      return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(defaultCategories));
    } catch (e) { return JSON.parse(JSON.stringify(defaultCategories)); }
  });
  const [selectedCatSlug, setSelectedCatSlug] = React.useState(categories[0]?.slug);
  const [editingCat, setEditingCat] = React.useState(null); // catSlug being edited
  const [selectedModelSlug, setSelectedModelSlug] = React.useState(null);
  const [editingVariantId, setEditingVariantId] = React.useState(null); // or 'new'
  const [toast, setToast] = React.useState('');

  const categoryModels = models[selectedCatSlug] || [];
  const selectedModel = categoryModels.find(m => m.slug === selectedModelSlug);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast(''), 2500);
  };

  const persist = (newModels) => {
    setModels(newModels);
    saveModels(newModels);
  };
  const persistCategories = (newCats) => {
    setCategories(newCats);
    try { localStorage.setItem('teeon_admin_categories', JSON.stringify(newCats)); } catch (e) {}
  };

  /* ---------- CATEGORY OPS ---------- */
  const addCategory = () => {
    const slug = prompt('Slug новой категории (латиница, без пробелов):');
    if (!slug) return;
    const title = prompt('Название:', slug);
    if (!title) return;
    const c = {
      slug, title, short: '', desc: '',
      badge: `Категория ${String(categories.length + 1).padStart(2, '0')}`,
      built_in: false, sortOrder: categories.length + 1,
      tasks: [], brandings: [], customize: [], pricingNote: '',
      related: [], kind: 'tee', bg: 'paper-2',
    };
    persistCategories([...categories, c]);
    persist({ ...models, [slug]: [] });
    setSelectedCatSlug(slug);
    showToast(`Добавлена категория "${title}"`);
  };

  const updateCategory = (slug, patch) => {
    persistCategories(categories.map(c => c.slug === slug ? { ...c, ...patch } : c));
  };

  /* ---------- MODEL OPS ---------- */
  const addModel = () => {
    const name = prompt('Название модели:');
    if (!name) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9а-яё]+/gi, '-');
    const m = {
      slug, name, subtitle: '', patternCode: '',
      badges: [], active: true, sortOrder: categoryModels.length + 1,
      shortDesc: '', desc: '',
      features: [], tasks: [], brandings: [], customize: [],
      variants: [],
    };
    persist({ ...models, [selectedCatSlug]: [...categoryModels, m] });
    setSelectedModelSlug(slug);
    showToast(`Создана модель "${name}"`);
  };

  const updateModel = (modelSlug, patch) => {
    persist({
      ...models,
      [selectedCatSlug]: categoryModels.map(m => m.slug === modelSlug ? { ...m, ...patch } : m),
    });
  };

  const duplicateModel = (modelSlug) => {
    const m = categoryModels.find(x => x.slug === modelSlug);
    if (!m) return;
    const copy = { ...m, slug: m.slug + '-copy', name: m.name + ' (копия)' };
    persist({ ...models, [selectedCatSlug]: [...categoryModels, copy] });
    setSelectedModelSlug(copy.slug);
    showToast(`Дубликат "${copy.name}"`);
  };

  const deleteModel = (modelSlug) => {
    if (!confirm('Удалить модель?')) return;
    persist({
      ...models,
      [selectedCatSlug]: categoryModels.filter(m => m.slug !== modelSlug),
    });
    setSelectedModelSlug(null);
    showToast('Модель удалена');
  };

  /* ---------- VARIANT OPS ---------- */
  const addVariant = () => {
    if (!selectedModel) return;
    const v = {
      id: newId(), name: 'Новый вариант', subtitle: '', patternCode: '',
      desc: '', features: [], materials: [], densities: [],
      sizes: ['M', 'L'], brandings: [], printLocations: [],
      customize: [], colors: [],
      image: null, active: true, sortOrder: (selectedModel.variants || []).length + 1,
    };
    updateModel(selectedModel.slug, { variants: [...(selectedModel.variants || []), v] });
    setEditingVariantId(v.id);
    showToast('Создан вариант');
  };

  const updateVariant = (variantId, patch) => {
    if (!selectedModel) return;
    updateModel(selectedModel.slug, {
      variants: (selectedModel.variants || []).map(v => v.id === variantId ? { ...v, ...patch } : v),
    });
  };

  const duplicateVariant = (variantId) => {
    if (!selectedModel) return;
    const v = (selectedModel.variants || []).find(x => x.id === variantId);
    if (!v) return;
    const copy = { ...v, id: newId(), name: v.name + ' копия' };
    updateModel(selectedModel.slug, { variants: [...(selectedModel.variants || []), copy] });
    setEditingVariantId(copy.id);
    showToast('Дубликат варианта');
  };

  const deleteVariant = (variantId) => {
    if (!selectedModel) return;
    if (!confirm('Удалить вариант?')) return;
    updateModel(selectedModel.slug, {
      variants: (selectedModel.variants || []).filter(v => v.id !== variantId),
    });
    setEditingVariantId(null);
    showToast('Вариант удалён');
  };

  /* ---------- BULK ---------- */
  const exportJson = () => JSON.stringify(models, null, 2);
  const copyJson = () => {
    navigator.clipboard.writeText(exportJson()).then(() => showToast('Скопировано в буфер'));
  };
  const resetAll = () => {
    if (!confirm('Сбросить каталог к исходным данным? Все изменения будут потеряны.')) return;
    resetModels();
    setModels(JSON.parse(JSON.stringify(defaultModels)));
    setSelectedCatSlug(categories[0]?.slug);
    setSelectedModelSlug(null);
    setEditingVariantId(null);
    showToast('Каталог сброшен');
  };

  return (
    <div className="admin-page">
      <header className="admin-head">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Logotype size={22} />
          <div>
            <div className="admin-head__title">Каталог · Редактор</div>
            <div className="admin-head__sub">Изменения сохраняются в localStorage → мгновенно применяются к /catalog/</div>
          </div>
        </div>
        <div className="admin-head__actions">
          {toast && (
            <span style={{ padding: '6px 12px', background: 'var(--mint)', color: 'var(--ink)', borderRadius: 999, fontFamily: 'var(--body)', fontWeight: 700, fontSize: 12 }}>
              ✓ {toast}
            </span>
          )}
          <a href="catalog.html" className="admin-btn ghost">К каталогу →</a>
          <a href="index v6.html" className="admin-btn primary">К сайту →</a>
        </div>
      </header>

      <div className="admin-grid">
        {/* COLUMN 1 — CATEGORIES */}
        <div className="admin-col">
          <div className="admin-col__head">
            <div className="admin-col__title">Категории · {categories.length}</div>
            <button onClick={addCategory} className="admin-col__add">+ Добавить</button>
          </div>
          {categories.map(c => (
            <div key={c.slug}>
              <div
                className={`admin-item ${selectedCatSlug === c.slug ? 'active' : ''}`}
                onClick={() => { setSelectedCatSlug(c.slug); setSelectedModelSlug(null); setEditingVariantId(null); }}
              >
                <div className="admin-item__thumb">📦</div>
                <div className="admin-item__main">
                  <div className="admin-item__name">{c.title}</div>
                  <div className="admin-item__sub">/{c.slug}/ · {c.active === false ? 'выкл' : 'активна'}</div>
                </div>
                <span className="admin-item__gear" onClick={e => { e.stopPropagation(); setEditingCat(editingCat === c.slug ? null : c.slug); }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="6" r="2"/><path d="M6 1 L6 3 M6 9 L6 11 M1 6 L3 6 M9 6 L11 6"/></svg>
                </span>
              </div>
              {editingCat === c.slug && (
                <CategoryEditor
                  category={c}
                  onUpdate={patch => updateCategory(c.slug, patch)}
                  onClose={() => setEditingCat(null)}
                />
              )}
            </div>
          ))}
        </div>

        {/* COLUMN 2 — MODELS */}
        <div className="admin-col">
          <div className="admin-col__head">
            <div className="admin-col__title">Модели · {categoryModels.length}</div>
            <button onClick={addModel} className="admin-col__add" disabled={!selectedCatSlug}>+ Модель</button>
          </div>
          {categoryModels.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)).map(m => {
            const thumb = m.variants?.[0]?.image;
            return (
              <div
                key={m.slug}
                className={`admin-item ${selectedModelSlug === m.slug ? 'active' : ''}`}
                onClick={() => { setSelectedModelSlug(m.slug); setEditingVariantId(null); }}
              >
                <div className="admin-item__thumb">
                  {thumb ? <img src={thumb} alt="" /> : '📷'}
                </div>
                <div className="admin-item__main">
                  <div className="admin-item__name">{m.name}</div>
                  <div className="admin-item__sub">{(m.variants || []).length} вар. · #{m.sortOrder ?? '–'}</div>
                </div>
              </div>
            );
          })}
          {categoryModels.length === 0 && (
            <div style={{ color: 'var(--muted)', fontSize: 13, textAlign: 'center', padding: '40px 0' }}>
              Моделей нет. Нажмите «+ Модель», чтобы добавить.
            </div>
          )}
        </div>

        {/* COLUMN 3 — EDITOR */}
        <div className="admin-col" style={{ minHeight: 600 }}>
          {!selectedModel ? (
            <div style={{ color: 'var(--muted)', fontSize: 14, textAlign: 'center', padding: '100px 20px' }}>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 18, color: 'var(--ink)', marginBottom: 8 }}>
                Выберите модель
              </div>
              Нажмите на модель слева, чтобы редактировать. Или создайте новую через «+ Модель».
            </div>
          ) : editingVariantId ? (
            <VariantEditor
              key={editingVariantId}
              variant={(selectedModel.variants || []).find(v => v.id === editingVariantId) || null}
              onUpdate={patch => updateVariant(editingVariantId, patch)}
              onDuplicate={() => duplicateVariant(editingVariantId)}
              onDelete={() => deleteVariant(editingVariantId)}
              onClose={() => setEditingVariantId(null)}
            />
          ) : (
            <ModelEditor
              key={selectedModel.slug}
              model={selectedModel}
              onUpdate={patch => updateModel(selectedModel.slug, patch)}
              onDuplicate={() => duplicateModel(selectedModel.slug)}
              onDelete={() => deleteModel(selectedModel.slug)}
              onAddVariant={addVariant}
              onEditVariant={vid => setEditingVariantId(vid)}
              onDuplicateVariant={vid => duplicateVariant(vid)}
              onDeleteVariant={vid => deleteVariant(vid)}
            />
          )}
        </div>
      </div>

      <details className="admin-extra">
        <summary>Дополнительно: экспорт / импорт / сброс</summary>
        <div className="admin-extra__body">
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>
            Экспортируйте JSON для переноса в <code style={{ background: 'var(--paper-2)', padding: '2px 6px', borderRadius: 4 }}>lib/catalogModels.ts</code>. Сброс вернёт исходные данные.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={copyJson} className="admin-btn primary">Скопировать JSON в буфер</button>
            <button onClick={resetAll} className="admin-btn danger">Сбросить к исходным</button>
          </div>
          <textarea
            value={exportJson()}
            onChange={e => {
              try {
                const parsed = JSON.parse(e.target.value);
                persist(parsed);
                showToast('JSON импортирован');
              } catch (err) {
                /* ignore parse errors while editing */
              }
            }}
          ></textarea>
        </div>
      </details>
    </div>
  );
}

/* ---------- CATEGORY EDITOR (inline) ---------- */
function CategoryEditor({ category, onUpdate, onClose }) {
  return (
    <div style={{ background: 'var(--paper-2)', borderRadius: 14, padding: 14, marginTop: -4, marginBottom: 4, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div className="admin-form__row">
        <div className="admin-form__field">
          <label>Название</label>
          <input type="text" value={category.title} onChange={e => onUpdate({ title: e.target.value })} />
        </div>
        <div className="admin-form__field">
          <label>Slug {category.built_in && <span style={{ color: 'var(--coral)' }}>· системная</span>}</label>
          <input type="text" value={category.slug} disabled={category.built_in} onChange={e => onUpdate({ slug: e.target.value })} />
        </div>
      </div>
      <div className="admin-form__field">
        <label>Краткое описание</label>
        <textarea rows="2" value={category.short || ''} onChange={e => onUpdate({ short: e.target.value })}></textarea>
      </div>
      <div className="admin-form__row triple">
        <div className="admin-form__field">
          <label>Бейдж</label>
          <input type="text" value={category.badge || ''} onChange={e => onUpdate({ badge: e.target.value })} />
        </div>
        <div className="admin-form__field">
          <label>Порядок</label>
          <input type="number" value={category.sortOrder || 0} onChange={e => onUpdate({ sortOrder: +e.target.value })} />
        </div>
        <div className="admin-form__field" style={{ justifyContent: 'flex-end' }}>
          <label className="admin-form__check">
            <input type="checkbox" checked={category.active !== false} onChange={e => onUpdate({ active: e.target.checked })} />
            Активна
          </label>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 4 }}>
        <button onClick={onClose} className="admin-btn ghost">Закрыть</button>
      </div>
    </div>
  );
}

/* ---------- MODEL EDITOR ---------- */
function ModelEditor({ model, onUpdate, onDuplicate, onDelete, onAddVariant, onEditVariant, onDuplicateVariant, onDeleteVariant }) {
  const [draft, setDraft] = React.useState(model);
  React.useEffect(() => setDraft(model), [model.slug]);

  const update = (patch) => {
    const next = { ...draft, ...patch };
    setDraft(next);
    onUpdate(patch);
  };
  return (
    <div>
      <div className="admin-col__head">
        <div className="admin-col__title">Модель: {draft.name}</div>
        <span style={{ fontSize: 11, color: 'var(--muted)' }}>{(draft.variants || []).length} вариант(а/ов)</span>
      </div>

      <div className="admin-form">
        <div className="admin-form__row">
          <div className="admin-form__field">
            <label>Название</label>
            <input type="text" value={draft.name || ''} onChange={e => update({ name: e.target.value })} />
          </div>
          <div className="admin-form__field">
            <label>Slug</label>
            <input type="text" value={draft.slug || ''} disabled />
          </div>
        </div>
        <div className="admin-form__row">
          <div className="admin-form__field">
            <label>Подзаголовок</label>
            <input type="text" value={draft.subtitle || ''} onChange={e => update({ subtitle: e.target.value })} />
          </div>
          <div className="admin-form__field">
            <label>Код лекала</label>
            <input type="text" value={draft.patternCode || ''} onChange={e => update({ patternCode: e.target.value })} />
          </div>
        </div>
        <div className="admin-form__field">
          <label>Бейджи (через запятую)</label>
          <input type="text" value={(draft.badges || []).join(', ')} onChange={e => update({ badges: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
        </div>

        <div className="admin-form__field">
          <label>Краткое описание (на карточке)</label>
          <textarea rows="2" value={draft.shortDesc || ''} onChange={e => update({ shortDesc: e.target.value })}></textarea>
        </div>
        <div className="admin-form__field">
          <label>Полное описание</label>
          <textarea rows="3" value={draft.desc || ''} onChange={e => update({ desc: e.target.value })}></textarea>
        </div>

        <div className="admin-form__row triple">
          <div className="admin-form__field">
            <label style={{ visibility: 'hidden' }}>x</label>
            <label className="admin-form__check">
              <input type="checkbox" checked={draft.active !== false} onChange={e => update({ active: e.target.checked })} />
              Модель активна
            </label>
          </div>
          <div className="admin-form__field">
            <label>Порядок</label>
            <input type="number" value={draft.sortOrder || 0} onChange={e => update({ sortOrder: +e.target.value })} />
          </div>
          <div></div>
        </div>

        <div className="admin-form__row">
          <div className="admin-form__field">
            <label>Характеристики (по строке)</label>
            <textarea rows="3" value={arrToLines(draft.features)} onChange={e => update({ features: linesToArr(e.target.value) })}></textarea>
          </div>
          <div className="admin-form__field">
            <label>Подходит для (по строке)</label>
            <textarea rows="3" value={arrToLines(draft.tasks)} onChange={e => update({ tasks: linesToArr(e.target.value) })}></textarea>
          </div>
        </div>
        <div className="admin-form__row">
          <div className="admin-form__field">
            <label>Брендирование (по строке)</label>
            <textarea rows="3" value={arrToLines(draft.brandings)} onChange={e => update({ brandings: linesToArr(e.target.value) })}></textarea>
          </div>
          <div className="admin-form__field">
            <label>Что можно настроить (по строке)</label>
            <textarea rows="3" value={arrToLines(draft.customize)} onChange={e => update({ customize: linesToArr(e.target.value) })}></textarea>
          </div>
        </div>

        {/* Variants list */}
        <div style={{ marginTop: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div className="admin-col__title">Варианты модели</div>
            <button className="admin-col__add" onClick={onAddVariant}>+ Вариант</button>
          </div>
          {(draft.variants || []).length === 0 && (
            <div style={{ color: 'var(--muted)', fontSize: 12.5, textAlign: 'center', padding: '16px 0' }}>
              Вариантов нет — добавьте первый.
            </div>
          )}
          <div className="admin-variants">
            {(draft.variants || []).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)).map(v => (
              <div key={v.id} className="admin-variant">
                <div className="admin-variant__thumb">
                  {v.image ? <img src={v.image} alt="" /> : '📦'}
                </div>
                <div className="admin-variant__main">
                  <div className="admin-variant__name">{v.name}</div>
                  <div className="admin-variant__sub">{v.subtitle || v.patternCode || '—'}</div>
                </div>
                <div className="admin-variant__actions">
                  <button className="admin-variant__btn" onClick={() => onEditVariant(v.id)} aria-label="Редактировать">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 11 L2 13 L4 13 L11 6 L9 4 Z M10 3 L11 4"/></svg>
                  </button>
                  <button className="admin-variant__btn" onClick={() => onDuplicateVariant(v.id)} aria-label="Дубликат">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="7" height="7"/><rect x="5" y="5" width="7" height="7" fill="var(--paper)"/></svg>
                  </button>
                  <button className="admin-variant__btn" onClick={() => onDeleteVariant(v.id)} aria-label="Удалить">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 4 L11 4 M5 4 L5 11 M9 4 L9 11 M6 4 L6 2 L8 2 L8 4"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-form__actions">
          <button className="admin-btn primary" onClick={() => alert('Сохранено в localStorage')}>
            Сохранено ✓
          </button>
          <button className="admin-btn ghost" onClick={onDuplicate}>Дублировать модель</button>
          <button className="admin-btn danger" onClick={onDelete} style={{ marginLeft: 'auto' }}>Удалить модель</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- VARIANT EDITOR ---------- */
function VariantEditor({ variant, onUpdate, onDuplicate, onDelete, onClose }) {
  const [draft, setDraft] = React.useState(variant);
  React.useEffect(() => setDraft(variant), [variant?.id]);

  if (!variant) return null;

  const update = (patch) => {
    const next = { ...draft, ...patch };
    setDraft(next);
    onUpdate(patch);
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => update({ image: e.target.result });
    reader.readAsDataURL(file);
  };

  const addColor = () => {
    update({ colors: [...(draft.colors || []), { name: 'Новый', hex: '#cccccc' }] });
  };
  const updateColor = (idx, patch) => {
    const colors = [...(draft.colors || [])];
    colors[idx] = { ...colors[idx], ...patch };
    update({ colors });
  };
  const removeColor = (idx) => {
    update({ colors: (draft.colors || []).filter((_, i) => i !== idx) });
  };

  return (
    <div>
      <div className="admin-col__head">
        <div className="admin-col__title">Вариант: {draft.name || '—'}</div>
        <button onClick={onClose} className="admin-btn ghost">← К модели</button>
      </div>

      <div className="admin-form">
        <div className="admin-form__row">
          <div className="admin-form__field">
            <label>Название</label>
            <input type="text" value={draft.name || ''} onChange={e => update({ name: e.target.value })} />
          </div>
          <div className="admin-form__field">
            <label>Подзаголовок</label>
            <input type="text" value={draft.subtitle || ''} onChange={e => update({ subtitle: e.target.value })} />
          </div>
        </div>
        <div className="admin-form__row triple">
          <div className="admin-form__field">
            <label>Код лекала</label>
            <input type="text" value={draft.patternCode || ''} onChange={e => update({ patternCode: e.target.value })} />
          </div>
          <div className="admin-form__field">
            <label>Порядок</label>
            <input type="number" value={draft.sortOrder || 0} onChange={e => update({ sortOrder: +e.target.value })} />
          </div>
          <div className="admin-form__field">
            <label style={{ visibility: 'hidden' }}>.</label>
            <label className="admin-form__check">
              <input type="checkbox" checked={draft.active !== false} onChange={e => update({ active: e.target.checked })} />
              Активен
            </label>
          </div>
        </div>

        <div className="admin-form__field">
          <label>Описание варианта</label>
          <textarea rows="3" value={draft.desc || ''} onChange={e => update({ desc: e.target.value })}></textarea>
        </div>

        {/* IMAGE FIELD */}
        <div className="admin-form__field">
          <label>Фото варианта</label>
          <div className="admin-image">
            <div className="admin-image__field" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <input
                type="text"
                placeholder="URL изображения (или загрузите файл →)"
                value={draft.image || ''}
                onChange={e => update({ image: e.target.value })}
              />
              <input
                type="file"
                accept="image/*"
                onChange={e => handleFileUpload(e.target.files[0])}
                style={{ fontSize: 12 }}
              />
            </div>
            <div className="admin-image__preview">
              {draft.image ? <img src={draft.image} alt="" /> : '📷'}
              {draft.image && (
                <div className="admin-image__overlay">
                  <button onClick={() => update({ image: null })} aria-label="Удалить">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 3 L11 11 M3 11 L11 3"/></svg>
                  </button>
                  <a href={draft.image} target="_blank" rel="noopener" aria-label="Открыть">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 11 L11 3 M5 3 L11 3 L11 9"/></svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="admin-form__row">
          <div className="admin-form__field">
            <label>Характеристики (по строке)</label>
            <textarea rows="3" value={arrToLines(draft.features)} onChange={e => update({ features: linesToArr(e.target.value) })}></textarea>
          </div>
          <div className="admin-form__field">
            <label>Подходит для (по строке)</label>
            <textarea rows="3" value={arrToLines(draft.tasks)} onChange={e => update({ tasks: linesToArr(e.target.value) })}></textarea>
          </div>
        </div>
        <div className="admin-form__row">
          <div className="admin-form__field">
            <label>Материалы (по строке)</label>
            <textarea rows="2" value={arrToLines(draft.materials)} onChange={e => update({ materials: linesToArr(e.target.value) })}></textarea>
          </div>
          <div className="admin-form__field">
            <label>Плотности (по строке)</label>
            <textarea rows="2" value={arrToLines(draft.densities)} onChange={e => update({ densities: linesToArr(e.target.value) })}></textarea>
          </div>
        </div>
        <div className="admin-form__row">
          <div className="admin-form__field">
            <label>Размеры (по строке)</label>
            <textarea rows="2" value={arrToLines(draft.sizes)} onChange={e => update({ sizes: linesToArr(e.target.value) })}></textarea>
          </div>
          <div className="admin-form__field">
            <label>Места нанесения (по строке)</label>
            <textarea rows="2" value={arrToLines(draft.printLocations)} onChange={e => update({ printLocations: linesToArr(e.target.value) })}></textarea>
          </div>
        </div>
        <div className="admin-form__row">
          <div className="admin-form__field">
            <label>Брендирование (по строке)</label>
            <textarea rows="3" value={arrToLines(draft.brandings)} onChange={e => update({ brandings: linesToArr(e.target.value) })}></textarea>
          </div>
          <div className="admin-form__field">
            <label>Что можно настроить (по строке)</label>
            <textarea rows="3" value={arrToLines(draft.customize)} onChange={e => update({ customize: linesToArr(e.target.value) })}></textarea>
          </div>
        </div>

        {/* COLOR EDITOR */}
        <div className="admin-form__field">
          <label>Цвета</label>
          <div className="admin-colors">
            {(draft.colors || []).map((c, i) => (
              <div className="admin-color" key={i}>
                <input
                  type="color"
                  className="sw"
                  value={c.hex}
                  onChange={e => updateColor(i, { hex: e.target.value })}
                  aria-label={c.name}
                />
                <input
                  type="text"
                  className="color-name"
                  value={c.name}
                  onChange={e => updateColor(i, { name: e.target.value })}
                />
                <input
                  type="text"
                  className="color-hex"
                  value={c.hex}
                  onChange={e => updateColor(i, { hex: e.target.value })}
                />
                <span className="admin-color__rm" onClick={() => removeColor(i)}>×</span>
              </div>
            ))}
            <button className="admin-color__add" onClick={addColor}>+ Цвет</button>
          </div>
        </div>

        <div className="admin-form__actions">
          <button className="admin-btn primary" onClick={() => alert('Вариант сохранён в localStorage')}>
            Сохранено ✓
          </button>
          <button className="admin-btn ghost" onClick={onDuplicate}>Дублировать</button>
          <button className="admin-btn danger" onClick={onDelete} style={{ marginLeft: 'auto' }}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
