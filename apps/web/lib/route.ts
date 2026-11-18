import { redirect } from 'next/navigation';
import { DEFAULT_LOCATION_CODE, findLocation, type ServiceLocation } from '@pherinepal/domain';
import { DEFAULT_LOCALE, isLocale, type Locale } from './i18n';

export type SearchParams = Record<string, string | string[] | undefined>;

export function resolveLocale(value: string): Locale {
  if (!isLocale(value)) {
    redirect(`/${DEFAULT_LOCALE}`);
  }
  return value;
}

export function resolveLocation(code: string | undefined): ServiceLocation {
  const found = code ? findLocation(code) : undefined;
  return found ?? findLocation(DEFAULT_LOCATION_CODE)!;
}

export function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Builds a locale-prefixed path with optional query parameters. Empty values are dropped. */
export function localizedHref(
  locale: Locale,
  path: string,
  query?: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value) params.set(key, value);
  }
  const qs = params.toString();
  return `/${locale}${path}${qs ? `?${qs}` : ''}`;
}
