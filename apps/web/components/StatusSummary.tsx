import Link from 'next/link';
import { SERVICE_STATUSES, type CatalogEntry, type ServiceStatus } from '@pherinepal/domain';
import type { Dict, Locale } from '@/lib/i18n';
import { localizedHref } from '@/lib/route';
import { StatusBadge } from './StatusBadge';

interface StatusSummaryProps {
  entries: CatalogEntry[];
  locale: Locale;
  t: Dict;
  locationCode?: string;
}

export function StatusSummary({ entries, locale, t, locationCode }: StatusSummaryProps) {
  const counts = new Map<ServiceStatus, number>();
  for (const entry of entries) {
    counts.set(entry.status, (counts.get(entry.status) ?? 0) + 1);
  }
  const activeLocation = locationCode ?? entries[0]?.location.code;

  return (
    <div className="status-summary">
      <div className="status-summary__head">
        <h3 className="status-summary__title">{t.summaryTitle}</h3>
        <span className="status-summary__total">
          {t.resultsCount(entries.length)}
        </span>
      </div>
      <ul className="status-summary__list">
        {SERVICE_STATUSES.map((status) => {
          const count = counts.get(status) ?? 0;
          return (
            <li key={status} className="status-summary__item">
              <Link
                href={localizedHref(locale, '/services', {
                  location: activeLocation,
                  status,
                })}
                className="status-summary__link"
              >
                <StatusBadge status={status} locale={locale} />
                <span className="status-summary__count" aria-label={`${count}`}>
                  {count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
