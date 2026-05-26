'use client';

import { ReactNode, MouseEvent, AnchorHTMLAttributes } from 'react';
import { openRequestModal } from './openRequestModal';

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick' | 'children'> {
  children: ReactNode;
  // Куда упасть, если у пользователя выключен JS (тогда модалка не откроется).
  // По умолчанию — якорь #request на главной, который скроллит к старой форме.
  fallbackHref?: string;
}

// Универсальная замена <a href="/#request">.
// С JS — открывает модалку. Без JS — обычная ссылка-скролл к форме.
export default function RequestLink({ children, fallbackHref = '/#request', ...rest }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.button === 1) return; // не перехватываем cmd+click
    e.preventDefault();
    openRequestModal();
  };

  return (
    <a {...rest} href={fallbackHref} onClick={handleClick}>
      {children}
    </a>
  );
}
