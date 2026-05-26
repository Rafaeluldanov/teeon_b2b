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
  title: 'Мерч <em>без сорванных сроков</em>, брака и лишних наценок',
  subtitle: 'Фиксируем сроки в договоре, делаем образец перед тиражом и контролируем пошив, нанесение и упаковку на своём производстве.',
  // Без медиа по умолчанию: реальные файлы /videos/hero-production.mp4 и /images/hero-poster.jpg
  // никогда не лежали в /public/ — баннер настраивается через админку (UploadFile -> WebP).
  mediaType: 'image',
  mediaLabel: 'Видео производства',
  badges: [
    { title: 'Сроки в договоре', text: 'фиксируем дату передачи тиража' },
    { title: 'Образец до тиража', text: 'утверждаем pre-production sample' },
    { title: 'Контроль партии', text: 'пошив, нанесение, упаковка под надзором' },
    { title: 'Без посредников', text: 'своё производство 1000 м² в Москве' },
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
