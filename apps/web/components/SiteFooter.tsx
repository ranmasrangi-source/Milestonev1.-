import Link from 'next/link';
import type { Dict, Locale } from '@/lib/i18n';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { localizedHref } from '@/lib/route';

interface SiteFooterProps {
  t: Dict;
  locale?: Locale;
}

export function SiteFooter({ t, locale = DEFAULT_LOCALE }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand-col">
            <div className="site-footer__brand">
              <span className="site-footer__wordmark">{t.siteName}</span>
              <span className="site-footer__sep" aria-hidden="true">·</span>
              <span className="site-footer__tagline">{t.tagline}</span>
            </div>
            <p className="site-footer__promise">{t.promise}</p>
            <p className="muted site-footer__note">{t.footerNote}</p>
          </div>

          <div className="site-footer__nav-col">
            <h2 className="site-footer__heading">{t.footerNavHeading}</h2>
            <ul className="site-footer__links">
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
          </div>

          <div className="site-footer__gov-col">
            <h2 className="site-footer__heading">{t.footerGovernanceHeading}</h2>
            <p className="muted">{t.noFakePrices}</p>
            <p className="muted">{t.legalPending}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
