'use client';

import { useState, useEffect } from 'react';
import { defaultHomeBanner } from '@/lib/homeBanner';
import type { HomeBannerContent, BannerTextPosition } from '@/lib/homeBanner';
import styles from './Hero.module.css';

const LS_KEY = 'teeon_admin_home_banner';

const BADGE_ICONS = [
  <svg key="b1" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 9 L8 6 L9 7 Q11 8 13 7 L14 6 L17 9 L15 12 L13 11 L13 17 L9 17 L9 11 L7 12 Z"/></svg>,
  <svg key="b2" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="10" cy="10" r="6"/><path d="M7 10 L9 12 L13 8"/></svg>,
  <svg key="b3" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M10 3 L16 6 L16 11 Q16 15 10 17 Q4 15 4 11 L4 6 Z"/><path d="M7 10 L9 12 L13 8"/></svg>,
  <svg key="b4" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="7" width="10" height="7"/><path d="M13 9 L16 9 L17 11 L17 14 L13 14"/><circle cx="7" cy="15" r="1.5"/><circle cx="15" cy="15" r="1.5"/></svg>,
];

const DEFAULT_BADGES = [
  { title: 'Сроки в договоре', text: 'фиксируем дату передачи тиража' },
  { title: 'Образец до тиража', text: 'утверждаем pre-production sample' },
  { title: 'Контроль партии', text: 'пошив, нанесение, упаковка под надзором' },
  { title: 'Без посредников', text: 'своё производство 1000 м² в Москве' },
];

// Старые дефолтные заголовки баннера. Если в браузере пользователя сохранён
// один из них в localStorage — миграция перепишет на новый дефолт.
// Кастомные тексты (всё, что не в этом списке) остаются нетронутыми.
const OLD_DEFAULT_TITLES = [
  'Создаём мерч, который носят не только в офисе',
  'Корпоративный мерч полного цикла — <em>от идеи до поставки</em>',
  'Корпоративный мерч полного цикла — от идеи до поставки',
];

const DEFAULT_STATS = [
  { kicker: '⏳ На рынке', val: 'с 2018', unit: 'года', desc: 'производство полного цикла в Москве', cls: '' },
  { kicker: '⌂ Производство', val: '1000', unit: 'м²', desc: 'собственный цех в Москве', cls: 'yellow' },
  { kicker: '✦ Реализовано', val: '3000', unit: '+ кейсов', desc: 'успешных проектов с брендированием', cls: 'blue' },
  { kicker: '🤝 Клиентов', val: '300', unit: '+', desc: 'постоянных корпоративных заказчиков', cls: '' },
];

const V_CLASS: Record<string, string> = {
  top: styles.vTop,
  center: styles.vCenter,
  bottom: styles.vBottom,
};
const H_CLASS: Record<string, string> = {
  left: styles.hLeft,
  center: styles.hCenter,
  right: styles.hRight,
};

function getPositionClasses(pos: BannerTextPosition) {
  const [hPart, vPart] = pos.split('-') as [string, string];
  return {
    vClass: V_CLASS[vPart] ?? styles.vCenter,
    hClass: H_CLASS[hPart] ?? styles.hLeft,
    isCenterH: hPart === 'center',
  };
}

export default function Hero() {
  const [banner, setBanner] = useState<HomeBannerContent>(defaultHomeBanner);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as HomeBannerContent;
        if (parsed.isActive !== false) setBanner(parsed);
      }
    } catch { /* ignore */ }
  }, []);

  const ctas = banner.ctas.length > 0 ? banner.ctas : defaultHomeBanner.ctas;
  const textPosition = banner.textPosition ?? 'left-center';
  const overlayOpacity = banner.overlayOpacity ?? 0.88;
  const textMaxWidth = banner.textMaxWidth ?? '760px';
  const { vClass, hClass, isCenterH } = getPositionClasses(textPosition);

  const hasMedia = (banner.mediaType === 'video' && banner.videoSrc) ||
                   (banner.mediaType === 'image' && banner.imageSrc);

  return (
    <>
      <section
        className={`${styles.hero} ${vClass} ${hClass}`}
        aria-label="Главный баннер"
        style={{
          '--hero-overlay-opacity': String(overlayOpacity),
          '--hero-text-max-width': textMaxWidth,
        } as React.CSSProperties}
      >
        {/* Media layer */}
        {hasMedia && (
          <div className={styles.mediaLayer} aria-hidden="true">
            {banner.mediaType === 'image' && banner.imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={banner.imageSrc} alt="" className={styles.mediaBg} decoding="async" fetchPriority="high" />
            ) : (
              <video
                className={styles.mediaBg}
                autoPlay muted loop playsInline preload="none"
                {...(banner.posterSrc ? { poster: banner.posterSrc } : {})}
              >
                {banner.videoSrc && <source src={banner.videoSrc} type="video/mp4" />}
              </video>
            )}
          </div>
        )}

        {/* Overlay */}
        <div className={styles.overlay} aria-hidden="true" />

        {/* Inner content */}
        <div className={styles.inner}>
          <div className={`${styles.content} ${isCenterH ? styles.contentCenter : ''}`}>
            {banner.eyebrow && (
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                {banner.eyebrow}
              </span>
            )}
            <h1 className={styles.title}
              dangerouslySetInnerHTML={{ __html: banner.title.replace(/<em>/g, '<em style="color:var(--yellow);font-style:normal">') }}
            />
            <p className={styles.subtitle}>{banner.subtitle}</p>
            <div className={styles.actions}>
              {ctas.map((cta, i) => (
                <a
                  key={i}
                  href={cta.href}
                  className={cta.variant === 'primary' ? 'v6-btn v6-btn--yellow' : 'v6-btn v6-btn--ghost'}
                >
                  {cta.label}
                  {cta.variant === 'primary' && (
                    <span className="v6-ic" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Badge cards at bottom */}
          <div className={styles.badgesRow} aria-label="Ключевые преимущества">
            {DEFAULT_BADGES.map((b, i) => (
              <div key={i} className={styles.badge}>
                <span className={styles.badgeIcon} aria-hidden="true">{BADGE_ICONS[i]}</span>
                <div>
                  <div className={styles.badgeTitle}>{b.title}</div>
                  <div className={styles.badgeDesc}>{b.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats row right below hero */}
      <div className={styles.statsRow} aria-label="Характеристики производства">
        {DEFAULT_STATS.map((s) => (
          <div key={s.kicker} className={`${styles.statCard} ${s.cls ? styles[s.cls as keyof typeof styles] : ''}`}>
            <div className={styles.statKicker}>{s.kicker}</div>
            <div className={styles.statVal}>
              {s.val}<span className={styles.statUnit}>{s.unit}</span>
            </div>
            <div className={styles.statDesc}>{s.desc}</div>
          </div>
        ))}
      </div>
    </>
  );
}
