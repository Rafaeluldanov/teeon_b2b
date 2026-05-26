export interface PortfolioFilter {
  value: string;
  label: string;
}

export const FILTERS_LS_KEY = 'teeon_admin_portfolio_filters';

export const DEFAULT_PORTFOLIO_FILTERS: PortfolioFilter[] = [
  { value: 'hudi',         label: 'Худи' },
  { value: 'futbolki',     label: 'Футболки' },
  { value: 'svitshoty',    label: 'Свитшоты' },
  { value: 'sumki',        label: 'Сумки' },
  { value: 'zhiletki',     label: 'Жилетки' },
  { value: 'kurtki',       label: 'Куртки' },
  { value: 'dozhdeviki',   label: 'Дождевики' },
  { value: 'vyshivka',     label: 'Вышивка' },
  { value: 'dtf-pechat',   label: 'DTF-печать' },
  { value: 'shelkografiya',label: 'Шелкография' },
  { value: 'event',        label: 'Мероприятия' },
  { value: 'welcome-pack', label: 'Welcome-наборы' },
  { value: 'forma',        label: 'Форма персонала' },
  { value: 'promo',        label: 'Промо' },
];

// Сопоставление slug фильтра с русскими алиасами в произвольных текстовых полях
// (название изделия, технологии кейса, поле «Брендирование»).
// Применяется как fallback, когда у изделия не проставлен явный тег/categorySlug.
export const DEFAULT_TAG_ALIASES: Record<string, string[]> = {
  vyshivka:      ['вышивка'],
  'dtf-pechat':  ['dtf-печать', 'dtf печать', 'dtf'],
  shelkografiya: ['шелкография'],
  hudi:          ['худи'],
  futbolki:      ['футболка', 'футболки'],
  svitshoty:     ['свитшот', 'свитшоты'],
  sumki:         ['сумка', 'сумки', 'шоппер', 'шопперы'],
  zhiletki:      ['жилетка', 'жилетки', 'жилет', 'жилеты'],
  kurtki:        ['куртка', 'куртки', 'ветровка', 'ветровки', 'бомбер', 'бомберы'],
  dozhdeviki:    ['дождевик', 'дождевики', 'пончо'],
};

export function loadPortfolioFilters(): PortfolioFilter[] {
  if (typeof window === 'undefined') return DEFAULT_PORTFOLIO_FILTERS;
  try {
    const raw = window.localStorage.getItem(FILTERS_LS_KEY);
    if (!raw) return DEFAULT_PORTFOLIO_FILTERS;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return DEFAULT_PORTFOLIO_FILTERS;
    const cleaned = parsed
      .filter((f): f is PortfolioFilter =>
        typeof f === 'object' && f !== null &&
        typeof (f as { value?: unknown }).value === 'string' &&
        typeof (f as { label?: unknown }).label === 'string'
      )
      .filter((f) => f.value.trim() && f.label.trim());
    return cleaned.length > 0 ? cleaned : DEFAULT_PORTFOLIO_FILTERS;
  } catch {
    return DEFAULT_PORTFOLIO_FILTERS;
  }
}

export function savePortfolioFilters(filters: PortfolioFilter[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(FILTERS_LS_KEY, JSON.stringify(filters));
  } catch { /* ignore */ }
}

export function slugifyFilterValue(s: string): string {
  return s.toLowerCase().trim()
    .replace(/ё/g, 'e').replace(/й/g, 'i')
    .replace(/[^a-z0-9а-я-]+/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
