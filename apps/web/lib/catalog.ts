import {
  buildCatalog,
  createSampleSources,
  SERVICE_GROUPS,
  STATUS_LABELS,
  type CatalogEntry,
  type LocalizedText,
  type ServiceGroup,
  type ServiceStatus,
} from '@pherinepal/domain';
import type { Locale } from './i18n';

/**
 * Milestone 1 data source: in-repo sample data. Milestone 2 replaces this with a
 * database-backed CatalogSources implementation without changing any page.
 */
const sources = createSampleSources();

/** Reads the booking master switch. Turning it on alone never opens booking. See the domain gate. */
export function readBookingSwitch(): boolean {
  return process.env.BOOKING_ENABLED === 'true';
}

export function getPublicCatalog(locationCode: string): CatalogEntry[] {
  return buildCatalog(sources, locationCode, readBookingSwitch());
}

export function getCategoryEntry(categoryCode: string, locationCode: string): CatalogEntry | undefined {
  return getPublicCatalog(locationCode).find((entry) => entry.category.code === categoryCode);
}

export function groupEntries(
  entries: CatalogEntry[],
): Array<{ group: ServiceGroup; items: CatalogEntry[] }> {
  return SERVICE_GROUPS.map((group) => ({
    group,
    items: entries.filter((entry) => entry.category.group === group),
  })).filter((section) => section.items.length > 0);
}

export function matchesQuery(entry: CatalogEntry, query: string, locale: Locale): boolean {
  const haystack = [entry.category.name[locale], entry.category.description[locale], entry.category.code]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

/** Public, serialisable form for the API. Contains no internal gate reasons. */
export interface PublicServiceDto {
  code: string;
  group: ServiceGroup;
  name: LocalizedText;
  description: LocalizedText;
  transactional: boolean;
  status: ServiceStatus;
  statusLabel: LocalizedText;
  bookingAvailable: boolean;
  callToAction: string;
}

export function toPublicDto(entry: CatalogEntry): PublicServiceDto {
  return {
    code: entry.category.code,
    group: entry.category.group,
    name: entry.category.name,
    description: entry.category.description,
    transactional: entry.category.transactional,
    status: entry.status,
    statusLabel: STATUS_LABELS[entry.status],
    bookingAvailable: entry.bookingAvailable,
    callToAction: entry.callToAction,
  };
}
