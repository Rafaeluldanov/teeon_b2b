import styles from './CatalogCategoryIcon.module.css';

export type CatalogIconSlug =
  | 'futbolki'
  | 'hudi'
  | 'svitshoty'
  | 'longslivy'
  | 'sumki'
  | 'zhiletki'
  | 'kurtki'
  | 'dozhdeviki';

interface CatalogCategoryIconProps {
  slug: CatalogIconSlug | string;
  className?: string;
}

const TEE_OUTLINE =
  'M 60 42 Q 80 60 100 42 L 122 42 L 142 60 L 132 86 L 120 80 L 120 144 L 40 144 L 40 80 L 28 86 L 18 60 L 38 42 Z';
const TEE_NECK = 'M 60 42 Q 80 60 100 42';
const TEE_TAG = 'M 76 56 L 84 56 L 84 64 L 76 64 Z';

const HOODIE_OUTLINE =
  'M 40 50 L 60 50 C 60 18 100 18 100 50 L 120 50 L 140 62 L 130 88 L 120 80 L 120 144 L 40 144 L 40 80 L 30 88 L 20 62 Z';
const HOODIE_FACE = 'M 64 50 C 66 32 94 32 96 50';
const HOODIE_STRING_L = 'M 72 50 L 70 70';
const HOODIE_STRING_R = 'M 88 50 L 90 70';
const HOODIE_POCKET =
  'M 54 104 L 106 104 L 100 126 L 60 126 Z';

const SWEAT_OUTLINE =
  'M 60 42 Q 80 60 100 42 L 122 42 L 138 60 L 152 132 L 128 138 L 120 80 L 120 144 L 40 144 L 40 80 L 32 138 L 8 132 L 22 60 L 38 42 Z';
const SWEAT_NECK = 'M 60 42 Q 80 60 100 42';
const SWEAT_CUFF_L = 'M 14 122 L 36 128';
const SWEAT_CUFF_R = 'M 146 122 L 124 128';
const SWEAT_HEM = 'M 40 134 L 120 134';

const LS_OUTLINE =
  'M 60 42 Q 80 58 100 42 L 118 42 L 132 56 L 146 134 L 128 140 L 118 82 L 118 144 L 42 144 L 42 82 L 32 140 L 14 134 L 28 56 L 42 42 Z';
const LS_NECK = 'M 60 42 Q 80 58 100 42';

const BAG_OUTLINE =
  'M 40 56 L 120 56 L 126 134 Q 126 144 116 144 L 44 144 Q 34 144 34 134 Z';
const BAG_HANDLE_L = 'M 56 56 C 56 26 76 26 76 56';
const BAG_HANDLE_R = 'M 84 56 C 84 26 104 26 104 56';
const BAG_LABEL = 'M 60 96 L 86 96 L 86 110 L 60 110 Z';

const VEST_OUTLINE =
  'M 56 40 L 80 70 L 104 40 L 124 50 L 134 72 Q 126 82 118 82 L 118 144 L 42 144 L 42 82 Q 34 82 26 72 L 36 50 Z';
const VEST_ZIPPER = 'M 80 72 L 80 144';
const VEST_POCKET_L = 'M 52 108 L 74 108 L 74 122 L 52 122 Z';
const VEST_POCKET_R = 'M 86 108 L 108 108 L 108 122 L 86 122 Z';

const JACKET_OUTLINE =
  'M 50 50 L 70 38 L 80 56 L 90 38 L 110 50 L 128 56 L 142 68 L 132 132 L 116 138 L 116 144 L 44 144 L 44 138 L 28 132 L 18 68 L 32 56 Z';
const JACKET_LAPEL_L = 'M 50 50 L 80 56';
const JACKET_LAPEL_R = 'M 110 50 L 80 56';
const JACKET_ZIPPER = 'M 80 56 L 80 144';
const JACKET_POCKET_L = 'M 52 104 L 72 104';
const JACKET_POCKET_R = 'M 88 104 L 108 104';

const RAIN_OUTLINE =
  'M 56 50 C 56 28 104 28 104 50 L 130 64 L 148 140 L 12 140 L 30 64 Z';
const RAIN_HOOD = 'M 60 50 C 64 64 96 64 100 50';
const RAIN_SEAM = 'M 80 64 L 80 140';
const RAIN_DROP_1 = 'M 22 22 Q 28 30 22 32 Q 16 30 22 22 Z';
const RAIN_DROP_2 = 'M 138 22 Q 144 30 138 32 Q 132 30 138 22 Z';
const RAIN_DROP_3 = 'M 138 50 Q 144 58 138 60 Q 132 58 138 50 Z';

