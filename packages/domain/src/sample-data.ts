import type { ServiceStatusRecord } from './booking-gate';
import type { CatalogSources } from './catalog';
import type { ServiceStatus } from './status';

/**
 * SAMPLE STATUS DATA FOR DEVELOPMENT ONLY. NOT A LAUNCH DECISION.
 *
 * Deliberate choices for Milestone 1:
 * - No row is 'available'. No visitor sees any service as live yet.
 * - No row enables booking modes. Booking stays closed.
 * - Anything not listed defaults to coming_soon.
 */
export interface SampleStatusRow {
  category: string;
  location: string;
  status: ServiceStatus;
}

export const SAMPLE_STATUS_ROWS: readonly SampleStatusRow[] = [
  { category: 'hotels', location: 'kathmandu', status: 'partner_registration_open' },
  { category: 'hotels', location: 'pokhara', status: 'partner_registration_open' },
  { category: 'homestays', location: 'pokhara', status: 'partner_registration_open' },
  { category: 'trekking', location: 'solukhumbu', status: 'partner_registration_open' },
  { category: 'peak-climbing', location: 'solukhumbu', status: 'partner_registration_open' },
  { category: 'guides', location: 'solukhumbu', status: 'partner_registration_open' },
  { category: 'shopping', location: 'kathmandu', status: 'partner_registration_open' },
  { category: 'restaurants', location: 'pokhara', status: 'partner_registration_open' },
  { category: 'trip-planning', location: 'kathmandu', status: 'testing' },
  { category: 'trip-planning', location: 'pokhara', status: 'testing' },
  { category: 'weather-alerts', location: 'kathmandu', status: 'testing' },
  { category: 'ai-guide', location: 'kathmandu', status: 'under_development' },
  { category: 'offline-maps', location: 'kathmandu', status: 'under_development' },
  { category: 'hidden-nepal', location: 'pokhara', status: 'under_development' },
  { category: 'travel-wallet', location: 'kathmandu', status: 'under_development' },
  { category: 'support', location: 'kathmandu', status: 'under_development' },
  { category: 'sos', location: 'kathmandu', status: 'coming_soon' },
  { category: 'esim', location: 'kathmandu', status: 'coming_soon' },
];

export function toStatusRecord(row: SampleStatusRow): ServiceStatusRecord {
  return { status: row.status, instantEnabled: false, approvalEnabled: false };
}

export function createSampleSources(): CatalogSources {
  const index = new Map<string, ServiceStatusRecord>(
    SAMPLE_STATUS_ROWS.map((row) => [`${row.category}:${row.location}`, toStatusRecord(row)]),
  );
  return {
    findStatus: (categoryCode, locationCode) => index.get(`${categoryCode}:${locationCode}`),
    findReadiness: () => undefined,
  };
}
