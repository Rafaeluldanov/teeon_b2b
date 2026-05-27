// Один helper для открытия глобальной модалки заявки.
// Использовать вместо <a href="#request"> чтобы избежать прыжка в подвал.
//
// Использование:
//   <button onClick={() => openRequestModal()}>В расчёт</button>
//   <button onClick={() => openRequestModal({ source: 'Каталог · Футболки', image: '/images/...' })}>
//     В расчёт
//   </button>
//
// Для <a href="/#request">-ссылок проще проставить data-request-source /
// data-request-image на родителе карточки — глобальный обработчик в
// RequestModal.tsx сам подхватит их при клике.

import { REQUEST_MODAL_OPEN_EVENT } from './RequestModal';

export interface RequestSourceContext {
  source?: string;
  image?: string;
}

export function openRequestModal(ctx?: RequestSourceContext): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(REQUEST_MODAL_OPEN_EVENT, { detail: ctx }));
}
