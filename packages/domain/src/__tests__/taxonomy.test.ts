import { describe, expect, it } from 'vitest';
import {
  LOCATIONS,
  SERVICE_CATEGORIES,
  SERVICE_GROUPS,
  SERVICE_STATUSES,
  STATUS_LABELS,
  isServiceStatus,
  SAMPLE_STATUS_ROWS,
  findCategory,
  findLocation,
} from '../index';

describe('taxonomy', () => {
  it('has unique category codes', () => {
    const codes = SERVICE_CATEGORIES.map((c) => c.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it('gives every category non-empty English and Nepali names and descriptions', () => {
    for (const category of SERVICE_CATEGORIES) {
      expect(category.name.en.trim()).not.toBe('');
      expect(category.name.ne.trim()).not.toBe('');
      expect(category.description.en.trim()).not.toBe('');
      expect(category.description.ne.trim()).not.toBe('');
    }
  });

  it('uses only known service groups', () => {
    for (const category of SERVICE_CATEGORIES) {
      expect(SERVICE_GROUPS).toContain(category.group);
    }
  });

  it('defines a label in both languages for all six statuses', () => {
    expect(SERVICE_STATUSES).toHaveLength(6);
    for (const status of SERVICE_STATUSES) {
      expect(STATUS_LABELS[status].en).toBeTruthy();
      expect(STATUS_LABELS[status].ne).toBeTruthy();
    }
  });

  it('rejects unknown status values', () => {
    expect(isServiceStatus('available')).toBe(true);
    expect(isServiceStatus('open_for_all')).toBe(false);
    expect(isServiceStatus(undefined)).toBe(false);
  });

  it('keeps sample status rows pointing at real categories and locations', () => {
    const keys = new Set<string>();
    for (const row of SAMPLE_STATUS_ROWS) {
      expect(findCategory(row.category)).toBeDefined();
      expect(findLocation(row.location)).toBeDefined();
      const key = `${row.category}:${row.location}`;
      expect(keys.has(key)).toBe(false);
      keys.add(key);
    }
  });

  it('defines four development locations, none marked as a pilot decision', () => {
    expect(LOCATIONS.map((l) => l.code)).toEqual(['kathmandu', 'pokhara', 'chitwan', 'solukhumbu']);
  });
});
