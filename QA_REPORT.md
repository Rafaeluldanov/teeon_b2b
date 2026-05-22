# QA Отчёт — TEEON B2B сайт

**Дата проверки:** 18.05.2026  
**Стек:** Next.js 14.2.5 · React 18 · TypeScript · App Router · CSS Modules  
**Окружение:** macOS, Node.js v24, localhost:3000 (dev-режим)

---

## 1. Итоговый статус всех команд

| Команда | Результат |
|---|---|
| `npm run lint` | ✅ 0 ошибок |
| `npm run build` | ✅ 45 страниц, 0 ошибок |
| `npm run seo:audit` | ✅ 0 ошибок, 0 предупреждений |
| `npm run test:form` | ✅ 3/3 (API + Ethereal previewUrl) |
| `npm run test:e2e` | ✅ **152/152** |

---

## 2. Почему падали UI-тесты форм — диагноз

Было 2 failing теста: «Форма на главной отправляется успешно» и «Форма на /contacts/ отправляется успешно».

### Причина 1 — `product` и `qty` selects были **controlled компонентами**

```tsx
// Было (controlled):
<select value={prefillTopic} onChange={(e) => setPrefillTopic(e.target.value)}>
```

React контролировал DOM-значение через state `prefillTopic`. После любого ре-рендера React принудительно восстанавливал значение из state. Попытки Playwright выставить значение через native setter или `dispatchEvent` внутри `page.evaluate()` — не работали: React реагировал только на синтетические события, dispatch из evaluate не попадал в React synthetic event system.

### Причина 2 — `form.requestSubmit()` из `page.evaluate()` **не триггерит React onSubmit**

Когда `requestSubmit()` вызывается из `page.evaluate()`, событие `submit` диспатчится от форм-элемента вверх по DOM. В React 18 + Next.js App Router обработчик события прикреплён к корневому контейнеру. Но в контексте headless Chromium вызов из `evaluate` не доходит до React синтетической системы событий — это подтверждалось тем, что кнопка никогда не меняла текст на «Отправляем…» (что происходит при `setLoading(true)` в начале `handleSubmit`).

### Причина 3 — отсутствие сигнала о завершении гидрации

Тест взаимодействовал с формой, не дождавшись, пока React прикрепит все обработчики. После `page.goto('/')` форма уже в DOM (SSR), но React ещё не гидрировал. `toBeEnabled()` на кнопке проходил, потому что `disabled` атрибута не было в исходном HTML (начальный `loading=false`). Но React event handlers ещё не были присоединены.

### Причина 4 (bonus) — SEO audit H1 regex

Скрипт не матчил H1 на странице `/requisites/` из-за того, что Next.js вставляет React comment nodes (`<!-- -->`) при рендере JSX выражений типа `{contacts.companyName}`. Реальный HTML выглядел как `Реквизиты <!-- -->TEEON`, а старый regex требовал парный закрывающий тег после тэга.

---

## 3. Что исправлено

### RequestForm.tsx — 4 изменения

**1. Controlled selects → uncontrolled (key + defaultValue)**

```tsx
// Было:
<select value={prefillTopic} onChange={(e) => setPrefillTopic(e.target.value)}>

// Стало:
<select key={`product-${prefillTopic}`} defaultValue={prefillTopic}>
```

Аналогично для `qty` select. Теперь Playwright's `selectOption()` работает без хаков: DOM value обновляется напрямую и не сбрасывается React.

**2. data-ready attribute — сигнал гидрации**

```tsx
const [ready, setReady] = useState(false);

useEffect(() => {
  setReady(true);
  // ... localStorage logic ...
}, []);

<form data-ready={ready ? 'true' : undefined} ...>
```

Атрибут `data-ready="true"` появляется только после React гидрации (useEffect запускается только клиентски). Тест ждёт этот атрибут перед взаимодействием.

**3. id="rf-form" на форме, id="rf-submit" на кнопке** — надёжные селекторы для тестов.

**4. data-testid="form-error" на errorBanner** — для диагностики ошибок в тестах.

### forms.spec.ts — полная перепись

Ключевые изменения:
- Ждём `form[data-ready="true"]` перед любым взаимодействием
- Используем прямые Playwright APIs: `page.locator('#rf-product').selectOption(...)` + `expect(locator).toHaveValue(...)` для подтверждения
- Кнопку кликаем через Playwright `.click()` (не evaluate + requestSubmit)  
- Ожидание результата через `expect(page.getByRole('status')).toBeVisible()`
- Используем реальный API (без mock) — тестируем всю цепочку

### scripts/seo-audit.mjs — fix H1 regex

```js
// Было:
const h1s = [...html.matchAll(/<h1[^>]*>([^<]*(?:<[^/][^>]*>[^<]*<\/[^>]+>[^<]*)*)<\/h1>/gi)]
// Стало:
const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
  .map(m => m[1].replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, '').trim())
  .filter(Boolean);
```

---

## 4. Ethereal Email — результат

**Переменная:** `LEAD_EMAIL_MODE=ethereal` в `.env.local`

**Статус:** ✅ Работает. `test:form` вернул previewUrl:
```
https://ethereal.email/message/agsHOI5FEF1T9-uCagsHOqUBtdysykxtAAAAAdAjH4IOCh.pvAFXzr53.PE
```

