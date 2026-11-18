// Loads the sample categories, locations and statuses from @pherinepal/domain.
// Sample data is for development only. It is refused in production unless explicitly allowed.
// Re-running is safe: categories and locations are upserted; existing statuses are NOT overwritten,
// so admin changes made in the database are never reverted by a seed.
import pg from 'pg';
import { LOCATIONS, SAMPLE_STATUS_ROWS, SERVICE_CATEGORIES } from '@pherinepal/domain';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not set. See .env.example.');
  process.exit(1);
}

if (process.env.NODE_ENV === 'production' && process.env.ALLOW_SAMPLE_SEED !== 'true') {
  console.error('Refusing to seed sample data in production. Set ALLOW_SAMPLE_SEED=true only for a non-production database.');
  process.exit(1);
}

const client = new pg.Client({ connectionString });
await client.connect();

try {
  await client.query('BEGIN');

  for (const [index, category] of SERVICE_CATEGORIES.entries()) {
    await client.query(
      `INSERT INTO service_categories
         (code, service_group, name_en, name_ne, description_en, description_ne, transactional, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (code) DO UPDATE SET
         service_group = EXCLUDED.service_group,
         name_en = EXCLUDED.name_en,
         name_ne = EXCLUDED.name_ne,
         description_en = EXCLUDED.description_en,
         description_ne = EXCLUDED.description_ne,
         transactional = EXCLUDED.transactional,
         sort_order = EXCLUDED.sort_order,
         updated_at = now()`,
      [
        category.code,
        category.group,
        category.name.en,
        category.name.ne,
        category.description.en,
        category.description.ne,
        category.transactional,
        index,
      ],
    );
  }

  for (const location of LOCATIONS) {
    await client.query(
      `INSERT INTO locations (code, province_en, province_ne, name_en, name_ne)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (code) DO UPDATE SET
         province_en = EXCLUDED.province_en,
         province_ne = EXCLUDED.province_ne,
         name_en = EXCLUDED.name_en,
         name_ne = EXCLUDED.name_ne,
         updated_at = now()`,
      [location.code, location.province.en, location.province.ne, location.name.en, location.name.ne],
    );
  }

  for (const row of SAMPLE_STATUS_ROWS) {
    await client.query(
      `INSERT INTO service_statuses
         (category_id, location_id, status, instant_booking_enabled, approval_booking_enabled, change_reason)
       SELECT c.id, l.id, $3::text, false, false, 'sample seed (development only)'
         FROM service_categories c, locations l
        WHERE c.code = $1 AND l.code = $2
       ON CONFLICT (category_id, location_id) DO NOTHING`,
      [row.category, row.location, row.status],
    );
  }

  await client.query('COMMIT');
  console.log(
    `seeded ${SERVICE_CATEGORIES.length} categories, ${LOCATIONS.length} locations, ${SAMPLE_STATUS_ROWS.length} sample statuses`,
  );
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  await client.end();
}
