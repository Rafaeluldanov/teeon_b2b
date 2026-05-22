export interface EditableBrandingSample {
  id: string;
  methodSlug: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  imageLabel?: string;
  effect: string;
  bestFor: string[];
  materials: string[];
  limitations: string[];
  relatedProducts: string[];
  isActive: boolean;
  sortOrder: number;
}

export type EditableBrandingSamplesMap = Record<string, EditableBrandingSample[]>;
export const BRANDING_SAMPLES_LS_KEY = 'teeon_admin_branding_samples';
