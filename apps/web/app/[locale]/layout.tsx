import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import '../globals.css';
import { getDict, LOCALES } from '@/lib/i18n';
import { resolveLocale } from '@/lib/route';
import { siteUrl } from '@/lib/seo';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);
  return {
    metadataBase: new URL(siteUrl()),
    title: {
      default: `${t.siteName}. ${t.tagline}`,
      template: `%s | ${t.siteName}`,
    },
    description: t.promise,
    openGraph: {
      title: `${t.siteName}. ${t.tagline}`,
      description: t.promise,
      siteName: t.siteName,
      locale: locale === 'ne' ? 'ne_NP' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', ne: '/ne' },
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = resolveLocale(params.locale);
  const t = getDict(locale);

  return (
    <html lang={locale}>
      <body className={locale === 'ne' ? 'lang-ne' : undefined}>
        <a className="skip-link" href="#main">
          {t.skipToContent}
        </a>
        <SiteHeader locale={locale} t={t} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter locale={locale} t={t} />
      </body>
    </html>
  );
}
