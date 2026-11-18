/**
 * The six public service statuses. Every planned service is visible with one of these.
 * Admin changes the status per category and location. Code deployment is never required.
 */
export const SERVICE_STATUSES = [
  'coming_soon',
  'partner_registration_open',
  'under_development',
  'testing',
  'available',
  'temporarily_unavailable',
] as const;

export type ServiceStatus = (typeof SERVICE_STATUSES)[number];

export interface LocalizedText {
  en: string;
  ne: string;
}

export const STATUS_LABELS: Record<ServiceStatus, LocalizedText> = {
  coming_soon: { en: 'Coming Soon', ne: 'चाँडै आउँदैछ' },
  partner_registration_open: { en: 'Partner Registration Open', ne: 'साझेदार दर्ता खुला छ' },
  under_development: { en: 'Under Development', ne: 'विकासाधीन' },
  testing: { en: 'Testing', ne: 'परीक्षणमा' },
  available: { en: 'Available', ne: 'उपलब्ध' },
  temporarily_unavailable: { en: 'Temporarily Unavailable', ne: 'अस्थायी रूपमा उपलब्ध छैन' },
};

export function isServiceStatus(value: unknown): value is ServiceStatus {
  return typeof value === 'string' && (SERVICE_STATUSES as readonly string[]).includes(value);
}
