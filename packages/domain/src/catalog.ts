import { SERVICE_CATEGORIES, type ServiceCategory } from './categories';
import { evaluateBookingGate, type GateReason, type ServiceStatusRecord } from './booking-gate';
import { findLocation, LOCATIONS, type ServiceLocation } from './locations';
import type { ReadinessRecord } from './readiness';
import type { ServiceStatus } from './status';

export const DEFAULT_LOCATION_CODE = LOCATIONS[0].code;

/** A location with no status record is treated as Coming Soon. It is never treated as open. */
export const DEFAULT_STATUS: ServiceStatus = 'coming_soon';

/** Read-only access to statuses and readiness. The database repository implements this later. */
export interface CatalogSources {
  findStatus(categoryCode: string, locationCode: string): ServiceStatusRecord | undefined;
  findReadiness(categoryCode: string, locationCode: string): ReadinessRecord | undefined;
}

export type CallToAction = 'book' | 'partner_register' | 'notify_me' | 'learn_more';

export interface CatalogEntry {
  category: ServiceCategory;
  location: ServiceLocation;
  status: ServiceStatus;
  instantEnabled: boolean;
  approvalEnabled: boolean;
  bookingAvailable: boolean;
  bookingBlockReasons: GateReason[];
  callToAction: CallToAction;
}

export function resolveCallToAction(input: {
  status: ServiceStatus;
  bookingAvailable: boolean;
}): CallToAction {
  if (input.bookingAvailable) return 'book';
  if (input.status === 'partner_registration_open') return 'partner_register';
  if (input.status === 'available') return 'learn_more';
  return 'notify_me';
}

export function resolveStatus(
  sources: CatalogSources,
  categoryCode: string,
  locationCode: string,
): ServiceStatus {
  return sources.findStatus(categoryCode, locationCode)?.status ?? DEFAULT_STATUS;
}

/**
 * Builds the public catalogue for one location.
 * Every category is returned, including Coming Soon ones. Nothing is hidden from the public catalogue.
 */
export function buildCatalog(
  sources: CatalogSources,
  locationCode: string,
  globalSwitchOn = false,
): CatalogEntry[] {
  const location = findLocation(locationCode);
  if (!location) {
    throw new Error(`Unknown location code: ${locationCode}`);
  }

  return SERVICE_CATEGORIES.map((category) => {
    const statusRecord = sources.findStatus(category.code, location.code);
    const readiness = sources.findReadiness(category.code, location.code);
    const status = statusRecord?.status ?? DEFAULT_STATUS;

    const instant = evaluateBookingGate({
      category,
      statusRecord,
      readiness,
      mode: 'instant',
      globalSwitchOn,
    });
    const approval = evaluateBookingGate({
      category,
      statusRecord,
      readiness,
      mode: 'approval',
      globalSwitchOn,
    });

    const bookingAvailable = instant.allowed || approval.allowed;
    const bookingBlockReasons: GateReason[] = bookingAvailable
      ? []
      : [...new Set([...instant.reasons, ...approval.reasons])];

    return {
      category,
      location,
      status,
      instantEnabled: statusRecord?.instantEnabled ?? false,
      approvalEnabled: statusRecord?.approvalEnabled ?? false,
      bookingAvailable,
      bookingBlockReasons,
      callToAction: resolveCallToAction({ status, bookingAvailable }),
    };
  });
}
