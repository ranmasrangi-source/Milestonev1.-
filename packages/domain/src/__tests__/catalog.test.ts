import { describe, expect, it } from 'vitest';
import {
  buildCatalog,
  createSampleSources,
  LOCATIONS,
  resolveCallToAction,
  SERVICE_CATEGORIES,
  type CatalogSources,
  type ReadinessRecord,
  type ServiceStatusRecord,
} from '../index';
import { completeReadiness } from './fixtures';

function memorySources(
  statuses: Record<string, ServiceStatusRecord>,
  readiness: Record<string, ReadinessRecord> = {},
): CatalogSources {
  return {
    findStatus: (category, location) => statuses[`${category}:${location}`],
    findReadiness: (category, location) => readiness[`${category}:${location}`],
  };
}

const empty = memorySources({});

describe('public catalogue', () => {
  it('shows every planned category, including Coming Soon ones, for every location', () => {
    for (const location of LOCATIONS) {
      const entries = buildCatalog(empty, location.code);
      expect(entries).toHaveLength(SERVICE_CATEGORIES.length);
    }
  });

  it('defaults to coming_soon when no status record exists', () => {
    const entries = buildCatalog(empty, 'kathmandu');
    expect(entries.every((entry) => entry.status === 'coming_soon')).toBe(true);
    expect(entries.every((entry) => entry.callToAction === 'notify_me')).toBe(true);
  });

  it('lets one category be Available in one location and Coming Soon in another', () => {
    const sources = memorySources({
      'hotels:pokhara': { status: 'available', instantEnabled: false, approvalEnabled: false },
    });
    const pokhara = buildCatalog(sources, 'pokhara').find((e) => e.category.code === 'hotels');
    const chitwan = buildCatalog(sources, 'chitwan').find((e) => e.category.code === 'hotels');
    expect(pokhara?.status).toBe('available');
    expect(chitwan?.status).toBe('coming_soon');
  });

  it('never allows booking from status alone, even when Available with a booking mode enabled', () => {
    const sources = memorySources({
      'hotels:pokhara': { status: 'available', instantEnabled: true, approvalEnabled: true },
    });
    const hotel = buildCatalog(sources, 'pokhara', true).find((e) => e.category.code === 'hotels');
    expect(hotel?.bookingAvailable).toBe(false);
    expect(hotel?.bookingBlockReasons).toContain('READINESS_INCOMPLETE');
  });

  it('allows booking only when the global switch, status, mode and readiness all pass', () => {
    const statuses = {
      'hotels:pokhara': { status: 'available' as const, instantEnabled: false, approvalEnabled: true },
    };
    const readiness = { 'hotels:pokhara': completeReadiness() };
    const sources = memorySources(statuses, readiness);

    const switchOff = buildCatalog(sources, 'pokhara', false).find((e) => e.category.code === 'hotels');
    expect(switchOff?.bookingAvailable).toBe(false);
    expect(switchOff?.bookingBlockReasons).toContain('GLOBAL_BOOKING_DISABLED');

    const switchOn = buildCatalog(sources, 'pokhara', true).find((e) => e.category.code === 'hotels');
    expect(switchOn?.bookingAvailable).toBe(true);
    expect(switchOn?.callToAction).toBe('book');
  });

  it('never makes information services bookable', () => {
    const sources = memorySources(
      { 'trip-planning:pokhara': { status: 'available', instantEnabled: true, approvalEnabled: true } },
      { 'trip-planning:pokhara': completeReadiness() },
    );
    const planning = buildCatalog(sources, 'pokhara', true).find((e) => e.category.code === 'trip-planning');
    expect(planning?.bookingAvailable).toBe(false);
    expect(planning?.bookingBlockReasons).toContain('NOT_TRANSACTIONAL');
  });

  it('throws for an unknown location', () => {
    expect(() => buildCatalog(empty, 'atlantis')).toThrow(/Unknown location/);
  });
});

describe('call to action', () => {
  it('maps statuses to the correct public action', () => {
    expect(resolveCallToAction({ status: 'coming_soon', bookingAvailable: false })).toBe('notify_me');
    expect(resolveCallToAction({ status: 'under_development', bookingAvailable: false })).toBe('notify_me');
    expect(resolveCallToAction({ status: 'partner_registration_open', bookingAvailable: false })).toBe(
      'partner_register',
    );
    expect(resolveCallToAction({ status: 'available', bookingAvailable: false })).toBe('learn_more');
    expect(resolveCallToAction({ status: 'available', bookingAvailable: true })).toBe('book');
  });
});

describe('sample data', () => {
  const sources = createSampleSources();

  it('never marks any sample service as available', () => {
    for (const location of LOCATIONS) {
      const entries = buildCatalog(sources, location.code, true);
      expect(entries.some((entry) => entry.status === 'available')).toBe(false);
    }
  });

  it('never accepts bookings in sample data', () => {
    for (const location of LOCATIONS) {
      const entries = buildCatalog(sources, location.code, true);
      expect(entries.some((entry) => entry.bookingAvailable)).toBe(false);
    }
  });
});
