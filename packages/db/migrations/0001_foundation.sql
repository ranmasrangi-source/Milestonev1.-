-- 0001_foundation.sql
-- Milestone 1 foundation: service taxonomy, locations, per-location status,
-- status history, readiness records and an append-only audit log.
-- Requires PostgreSQL 13 or later (gen_random_uuid() is built in from 13).
-- Booking, payment, ledger and partner tables arrive in later migrations.

CREATE TABLE service_categories (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code            text NOT NULL UNIQUE CHECK (code ~ '^[a-z0-9-]+$'),
  service_group   text NOT NULL CHECK (service_group IN (
                    'stay', 'adventure', 'travel', 'connectivity', 'shop',
                    'local', 'planning', 'safety', 'community', 'platform')),
  name_en         text NOT NULL,
  name_ne         text NOT NULL,
  description_en  text NOT NULL,
  description_ne  text NOT NULL,
  transactional   boolean NOT NULL DEFAULT false,
  sort_order      integer NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE locations (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code         text NOT NULL UNIQUE CHECK (code ~ '^[a-z0-9-]+$'),
  province_en  text NOT NULL,
  province_ne  text NOT NULL,
  name_en      text NOT NULL,
  name_ne      text NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- One status per category and location. Admin changes this row; code is never involved.
CREATE TABLE service_statuses (
  id                        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id               uuid NOT NULL REFERENCES service_categories(id) ON DELETE RESTRICT,
  location_id               uuid NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
  status                    text NOT NULL CHECK (status IN (
                              'coming_soon', 'partner_registration_open', 'under_development',
                              'testing', 'available', 'temporarily_unavailable')),
  instant_booking_enabled   boolean NOT NULL DEFAULT false,
  approval_booking_enabled  boolean NOT NULL DEFAULT false,
  effective_from            timestamptz NOT NULL DEFAULT now(),
  changed_by                uuid,
  change_reason             text NOT NULL DEFAULT '',
  created_at                timestamptz NOT NULL DEFAULT now(),
  updated_at                timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT service_statuses_one_per_location UNIQUE (category_id, location_id),
  -- Booking modes can only be on when the service is Available.
  CONSTRAINT booking_modes_require_available CHECK (
    status = 'available'
    OR (instant_booking_enabled = false AND approval_booking_enabled = false)
  )
);

CREATE TABLE service_status_history (
  id                        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id               uuid NOT NULL REFERENCES service_categories(id) ON DELETE RESTRICT,
  location_id               uuid NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
  previous_status           text,
  new_status                text NOT NULL CHECK (new_status IN (
                              'coming_soon', 'partner_registration_open', 'under_development',
                              'testing', 'available', 'temporarily_unavailable')),
  instant_booking_enabled   boolean NOT NULL,
  approval_booking_enabled  boolean NOT NULL,
  actor_id                  uuid,
  actor_role                text,
  reason                    text NOT NULL CHECK (length(btrim(reason)) > 0),
  created_at                timestamptz NOT NULL DEFAULT now()
);

-- Readiness: one record per category and location.
CREATE TABLE readiness_records (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id  uuid NOT NULL REFERENCES service_categories(id) ON DELETE RESTRICT,
  location_id  uuid NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
  sections     jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT readiness_one_per_location UNIQUE (category_id, location_id)
);

CREATE TABLE readiness_approvals (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  readiness_record_id   uuid NOT NULL REFERENCES readiness_records(id) ON DELETE RESTRICT,
  approval_type         text NOT NULL CHECK (approval_type IN (
                          'operations', 'legal', 'finance', 'technical', 'product')),
  actor_id              uuid NOT NULL,
  approved_at           timestamptz NOT NULL DEFAULT now(),
  revoked_at            timestamptz,
  CONSTRAINT readiness_approval_unique UNIQUE (readiness_record_id, approval_type, actor_id)
);

CREATE TABLE audit_logs (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id      uuid,
  actor_role    text,
  action        text NOT NULL,
  object_type   text NOT NULL,
  object_id     text,
  before_state  jsonb,
  after_state   jsonb,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Append-only enforcement for history and audit tables.
CREATE OR REPLACE FUNCTION forbid_mutation() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION '% is append-only; updates and deletes are not allowed', TG_TABLE_NAME;
END;
$$;

CREATE TRIGGER service_status_history_append_only
  BEFORE UPDATE OR DELETE ON service_status_history
  FOR EACH ROW EXECUTE FUNCTION forbid_mutation();

CREATE TRIGGER audit_logs_append_only
  BEFORE UPDATE OR DELETE ON audit_logs
  FOR EACH ROW EXECUTE FUNCTION forbid_mutation();

-- Database guard: booking modes may only be enabled for transactional categories.
CREATE OR REPLACE FUNCTION enforce_booking_modes_transactional() RETURNS trigger
LANGUAGE plpgsql AS $$
DECLARE
  is_transactional boolean;
BEGIN
  IF NEW.instant_booking_enabled OR NEW.approval_booking_enabled THEN
    SELECT transactional INTO is_transactional
      FROM service_categories WHERE id = NEW.category_id;
    IF NOT COALESCE(is_transactional, false) THEN
      RAISE EXCEPTION 'booking modes can only be enabled for transactional categories';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER service_statuses_booking_guard
  BEFORE INSERT OR UPDATE ON service_statuses
  FOR EACH ROW EXECUTE FUNCTION enforce_booking_modes_transactional();

CREATE INDEX service_statuses_location_idx ON service_statuses (location_id);
CREATE INDEX service_status_history_lookup_idx ON service_status_history (category_id, location_id, created_at);
CREATE INDEX audit_logs_object_idx ON audit_logs (object_type, object_id, created_at);
