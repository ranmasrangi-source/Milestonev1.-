import type { Dict } from '@/lib/i18n';

export function SampleNotice({ t }: { t: Dict }) {
  return (
    <aside className="notice notice--info" aria-label={t.sampleLabel}>
      <strong>{t.sampleLabel}</strong> {t.sampleNotice}
    </aside>
  );
}
