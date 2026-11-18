import { STATUS_LABELS, type ServiceStatus } from '@pherinepal/domain';
import type { Locale } from '@/lib/i18n';

/** Each status has a text label and an icon. Status is never conveyed by colour alone. */
const ICONS: Record<ServiceStatus, string> = {
  coming_soon: '◌',
  partner_registration_open: '✎',
  under_development: '⚙',
  testing: '◐',
  available: '●',
  temporarily_unavailable: '!',
};

interface StatusBadgeProps {
  status: ServiceStatus;
  locale: Locale;
}

export function StatusBadge({ status, locale }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      <span className="status-badge__icon" aria-hidden="true">
        {ICONS[status]}
      </span>
      <span>{STATUS_LABELS[status][locale]}</span>
    </span>
  );
}
