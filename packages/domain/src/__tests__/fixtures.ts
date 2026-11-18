import { READINESS_SECTIONS, type ReadinessRecord, type ReadinessSection } from '../readiness';

/** A readiness record that passes every rule. Used only in tests, never as seed data. */
export function completeReadiness(): ReadinessRecord {
  const sections = Object.fromEntries(
    READINESS_SECTIONS.map((section) => [section, 'complete']),
  ) as Record<ReadinessSection, 'complete'>;

  return {
    sections,
    approvals: [
      { approvalType: 'operations', actorId: 'actor-1' },
      { approvalType: 'legal', actorId: 'actor-2' },
      { approvalType: 'finance', actorId: 'actor-1' },
      { approvalType: 'technical', actorId: 'actor-2' },
      { approvalType: 'product', actorId: 'actor-1' },
    ],
  };
}
