import { describe, expect, it } from 'vitest';
import { evaluateBookingGate, SERVICE_CATEGORIES, type ServiceStatusRecord } from '../index';
import { completeReadiness } from './fixtures';

const hotels = SERVICE_CATEGORIES.find((c) => c.code === 'hotels')!;
const available: ServiceStatusRecord = { status: 'available', instantEnabled: true, approvalEnabled: true };

describe('evaluateBookingGate', () => {
  it('allows only when every condition passes', () => {
    const result = evaluateBookingGate({
      category: hotels,
      statusRecord: available,
      readiness: completeReadiness(),
      mode: 'instant',
      globalSwitchOn: true,
    });
    expect(result).toEqual({ allowed: true, reasons: [] });
  });

  it('blocks when the global switch is off', () => {
    const result = evaluateBookingGate({
      category: hotels,
      statusRecord: available,
      readiness: completeReadiness(),
      mode: 'instant',
      globalSwitchOn: false,
    });
    expect(result.allowed).toBe(false);
    expect(result.reasons).toEqual(['GLOBAL_BOOKING_DISABLED']);
  });

  it('blocks when the status is not available', () => {
    const result = evaluateBookingGate({
      category: hotels,
      statusRecord: { ...available, status: 'testing' },
      readiness: completeReadiness(),
      mode: 'instant',
      globalSwitchOn: true,
    });
    expect(result.reasons).toContain('STATUS_NOT_AVAILABLE');
  });

  it('blocks when there is no status record at all', () => {
    const result = evaluateBookingGate({
      category: hotels,
      statusRecord: undefined,
      readiness: completeReadiness(),
      mode: 'approval',
      globalSwitchOn: true,
    });
    expect(result.reasons).toEqual(expect.arrayContaining(['STATUS_NOT_AVAILABLE', 'MODE_NOT_ENABLED']));
  });

  it('checks the requested mode separately', () => {
    const approvalOnly: ServiceStatusRecord = { status: 'available', instantEnabled: false, approvalEnabled: true };
    const instant = evaluateBookingGate({
      category: hotels,
      statusRecord: approvalOnly,
      readiness: completeReadiness(),
      mode: 'instant',
      globalSwitchOn: true,
    });
    const approval = evaluateBookingGate({
      category: hotels,
      statusRecord: approvalOnly,
      readiness: completeReadiness(),
      mode: 'approval',
      globalSwitchOn: true,
    });
    expect(instant.reasons).toContain('MODE_NOT_ENABLED');
    expect(approval.allowed).toBe(true);
  });

  it('blocks without readiness', () => {
    const result = evaluateBookingGate({
      category: hotels,
      statusRecord: available,
      readiness: undefined,
      mode: 'instant',
      globalSwitchOn: true,
    });
    expect(result.reasons).toContain('READINESS_INCOMPLETE');
  });
});
