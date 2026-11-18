import Link from 'next/link';
import type { CatalogEntry } from '@pherinepal/domain';
import type { Dict, Locale } from '@/lib/i18n';
import { localizedHref } from '@/lib/route';
import { StatusBadge } from './StatusBadge';

interface CategoryCardProps {
  entry: CatalogEntry;
  locale: Locale;
  t: Dict;
}

export function CategoryCard({ entry, locale, t }: CategoryCardProps) {
  const { category, location, status } = entry;
  const headingId = `svc-${category.code}`;
  const href = localizedHref(locale, `/services/${category.code}`, { location: location.code });

  return (
    <article className="card service-card" aria-labelledby={headingId}>
      <div className="service-card__top">
        <StatusBadge status={status} locale={locale} />
        <span className="service-card__meta">
          {category.transactional ? t.serviceTypeTransactional : t.serviceTypeInformational}
        </span>
      </div>
      <h3 id={headingId} className="service-card__title">
        <Link href={href} className="service-card__title-link">
          {category.name[locale]}
        </Link>
      </h3>
      <p className="service-card__text">{category.description[locale]}</p>
      <div className="service-card__footer">
        <span className="service-card__location">
          {location.name[locale]}
        </span>
        <Link className="service-card__action" href={href}>
          <span>{t.learnMore}</span>
          <span className="visually-hidden">: {category.name[locale]}</span>
          <span aria-hidden="true" className="service-card__arrow">→</span>
        </Link>
      </div>
    </article>
  );
}
