import Link from 'next/link';
import { LOCATIONS } from '@pherinepal/domain';
import type { Dict, Locale } from '@/lib/i18n';
import { localizedHref } from '@/lib/route';

interface LocationSwitcherProps {
  locale: Locale;
  t: Dict;
  basePath: string;
  currentCode: string;
  extraQuery?: Record<string, string | undefined>;
}

export function LocationSwitcher({ locale, t, basePath, currentCode, extraQuery }: LocationSwitcherProps) {
  return (
    <nav aria-label={t.locationLabel} className="location-switcher">
      <p className="location-switcher__label">{t.locationLabel}</p>
      <ul className="chip-list">
        {LOCATIONS.map((location) => {
          const active = location.code === currentCode;
          return (
            <li key={location.code}>
              <Link
                href={localizedHref(locale, basePath, { ...(extraQuery ?? {}), location: location.code })}
                className={active ? 'chip chip--active' : 'chip'}
                aria-current={active ? 'page' : undefined}
              >
                <span className="chip__name">{location.name[locale]}</span>
                <span className="chip__province" aria-hidden="true">
                  · {location.province[locale]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
