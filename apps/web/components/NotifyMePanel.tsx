import type { Dict } from '@/lib/i18n';

/**
 * Milestone 1 placeholder. The form is shown but disabled, because consent storage
 * is not built yet. Nothing is collected or sent from this panel.
 */
export function NotifyMePanel({ t }: { t: Dict }) {
  return (
    <section className="card notify" aria-labelledby="notify-title">
      <h2 id="notify-title" className="card__title">
        {t.notifyMe}
      </h2>
      <p>{t.notifyMeBody}</p>
      <button type="button" className="btn btn--primary" disabled aria-describedby="notify-note">
        {t.notifyMe}
      </button>
      <p id="notify-note" className="muted">
        {t.notifyMeNote}
      </p>
    </section>
  );
}
