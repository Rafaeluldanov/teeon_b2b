export type BannerTextPosition =
  | 'left-center'
  | 'center-center'
  | 'right-center'
  | 'left-top'
  | 'center-top'
  | 'right-top'
  | 'left-bottom'
  | 'center-bottom'
  | 'right-bottom';

export interface BannerBadge {
  title: string;
  text: string;
}

export interface BannerCta {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface HomeBannerContent {
  eyebrow?: string;
  title: string;
  subtitle: string;
  mediaType: 'video' | 'image';
  videoSrc?: string;
  posterSrc?: string;
  imageSrc?: string;
  mediaLabel?: string;
  badges: BannerBadge[];
  ctas: BannerCta[];
  isActive: boolean;
  textPosition: BannerTextPosition;
  overlayOpacity: number;
  textMaxWidth: string;
}

export const defaultHomeBanner: HomeBannerContent = {
  title: 'Корпоративный мерч полного цикла — <em>от идеи до поставки</em>',
  subtitle: 'Создаём корпоративную и рекламную продукцию с нанесением логотипа: собственное производство 1000 м² в Москве, 15+ станков персонализации и швейный цех на 50 машин Juki. Вся продукция произведена в России.',
  // Без медиа по умолчанию: реальные файлы /videos/hero-production.mp4 и /images/hero-poster.jpg
  // никогда не лежали в /public/ — баннер настраивается через админку (UploadFile -> WebP).
  mediaType: 'image',
  mediaLabel: 'Видео производства',
  badges: [
    { title: '🏭', text: 'Производство 1000 м² в Москве' },
    { title: '⚙️', text: '15+ станков персонализации' },
    { title: '🧵', text: '50 машин Juki, 150 000 изд/мес' },
    { title: '🤝', text: '300+ постоянных клиентов' },
  ],
  ctas: [
    { label: 'Рассчитать стоимость', href: '#request', variant: 'primary' },
    { label: 'Смотреть каталог', href: '#catalog', variant: 'secondary' },
  ],
  isActive: true,
  textPosition: 'left-center',
  overlayOpacity: 0.55,
  textMaxWidth: '680px',
};
