import Link from 'next/link';
import type { Dict, Locale } from '@/lib/i18n';
import { localizedHref } from '@/lib/route';
import { LanguageSwitcher } from './LanguageSwitcher';

interface SiteHeaderProps {
  locale: Locale;
  t: Dict;
}

export function SiteHeader({ locale, t }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href={localizedHref(locale, '')} className="brand">
          <svg
            className="brand__crest"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
             aria-hidden="true"
          >
            <rect width="28" height="28" rx="7" fill="currentColor" fillOpacity="0.1" />
            <path
              d="M4.5 21.5L11.5 9.5L16 17L19.5 11.5L23.5 21.5H4.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M9.6 12.8L11.5 9.5L13.4 12.8L11.5 14.2L9.6 12.8Z"
              fill="var(--color-accent)"
            />
          </svg>
          <span className="brand__name">{t.siteName}</span>
        </Link>

        <nav aria-label={t.navPrimary} className="site-nav">
          <ul>
            <li>
              <Link href={localizedHref(locale, '')}>{t.navHome}</Link>
            </li>
            <li>
              <Link href={localizedHref(locale, '/services')}>{t.navServices}</Link>
            </li>
            <li>
              <Link href={localizedHref(locale, '/services/trip-planning')}>{t.navPlan}</Link>
            </li>
            <li>
              <Link href={localizedHref(locale, '/services/sos')}>{t.navSafety}</Link>
            </li>
          </ul>
        </nav>

        <div className="site-header__actions">
          <LanguageSwitcher locale={locale} label={t.switchLabel} />
        </div>
      </div>
    </header>
  );
}
