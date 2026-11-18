import Link from 'next/link';
import { LOCATIONS } from '@pherinepal/domain';
import { getDict } from '@/lib/i18n';
import { first, localizedHref, resolveLocale, resolveLocation, type SearchParams } from '@/lib/route';
import { getPublicCatalog, groupEntries } from '@/lib/catalog';
import { CategoryCard } from '@/components/CategoryCard';
import { LocationSwitcher } from '@/components/LocationSwitcher';
import { SampleNotice } from '@/components/SampleNotice';
import { StatusSummary } from '@/components/StatusSummary';

interface HomePageProps {
  params: { locale: string };
  searchParams: SearchParams;
}

const DESTINATION_IMAGES: Record<string, string> = {
  kathmandu: '/images/kathmandu_heritage_valley_1795030377444.jpg',
  pokhara: '/images/pokhara_phewa_lake_1795030377848.jpg',
  chitwan: '/images/chitwan_jungle_river_1795030380516.jpg',
  solukhumbu: '/images/solukhumbu_everest_trail_1795030380335.jpg',
};

const HERO_IMAGE = '/images/nepal_himalaya_hero_1795030374586.jpg';

export default function HomePage({ params, searchParams }: HomePageProps) {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);
  const location = resolveLocation(first(searchParams.location));
  const entries = getPublicCatalog(location.code);
  const sections = groupEntries(entries);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__content">
              <p className="eyebrow">{t.tagline}</p>
              <h1 className="hero__title">{t.heroTitle}</h1>
              <p className="hero__body">{t.heroBody}</p>

              <form
                action={localizedHref(locale, '/services')}
                method="get"
                role="search"
                className="hero__search-panel"
              >
                <div className="hero__search-field">
                  <label htmlFor="hero-q" className="visually-hidden">
                    {t.searchLabel}
                  </label>
                  <svg
                    className="hero__search-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    id="hero-q"
                    name="q"
                    type="search"
                    placeholder={t.searchPlaceholder}
                    className="input hero__search-input"
                  />
                </div>

                <div className="hero__location-field">
                  <label htmlFor="hero-location" className="visually-hidden">
                    {t.locationLabel}
                  </label>
                  <select
                    id="hero-location"
                    name="location"
                    defaultValue={location.code}
                    className="input hero__location-select"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc.code} value={loc.code}>
                        {loc.name[locale]}
                      </option>
                    ))}
                  </select>
                </div>

                <button className="btn btn--primary hero__search-submit" type="submit">
                  {t.searchButton}
                </button>
              </form>

              <div className="hero__actions">
                <Link
                  className="btn btn--primary"
                  href={localizedHref(locale, '/services', { location: location.code })}
                >
                  {t.ctaBrowse}
                </Link>
                <Link
                  className="btn btn--ghost"
                  href={localizedHref(locale, '/services/trip-planning', { location: location.code })}
                >
                  {t.ctaPlan}
                </Link>
                <Link
                  className="btn btn--ghost"
                  href={localizedHref(locale, '/services', { status: 'partner_registration_open' })}
                >
                  {t.ctaPartner}
                </Link>
              </div>

              <div className="hero__metrics" aria-label={t.promise}>
                <span>{t.heroMetricCategories}</span>
                <span aria-hidden="true">·</span>
                <span>{t.heroMetricGroups}</span>
                <span aria-hidden="true">·</span>
                <span>{t.heroMetricLocations}</span>
              </div>
            </div>

            <div className="hero__visual">
              <div className="hero__image-frame">
                <img
                  src={HERO_IMAGE}
                  alt={t.heroVisualCaption}
                  className="hero__image"
                  referrerPolicy="no-referrer"
                />
                <div className="hero__image-overlay">
                  <p className="hero__image-promise">{t.promise}</p>
                  <p className="hero__image-caption">{t.heroVisualCaption}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="location-heading">
        <div className="section__header-stack">
          <p className="eyebrow">{t.destinationsEyebrow}</p>
          <div className="section__head">
            <h2 id="location-heading" className="section__title">
              {t.pickLocation}
            </h2>
            <p className="muted">{t.destinationsSubtitle}</p>
          </div>
        </div>

        <div className="destination-grid">
          {LOCATIONS.map((loc) => {
            const isActive = loc.code === location.code;
            const locEntries = getPublicCatalog(loc.code);
            const partnerOpenCount = locEntries.filter(
              (e) => e.status === 'partner_registration_open',
            ).length;
            const desc =
              t.destinationDescriptions[loc.code as keyof typeof t.destinationDescriptions] ?? '';

            return (
              <Link
                key={loc.code}
                href={localizedHref(locale, '', { location: loc.code })}
                className={
                  isActive ? 'destination-card destination-card--active' : 'destination-card'
                }
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="destination-card__media">
                  <img
                    src={DESTINATION_IMAGES[loc.code]}
                    alt={loc.name[locale]}
                    className="destination-card__img"
                    referrerPolicy="no-referrer"
                  />
                  <div className="destination-card__scrim" />
                  <div className="destination-card__overlay">
                    <span className="destination-card__province">{loc.province[locale]}</span>
                    <h3 className="destination-card__title">{loc.name[locale]}</h3>
                  </div>
                </div>
                <div className="destination-card__body">
                  <p className="destination-card__desc">{desc}</p>
                  <div className="destination-card__stats">
                    <span>{t.resultsCount(locEntries.length)}</span>
                    {partnerOpenCount > 0 && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="destination-card__highlight">
                          {partnerOpenCount} {locale === 'ne' ? 'साझेदार दर्ता खुला' : 'Partner Reg. Open'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="location-status-panel">
          <LocationSwitcher locale={locale} t={t} basePath="" currentCode={location.code} />
          <StatusSummary
            entries={entries}
            locale={locale}
            t={t}
            locationCode={location.code}
          />
        </div>
      </section>

      <section className="section container" id="services" aria-labelledby="services-heading">
        <div className="section__head">
          <div>
            <h2 id="services-heading" className="section__title">
              {t.groupsTitle}
            </h2>
            <p className="muted section__subtitle">
              {t.statusIntro}: <strong>{location.name[locale]}</strong> ({location.province[locale]})
            </p>
          </div>
          <Link
            className="btn btn--ghost"
            href={localizedHref(locale, '/services', { location: location.code })}
          >
            {t.ctaBrowse}
          </Link>
        </div>

        <nav aria-label={t.groupJumpLabel} className="group-jump">
          <ul className="group-jump__list">
            {sections.map((section, idx) => (
              <li key={section.group}>
                <a href={`#group-${section.group}`} className="group-jump__link">
                  <span className="group-jump__num">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span>{t.groupLabels[section.group]}</span>
                  <span className="group-jump__count">({section.items.length})</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {sections.map((section, idx) => (
          <div
            key={section.group}
            id={`group-${section.group}`}
            className="service-group"
          >
            <div className="service-group__header">
              <h3 className="service-group__title">
                <span className="service-group__index">
                  {String(idx + 1).padStart(2, '0')}.
                </span>{' '}
                {t.groupLabels[section.group]}
              </h3>
              <span className="service-group__count">
                {t.resultsCount(section.items.length)}
              </span>
            </div>
            <div className="card-grid">
              {section.items.map((entry) => (
                <CategoryCard key={entry.category.code} entry={entry} locale={locale} t={t} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="section container" aria-label={t.trustTitle}>
        <div className="two-col">
          <article className="card governance-card">
            <h2 className="card__title">{t.trustTitle}</h2>
            <p className="governance-card__lead">{t.trustBody}</p>
            <h3 className="governance-card__subheading">{t.readinessStepsTitle}</h3>
            <ul className="readiness-list">
              {t.readinessSteps.map((step) => (
                <li key={step} className="readiness-list__item">
                  {step}
                </li>
              ))}
            </ul>
          </article>

          <article className="card safety-card">
            <div className="safety-card__header">
              <h2 className="card__title">{t.safetyTitle}</h2>
              <span className="safety-card__tag">{t.emergencyNoticeTag}</span>
            </div>
            <p className="safety-card__body">{t.safetyBody}</p>
            <p className="muted">{t.noFakePrices}</p>
            <div className="safety-card__actions">
              <Link className="btn btn--ghost" href={localizedHref(locale, '/services/sos')}>
                {t.navSafety}
              </Link>
              <Link
                className="btn btn--ghost"
                href={localizedHref(locale, '/services/weather-alerts', {
                  location: location.code,
                })}
              >
                {locale === 'ne' ? 'मौसम तथा सुरक्षा सूचना' : 'Weather & Safety Alerts'}
              </Link>
            </div>
          </article>
        </div>
        <SampleNotice t={t} />
      </section>
    </>
  );
}
