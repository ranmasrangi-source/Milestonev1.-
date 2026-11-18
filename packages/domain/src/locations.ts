import type { LocalizedText } from './status';

export interface ServiceLocation {
  code: string;
  province: LocalizedText;
  name: LocalizedText;
}

/**
 * SAMPLE LOCATIONS FOR DEVELOPMENT ONLY.
 * These are not a launch decision. The pilot region is not selected.
 * Pokhara appears here only as seed data.
 */
export const LOCATIONS: readonly ServiceLocation[] = [
  {
    code: 'kathmandu',
    province: { en: 'Bagmati Province', ne: 'बागमती प्रदेश' },
    name: { en: 'Kathmandu', ne: 'काठमाडौं' },
  },
  {
    code: 'pokhara',
    province: { en: 'Gandaki Province', ne: 'गण्डकी प्रदेश' },
    name: { en: 'Pokhara', ne: 'पोखरा' },
  },
  {
    code: 'chitwan',
    province: { en: 'Bagmati Province', ne: 'बागमती प्रदेश' },
    name: { en: 'Chitwan', ne: 'चितवन' },
  },
  {
    code: 'solukhumbu',
    province: { en: 'Koshi Province', ne: 'कोशी प्रदेश' },
    name: { en: 'Solukhumbu (Everest region)', ne: 'सोलुखुम्बु (एभरेस्ट क्षेत्र)' },
  },
];

export function findLocation(code: string): ServiceLocation | undefined {
  return LOCATIONS.find((location) => location.code === code);
}