function renderIcon(slug: string) {
  switch (slug) {
    case 'futbolki':
      return (
        <>
          <path className={styles.iconFill} d={TEE_OUTLINE} />
          <path className={styles.iconStroke} d={TEE_OUTLINE} />
          <path className={styles.iconStroke} d={TEE_NECK} />
          <path className={styles.iconStrokeThin} d={TEE_TAG} />
        </>
      );
    case 'hudi':
      return (
        <>
          <path className={styles.iconFill} d={HOODIE_OUTLINE} />
          <path className={styles.iconStroke} d={HOODIE_OUTLINE} />
          <path className={styles.iconStroke} d={HOODIE_FACE} />
          <path className={styles.iconStrokeThin} d={HOODIE_STRING_L} />
          <path className={styles.iconStrokeThin} d={HOODIE_STRING_R} />
          <path className={styles.iconStrokeThin} d={HOODIE_POCKET} />
        </>
      );
    case 'svitshoty':
      return (
        <>
          <path className={styles.iconFill} d={SWEAT_OUTLINE} />
          <path className={styles.iconStroke} d={SWEAT_OUTLINE} />
          <path className={styles.iconStroke} d={SWEAT_NECK} />
          <path className={styles.iconStrokeThin} d={SWEAT_CUFF_L} />
          <path className={styles.iconStrokeThin} d={SWEAT_CUFF_R} />
          <path className={styles.iconStrokeThin} d={SWEAT_HEM} />
        </>
      );
    case 'longslivy':
      return (
        <>
          <path className={styles.iconFill} d={LS_OUTLINE} />
          <path className={styles.iconStroke} d={LS_OUTLINE} />
          <path className={styles.iconStroke} d={LS_NECK} />
        </>
      );
    case 'sumki':
      return (
        <>
          <path className={styles.iconFill} d={BAG_OUTLINE} />
          <path className={styles.iconStroke} d={BAG_OUTLINE} />
          <path className={styles.iconStroke} d={BAG_HANDLE_L} />
          <path className={styles.iconStroke} d={BAG_HANDLE_R} />
          <path className={styles.iconStrokeThin} d={BAG_LABEL} />
        </>
      );
    case 'zhiletki':
      return (
        <>
          <path className={styles.iconFill} d={VEST_OUTLINE} />
          <path className={styles.iconStroke} d={VEST_OUTLINE} />
          <path className={styles.iconStroke} d={VEST_ZIPPER} />
          <path className={styles.iconStrokeThin} d={VEST_POCKET_L} />
          <path className={styles.iconStrokeThin} d={VEST_POCKET_R} />
        </>
      );
    case 'kurtki':
      return (
        <>
          <path className={styles.iconFill} d={JACKET_OUTLINE} />
          <path className={styles.iconStroke} d={JACKET_OUTLINE} />
          <path className={styles.iconStroke} d={JACKET_LAPEL_L} />
          <path className={styles.iconStroke} d={JACKET_LAPEL_R} />
          <path className={styles.iconStroke} d={JACKET_ZIPPER} />
          <path className={styles.iconStrokeThin} d={JACKET_POCKET_L} />
          <path className={styles.iconStrokeThin} d={JACKET_POCKET_R} />
        </>
      );
    case 'dozhdeviki':
      return (
        <>
          <path className={styles.iconFill} d={RAIN_OUTLINE} />
          <path className={styles.iconStroke} d={RAIN_OUTLINE} />
          <path className={styles.iconStroke} d={RAIN_HOOD} />
          <path className={styles.iconStrokeThin} d={RAIN_SEAM} />
          <path className={styles.iconDrop} d={RAIN_DROP_1} />
          <path className={styles.iconDrop} d={RAIN_DROP_2} />
          <path className={styles.iconDrop} d={RAIN_DROP_3} />
        </>
      );
    default:
      return (
        <>
          <path className={styles.iconFill} d={TEE_OUTLINE} />
          <path className={styles.iconStroke} d={TEE_OUTLINE} />
          <path className={styles.iconStroke} d={TEE_NECK} />
        </>
      );
  }
}

export default function CatalogCategoryIcon({ slug, className }: CatalogCategoryIconProps) {
  const rootClass = [styles.icon, className].filter(Boolean).join(' ');
  return (
    <svg
      viewBox="0 0 160 160"
      aria-hidden="true"
      focusable="false"
      className={rootClass}
    >
      {renderIcon(slug)}
    </svg>
  );
}
