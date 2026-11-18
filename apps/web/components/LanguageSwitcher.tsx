'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
}

/** Keeps the user on the same page and swaps only the locale prefix. */
export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const other: Locale = locale === 'en' ? 'ne' : 'en';
  const parts = pathname.split('/');
  parts[1] = other;
  const target = parts.join('/') || `/${other}`;

  return (
    <Link href={target} lang={other} hrefLang={other} className="lang-switch">
      {label}
    </Link>
  );
}
