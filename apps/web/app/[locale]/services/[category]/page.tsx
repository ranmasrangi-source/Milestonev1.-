import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getDict } from '@/lib/i18n';
import { first, localizedHref, resolveLocale, resolveLocation, type SearchParams } from '@/lib/route';
import { getCategoryEntry } from '@/lib/catalog';
import { indexingDecision } from '@/lib/seo';
import { StatusBadge } from '@/components/StatusBadge';
import { LocationSwitcher } from '@/components/LocationSwitcher';
import { NotifyMePanel } from '@/components/NotifyMePanel';
import { SampleNotice } from '@/components/SampleNotice';

interface CategoryPageProps {
  params: { locale: string; category: string };
  searchParams: SearchParams;
}

export function generateMetadata({ params, searchParams }: CategoryPageProps): Metadata {
  const locale = resolveLocale(params.locale);
  const location = resolveLocation(first(searchParams.location));
  const entry = getCategoryEntry(params.category, location.code);
  if (!entry) {
    return { robots: { index: false, follow: false } };
  }
  // Milestone 1 pages have a single short description and no authored guide content,
  // so they are not indexed. This follows the thin-content policy in Batch 3.
  const indexable = indexingDecision(entry.status, false);
  return {
    title: entry.category.name[locale],
    description: entry.category.description[locale],
    robots: { index: indexable, follow: true },
  };
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);
  const location = resolveLocation(first(searchParams.location));
  const entry = getCategoryEntry(params.category, location.code);
  if (!entry) {
    notFound();
  }

  const { category, status, bookingAvailable } = entry;
  const isAvailable = status === 'available';
  const showPartnerCta = status === 'partner_registration_open';

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav aria-label={t.breadcrumb} className="breadcrumb">
            <Link href={localizedHref(locale, '/services', { location: location.code })}>{t.navServices}</Link>
            <span aria-hidden="true"> / </span>
            <span>{category.name[locale]}</span>
          </nav>
          <StatusBadge status={status} locale={locale} />
          <h1 className="page-hero__title">{category.name[locale]}</h1>
          <p className="page-hero__body">{category.description[locale]}</p>
        </div>
      </section>

      <section className="container section">
        <LocationSwitcher
          locale={locale}
          t={t}
          basePath={`/services/${category.code}`}
          currentCode={location.code}
        />

        <p className="status-line">
          {t.statusIntro}: <strong>{location.name[locale]}</strong>
        </p>

        {!isAvailable && (
          <div className="notice notice--soon" role="status">
            <p>{t.notOpenBody}</p>
          </div>
        )}

        {category.code === 'sos' && (
          <div className="notice notice--warn">
            <h2 className="notice__title">{t.safetyTitle}</h2>
            <p>{t.safetyBody}</p>
          </div>
        )}

        <div className="two-col">
          <article className="card">
            <h2 className="card__title">{t.expectTitle}</h2>
            <p>{category.description[locale]}</p>
            <p className="muted">{t.noFakePrices}</p>
          </article>
          <article className="card">
            <h2 className="card__title">{t.bookingTitle}</h2>
            {category.transactional ? (
              <p>{bookingAvailable ? t.bookingOpen : t.bookingNotOpen}</p>
            ) : (
              <p>{t.informationService}</p>
            )}
          </article>
        </div>

        {showPartnerCta && (
          <article className="card">
            <h2 className="card__title">{t.partnerRegister}</h2>
            <p>{t.partnerFormLater}</p>
            <button type="button" className="btn btn--primary" disabled>
              {t.partnerRegister}
            </button>
          </article>
        )}

        {!isAvailable && <NotifyMePanel t={t} />}
      </section>

      <section className="container section">
        <SampleNotice t={t} />
      </section>
    </>
  );
}
