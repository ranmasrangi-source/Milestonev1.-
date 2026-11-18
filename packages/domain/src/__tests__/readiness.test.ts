import { describe, expect, it } from 'vitest';
import { evaluateReadiness, READINESS_SECTIONS, type ReadinessRecord } from '../index';
import { completeReadiness } from './fixtures';

describe('evaluateReadiness', () => {
  it('passes a complete record with two distinct approvers', () => {
    const result = evaluateReadiness(completeReadiness());
    expect(result.complete).toBe(true);
    expect(result.distinctApprovers).toBe(2);
  });

  it('treats not_applicable as satisfied', () => {
    const record = completeReadiness();
    record.sections.insurance_safety = 'not_applicable';
    expect(evaluateReadiness(record).complete).toBe(true);
  });

  it('reports a missing or incomplete section', () => {
    const record = completeReadiness();
    record.sections.legal = 'in_progress';
    const result = evaluateReadiness(record);
    expect(result.complete).toBe(false);
    expect(result.missingSections).toEqual(['legal']);
  });

  it('reports a section that was never started', () => {
    const record = completeReadiness();
    delete record.sections.customer_support;
    expect(evaluateReadiness(record).missingSections).toContain('customer_support');
  });

  it('rejects a single person approving everything', () => {
    const record: ReadinessRecord = {
      sections: completeReadiness().sections,
      approvals: completeReadiness().approvals.map((approval) => ({ ...approval, actorId: 'solo' })),
    };
    const result = evaluateReadiness(record);
    expect(result.complete).toBe(false);
    expect(result.distinctApprovers).toBe(1);
  });

  it('reports a missing approval type', () => {
    const record = completeReadiness();
    record.approvals = record.approvals.filter((approval) => approval.approvalType !== 'product');
    const result = evaluateReadiness(record);
    expect(result.complete).toBe(false);
    expect(result.missingApprovals).toEqual(['product']);
  });

  it('covers all eight readiness sections', () => {
    expect(READINESS_SECTIONS).toHaveLength(8);
  });
});
