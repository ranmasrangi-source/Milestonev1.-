/**
 * Readiness record evaluation.
 * A category and location can accept bookings only when every section is complete
 * (or not applicable), every required approval is recorded, and at least two
 * different people have approved. Changing a status field alone never activates a service.
 */
export const READINESS_SECTIONS = [
  'legal',
  'partner_verification',
  'insurance_safety',
  'payment_refund',
  'technical_testing',
  'operational_staffing',
  'customer_support',
  'admin_approval',
] as const;

export type ReadinessSection = (typeof READINESS_SECTIONS)[number];

export const SECTION_STATUSES = [
  'not_started',
  'in_progress',
  'complete',
  'not_applicable',
  'blocked',
] as const;

export type SectionStatus = (typeof SECTION_STATUSES)[number];

export const APPROVAL_TYPES = ['operations', 'legal', 'finance', 'technical', 'product'] as const;

export type ApprovalType = (typeof APPROVAL_TYPES)[number];

export interface ReadinessApproval {
  approvalType: ApprovalType;
  actorId: string;
}

export interface ReadinessRecord {
  sections: Partial<Record<ReadinessSection, SectionStatus>>;
  approvals: ReadinessApproval[];
}

export interface ReadinessEvaluation {
  complete: boolean;
  missingSections: ReadinessSection[];
  missingApprovals: ApprovalType[];
  distinctApprovers: number;
}

export const MIN_DISTINCT_APPROVERS = 2;

export function evaluateReadiness(record: ReadinessRecord): ReadinessEvaluation {
  const missingSections = READINESS_SECTIONS.filter((section) => {
    const value = record.sections[section];
    return value !== 'complete' && value !== 'not_applicable';
  });

  const approvedTypes = new Set(record.approvals.map((approval) => approval.approvalType));
  const missingApprovals = APPROVAL_TYPES.filter((type) => !approvedTypes.has(type));
  const distinctApprovers = new Set(record.approvals.map((approval) => approval.actorId)).size;

  const complete =
    missingSections.length === 0 &&
    missingApprovals.length === 0 &&
    distinctApprovers >= MIN_DISTINCT_APPROVERS;

  return { complete, missingSections, missingApprovals, distinctApprovers };
}
