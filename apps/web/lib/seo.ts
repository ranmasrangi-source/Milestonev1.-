import type { ServiceStatus } from '@pherinepal/domain';

/**
 * Indexing policy (Batch 3):
 * Index a page only when it is live (available) and has original, useful content.
 * Thin, empty or templated pages are marked noindex. They stay reachable for users.
 */
export function indexingDecision(status: ServiceStatus, hasOriginalContent: boolean): boolean {
  return status === 'available' && hasOriginalContent;
}

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}
