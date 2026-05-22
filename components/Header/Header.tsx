'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
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

const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 13.63l-2.966-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.994.929z"/>
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [mobileBrandingOpen, setMobileBrandingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overrideContacts, setOverrideContacts] = useState<EditableContacts | null>(null);

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
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.inner} container`}>
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
            href={`https://t.me/${telegram.replace('@', '')}`}
            className={styles.messengerBtn}
            aria-label="Написать в Telegram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramIcon />
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

      {mobileOpen && <div className={styles.overlay} onClick={closeMobile} aria-hidden="true" />}

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`} aria-hidden={!mobileOpen}>
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
    </header>
  );
}
