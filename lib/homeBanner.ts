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
  title: 'Создаём мерч, который носят не только в офисе',
  subtitle: 'Промо-одежда и корпоративный мерч под ключ: от идеи, дизайна и образца до пошива, нанесения логотипа, упаковки и доставки.',
  mediaType: 'video',
  videoSrc: '/videos/hero-production.mp4',
  posterSrc: '/images/hero-poster.jpg',
  mediaLabel: 'Видео производства',
  badges: [
    { title: '🏭', text: 'Собственный швейный цех' },
    { title: '🎨', text: '9 методов нанесения' },
    { title: '✅', text: 'Образец перед тиражом' },
    { title: '🏢', text: 'Работаем с юрлицами' },
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
