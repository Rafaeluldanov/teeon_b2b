// Один helper для открытия глобальной модалки заявки.
// Использовать вместо <a href="#request"> чтобы избежать прыжка в подвал.
//
// Использование:
//   <button onClick={openRequestModal}>В расчёт</button>
//   <a href="/#request" onClick={(e) => { e.preventDefault(); openRequestModal(); }}>...</a>
//                                                                 (для SSR-fallback, если JS выключен)

import { REQUEST_MODAL_OPEN_EVENT } from './RequestModal';

export function openRequestModal(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(REQUEST_MODAL_OPEN_EVENT));
}