Тестовое письмо доступно по ссылке: открывается в браузере без логина.

В dev-режиме (`LEAD_EMAIL_MODE=dev` или пусто) заявки сохраняются в `.tmp/request-submissions/`.

---

## 5. Полные результаты E2E тестов

```
152 passed (48.1s)
```

| Группа тестов | Результат |
|---|---|
| HTTP 200 для всех страниц (44 стр.) | ✅ 44/44 |
| H1, header, footer, JS-ошибки | ✅ 44/44 |
| Навигация — Header | ✅ 8/8 |
| Главная страница — CTA | ✅ 3/3 |
| **Форма главной — UI submit** | ✅ **1/1 (было 0/1)** |
| **Форма контактов — UI submit** | ✅ **1/1 (было 0/1)** |
| Форма honeypot | ✅ 1/1 |
| API формы (прямые тесты) | ✅ 3/3 |
| Admin защита | ✅ 2/2 |
| SEO meta, H1, noindex | ✅ все |
| JSON-LD валидация | ✅ 4/4 |
| Sitemap и Robots | ✅ 2/2 |
| Выбор модели/варианта | ✅ 3/3 |

---

## 6. Что проверялось

| Область | Метод |
|---|---|
| Кликабельность кнопок и навигация | Playwright E2E (152 теста) |
| Загрузка всех страниц (HTTP 200) | Playwright E2E |
| Формы — UI отправка | Playwright E2E (реальный API) |
| API заявок — все режимы | `npm run test:form` |
| Файлы — сохранение | `npm run test:form` с test-logo.txt |
| Ethereal Email | `npm run test:form` в ethereal-режиме |
| SEO — 26 страниц | `npm run seo:audit` |
| Sitemap и Robots | Playwright E2E + SEO audit |
| JSON-LD валидация | SEO audit + Playwright |
| Защита /admin/* | Playwright E2E |

---

## 7. Что нужно заменить перед публикацией

| Что | Где | Действие |
|---|---|---|
| Телефон | `lib/contacts.ts` | `+7 (999) 000-00-00` → реальный |
| Email | `lib/contacts.ts` | Проверить `info@teeon.ru` |
| Telegram | `lib/contacts.ts` | `@teeon_merch` → реальный username |
| WhatsApp | `lib/contacts.ts` | Реальный номер |
| Адрес | `lib/contacts.ts` → `address` | Реальный адрес |
| Реквизиты ИНН/ОГРН | `lib/contacts.ts` → `legalInfo` | Юр. данные |
| Политика ПД | `app/privacy/page.tsx` | Юридически проверенный текст |
| OG-изображение | `public/og-default.svg` | Реальный баннер 1200×630 |
| Фото изделий | `lib/catalogModels.ts` → поле `image` | URL фотографий |
| Фото кейсов | компоненты портфолио | Реальные фото |
| Видео-баннер | `public/videos/hero-production.mp4` | Добавить видео |
| Яндекс.Метрика | `.env.local` | `NEXT_PUBLIC_YANDEX_METRIKA_ID=<id>` |
| Домен | `.env.local` | `NEXT_PUBLIC_SITE_URL=https://teeon.ru` |
| SMTP для заявок | `.env.local` | `LEAD_EMAIL_MODE=smtp` + настройки SMTP |
| `LEAD_TO_EMAIL` | `.env.local` | Email для входящих заявок |

---

## 8. Что проверить вручную перед публикацией

- [ ] Мобильный адаптив (375px): меню, dropdown, форма
- [ ] Форма главной: заполнить → отправить → видеть success
- [ ] Форма /contacts/ с прикреплённым файлом
- [ ] При `LEAD_EMAIL_MODE=smtp` убедиться, что письмо приходит на `LEAD_TO_EMAIL`
- [ ] Вход в `/admin/catalog-editor/` с реальным паролем
- [ ] Редактор в /admin/ — добавить модель, сохранить, проверить preview
- [ ] Sitemap открывается в браузере
- [ ] Robots.txt читаем

---

## 9. Итоговый вердикт

| Параметр | Результат |
|---|---|
| **Технически готов к деплою** | ✅ lint ✓ · build ✓ · 45 страниц |
| **Формы работают end-to-end** | ✅ UI submit ✓ · API ✓ · Ethereal ✓ · Файлы ✓ |
| **SEO-готовность** | ✅ Высокая — 0 ошибок на 26 страницах |
| **E2E-покрытие** | ✅ 152/152 тестов |
| **Для публикации нужно** | Заменить заглушки (контакты, реквизиты, фото, домен, SMTP, Метрика) |

---

## 10. Список изменённых файлов в этой итерации

| Файл | Изменение |
|---|---|
| `components/RequestForm/RequestForm.tsx` | product/qty selects → uncontrolled; data-ready; id на форме и кнопке |
| `tests/e2e/forms.spec.ts` | Полная перепись: waitForFormReady + прямой click + реальный API |
| `scripts/seo-audit.mjs` | Fix H1 regex для React comment nodes (`<!-- -->`) |
| `.env.local` | Добавлен `LEAD_EMAIL_MODE=ethereal` |

*Отчёт обновлён после финального QA-цикла.*
