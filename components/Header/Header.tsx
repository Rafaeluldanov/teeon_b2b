'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { contacts } from '@/lib/contacts';
import { CONTACTS_LS_KEY } from '@/lib/editableContacts';
import type { EditableContacts } from '@/lib/editableContacts';
import { catalogCategories } from '@/lib/catalog';
import { brandingMethods } from '@/lib/branding';
import styles from './Header.module.css';

const ChevronIcon = () => (
  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true">
    <path d="M1 1L5.5 6L10 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MaxIcon = () => (
  <Image
    src="/max-icon.webp"
    alt=""
    width={30}
    height={30}
    className="max-icon-img"
    priority
  />
);

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [mobileBrandingOpen, setMobileBrandingOpen] = useState(false);
  const [overrideContacts, setOverrideContacts] = useState<EditableContacts | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [menuTop, setMenuTop] = useState(82);
  const [mounted, setMounted] = useState(false);

  // Меню рендерится через портал в document.body — этого нет на сервере.
  useEffect(() => { setMounted(true); }, []);

  // Позиционируем меню по РЕАЛЬНОМУ нижнему краю видимой шапки во
  // viewport-координатах. getBoundingClientRect() возвращает фактическое
  // положение на экране независимо от scrollY, transform, sticky и
  // родительских контейнеров — поэтому меню всегда открывается прямо под
  // шапкой, где бы пользователь ни находился на странице.
  const updateMenuTop = useCallback(() => {
    const el = headerRef.current;
    if (!el) return;
    setMenuTop(Math.max(0, Math.round(el.getBoundingClientRect().bottom + 8)));
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    updateMenuTop();
    window.addEventListener('resize', updateMenuTop);
    window.addEventListener('scroll', updateMenuTop, { passive: true });
    return () => {
      window.removeEventListener('resize', updateMenuTop);
      window.removeEventListener('scroll', updateMenuTop);
    };
  }, [mobileOpen, updateMenuTop]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONTACTS_LS_KEY);
      if (raw) setOverrideContacts(JSON.parse(raw) as EditableContacts);
    } catch { /* ignore */ }
  }, []);

  const phone = overrideContacts?.phone ?? contacts.phone;
  const phoneRaw = overrideContacts?.phoneRaw ?? contacts.phoneRaw;
  const email = overrideContacts?.email ?? contacts.email;
  const telegram = overrideContacts?.telegram ?? contacts.telegram;

  useEffect(() => {
    // Блокируем фон через documentElement (html), а НЕ body. Установка
    // overflow:hidden на body ломает position:sticky у шапки в WebKit/Blink:
    // шапка теряет точку прилипания и «улетает» к началу документа, утаскивая
    // за собой меню. На <html> overflow:hidden сохраняет и sticky, и позицию
    // скролла — это и есть первопричина бага «меню улетает наверх».
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileCatalogOpen(false);
    setMobileBrandingOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
    <header ref={headerRef} className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={closeMobile}>
          <span className={styles.logoCapsule}>tee</span><span className={styles.logoAccent}>on</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav} aria-label="Основная навигация">

          {/* Каталог mega-menu */}
          <div className={styles.dropdown}>
            <button
              className={`${styles.navBtn} ${isActive('/catalog') ? styles.navBtnActive : ''}`}
              aria-haspopup="true"
            >
              Каталог <ChevronIcon />
            </button>
            <div className={styles.megaMenu} role="menu">
              <div className={styles.megaTop}>
                <Link href="/catalog/" className={styles.megaAllLink} role="menuitem">
                  <span className={styles.megaAllIcon} aria-hidden="true">☰</span>
                  Весь каталог
                </Link>
              </div>
              <div className={styles.megaGrid}>
                {catalogCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/catalog/${cat.slug}/`}
                    className={styles.megaItem}
                    role="menuitem"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Нанесение mega-menu */}
          <div className={styles.dropdown}>
            <button
              className={`${styles.navBtn} ${isActive('/branding') ? styles.navBtnActive : ''}`}
              aria-haspopup="true"
            >
              Нанесение <ChevronIcon />
            </button>
            <div className={`${styles.megaMenu} ${styles.megaMenuBranding}`} role="menu">
              <div className={styles.megaTop}>
                <Link href="/branding/" className={styles.megaAllLink} role="menuitem">
                  <span className={styles.megaAllIcon} aria-hidden="true">✦</span>
                  Все способы брендирования
                </Link>
              </div>
              <div className={styles.megaGridBranding}>
                {brandingMethods.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/branding/${m.slug}/`}
                    className={styles.megaItem}
                    role="menuitem"
                  >
                    {m.menuTitle}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/suvenirnaya-produkciya/"
            className={`${styles.navLinkGifts} ${isActive('/suvenirnaya-produkciya') ? styles.navLinkActive : ''}`}
          >
            Сувениры
          </Link>
          <Link
            href="/portfolio/"
            className={`${styles.navLink} ${isActive('/portfolio') ? styles.navLinkActive : ''}`}
          >
            Портфолио
          </Link>
          <Link
            href="/about/"
            className={`${styles.navLink} ${isActive('/about') ? styles.navLinkActive : ''}`}
          >
            О компании
          </Link>
          <Link
            href="/faq/"
            className={`${styles.navLink} ${isActive('/faq') ? styles.navLinkActive : ''}`}
          >
            FAQ
          </Link>
          <Link
            href="/contacts/"
            className={`${styles.navLink} ${isActive('/contacts') ? styles.navLinkActive : ''}`}
          >
            Контакты
          </Link>
        </nav>

        {/* Right: contacts + messenger + CTA */}
        <div className={styles.contacts}>
          <div className={styles.contactInfo}>
            <a href={`mailto:${email}`} className={styles.contactEmail}>{email}</a>
            <a href={`tel:+${phoneRaw}`} className={styles.contactPhone}>{phone}</a>
          </div>
          <a
            href={`https://max.ru/${telegram.replace('@', '')}`}
            className={styles.messengerBtn}
            aria-label="Написать в МАКС"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MaxIcon />
          </a>
          <a href="/#request" className={styles.ctaBtn}>Проконсультироваться</a>
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>

    {/* Оверлей и мобильное меню рендерятся через ПОРТАЛ прямо в document.body.
        У хедера есть transform + will-change (для плавного скролла на iOS),
        что делает его containing block для fixed-потомков. Портал выносит меню
        из-под любого такого предка, поэтому position:fixed снова считается от
        viewport. Координата top вычисляется по реальному getBoundingClientRect()
        видимой шапки — меню всегда открывается ровно под ней, независимо от
        scrollY, transform, sticky и положения страницы. */}
    {mounted && createPortal(
      <>
      {mobileOpen && <div className={styles.overlay} onClick={closeMobile} aria-hidden="true" />}

      {/* Mobile menu */}
      <div
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!mobileOpen}
        data-testid="mobile-menu"
        style={{ top: menuTop }}
      >
        <nav className={styles.mobileNav}>

          {/* Catalog */}
          <div className={styles.mobileGroup}>
            <button
              className={styles.mobileGroupBtn}
              onClick={() => setMobileCatalogOpen((v) => !v)}
              aria-expanded={mobileCatalogOpen}
            >
              Каталог
              <span className={`${styles.mobileChevron} ${mobileCatalogOpen ? styles.mobileChevronOpen : ''}`}>
                <ChevronIcon />
              </span>
            </button>
            {mobileCatalogOpen && (
              <div className={styles.mobileGroupItems}>
                <Link href="/catalog/" className={`${styles.mobileGroupItem} ${styles.mobileAllLink}`} onClick={closeMobile}>
                  ☰ Весь каталог
                </Link>
                {catalogCategories.map((cat) => (
                  <Link key={cat.slug} href={`/catalog/${cat.slug}/`} className={styles.mobileGroupItem} onClick={closeMobile}>
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Нанесение */}
          <div className={styles.mobileGroup}>
            <button
              className={styles.mobileGroupBtn}
              onClick={() => setMobileBrandingOpen((v) => !v)}
              aria-expanded={mobileBrandingOpen}
            >
              Нанесение
              <span className={`${styles.mobileChevron} ${mobileBrandingOpen ? styles.mobileChevronOpen : ''}`}>
                <ChevronIcon />
              </span>
            </button>
            {mobileBrandingOpen && (
              <div className={styles.mobileGroupItems}>
                <Link href="/branding/" className={`${styles.mobileGroupItem} ${styles.mobileAllLink}`} onClick={closeMobile}>
                  ✦ Все способы брендирования
                </Link>
                {brandingMethods.map((m) => (
                  <Link key={m.slug} href={`/branding/${m.slug}/`} className={styles.mobileGroupItem} onClick={closeMobile}>
                    {m.menuTitle}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/suvenirnaya-produkciya/" className={styles.mobileNavLink} onClick={closeMobile}>Сувениры</Link>
          <Link href="/portfolio/" className={styles.mobileNavLink} onClick={closeMobile}>Портфолио</Link>
          <Link href="/about/" className={styles.mobileNavLink} onClick={closeMobile}>О компании</Link>
          <Link href="/faq/" className={styles.mobileNavLink} onClick={closeMobile}>FAQ</Link>
          <Link href="/contacts/" className={styles.mobileNavLink} onClick={closeMobile}>Контакты</Link>

          <div className={styles.mobileDivider} />
          <a href={`tel:+${phoneRaw}`} className={styles.mobilePhone}>{phone}</a>
          <a href={`mailto:${email}`} className={styles.mobileEmail}>{email}</a>
          <a href="/#request" className={styles.mobileCtaBtn} onClick={closeMobile}>Проконсультироваться</a>
        </nav>
      </div>
      </>,
      document.body
    )}
    </>
  );
}
