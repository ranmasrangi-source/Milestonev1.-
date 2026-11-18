import { isServiceStatus, LOCATIONS, SERVICE_STATUSES, STATUS_LABELS } from '@pherinepal/domain';
import { getDict, type Locale } from '@/lib/i18n';
import { first, resolveLocale, resolveLocation, type SearchParams } from '@/lib/route';
import { getPublicCatalog, groupEntries, matchesQuery } from '@/lib/catalog';
import type { CatalogEntry } from '@pherinepal/domain';
import { CategoryCard } from '@/components/CategoryCard';
import { EmptyState } from '@/components/EmptyState';
import { SampleNotice } from '@/components/SampleNotice';
import type { Metadata } from 'next';

interface ServicesPageProps {
  params: { locale: string };
  searchParams: SearchParams;
}

export function generateMetadata({ params }: ServicesPageProps): Metadata {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);
  return { title: t.servicesTitle, description: t.servicesIntro };
}

function applyFilters(entries: CatalogEntry[], query: string, status: string | undefined, locale: Locale) {
  const q = query.trim();
  return entries.filter(
    (entry) =>
      (!status || entry.status === status) && (q === '' || matchesQuery(entry, q, locale)),
  );
}

export default function ServicesPage({ params, searchParams }: ServicesPageProps) {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);
  const location = resolveLocation(first(searchParams.location));
  const query = first(searchParams.q) ?? '';
  const statusRaw = first(searchParams.status);
  const status = statusRaw && isServiceStatus(statusRaw) ? statusRaw : undefined;

  const matches = applyFilters(getPublicCatalog(location.code), query, status, locale);
  const sections = groupEntries(matches);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">{t.servicesTitle}</h1>
          <p className="page-hero__body">{t.servicesIntro}</p>
        </div>
      </section>

      <section className="container section" aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="visually-hidden">
          {t.filterHeading}
        </h2>
        <form method="get" role="search" className="filter-form">
          <div className="field">
            <label htmlFor="f-q">{t.searchLabel}</label>
            <input id="f-q" name="q" type="search" defaultValue={query} className="input" />
          </div>
          <div className="field">
            <label htmlFor="f-location">{t.locationLabel}</label>
            <select id="f-location" name="location" defaultValue={location.code} className="input">
              {LOCATIONS.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name[locale]}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-status">{t.statusFilterLabel}</label>
            <select id="f-status" name="status" defaultValue={status ?? ''} className="input">
              <option value="">{t.allStatuses}</option>
              {SERVICE_STATUSES.map((value) => (
                <option key={value} value={value}>
                  {STATUS_LABELS[value][locale]}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn--primary" type="submit">
            {t.applyFilters}
          </button>
        </form>

        <p className="muted" role="status">
          {t.resultsCount(matches.length)}
        </p>

        {sections.length === 0 ? (
          <EmptyState title={t.noResultsTitle} body={t.noResults} />
        ) : (
          sections.map((section) => (
            <div key={section.group} className="service-group">
              <h3 className="service-group__title">{t.groupLabels[section.group]}</h3>
              <div className="card-grid">
                {section.items.map((entry) => (
                  <CategoryCard key={entry.category.code} entry={entry} locale={locale} t={t} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      <section className="container section">
        <SampleNotice t={t} />
      </section>
    </>
  );
}
