import type { ServiceCategory } from './categories';
import { evaluateReadiness, type ReadinessRecord } from './readiness';
import type { ServiceStatus } from './status';

export const BOOKING_MODES = ['instant', 'approval'] as const;
export type BookingMode = (typeof BOOKING_MODES)[number];

export interface ServiceStatusRecord {
  status: ServiceStatus;
  instantEnabled: boolean;
  approvalEnabled: boolean;
}

/**
 * Internal reasons. These are for admin tooling and logs only.
 * Public pages show a generic "not open yet" message, never these codes.
 */
export type GateReason =
  | 'GLOBAL_BOOKING_DISABLED'
  | 'NOT_TRANSACTIONAL'
  | 'STATUS_NOT_AVAILABLE'
  | 'MODE_NOT_ENABLED'
  | 'READINESS_INCOMPLETE';

export interface BookingGateInput {
  category: ServiceCategory;
  statusRecord: ServiceStatusRecord | undefined;
  readiness: ReadinessRecord | undefined;
  mode: BookingMode;
  globalSwitchOn: boolean;
}

export interface BookingGateResult {
  allowed: boolean;
  reasons: GateReason[];
}

/**
 * The single rule for whether a booking may be accepted.
 * Every condition must hold. Payment success is never evaluated here, because
 * confirmation is decided by the booking engine, not by the gate.
 */
export function evaluateBookingGate(input: BookingGateInput): BookingGateResult {
  const { category, statusRecord, readiness, mode, globalSwitchOn } = input;
  const reasons: GateReason[] = [];

  if (!globalSwitchOn) reasons.push('GLOBAL_BOOKING_DISABLED');
  if (!category.transactional) reasons.push('NOT_TRANSACTIONAL');
  if (!statusRecord || statusRecord.status !== 'available') reasons.push('STATUS_NOT_AVAILABLE');

  const modeEnabled =
    statusRecord !== undefined &&
    (mode === 'instant' ? statusRecord.instantEnabled : statusRecord.approvalEnabled);
  if (!modeEnabled) reasons.push('MODE_NOT_ENABLED');

  if (!readiness || !evaluateReadiness(readiness).complete) reasons.push('READINESS_INCOMPLETE');

  return { allowed: reasons.length === 0, reasons };
}
