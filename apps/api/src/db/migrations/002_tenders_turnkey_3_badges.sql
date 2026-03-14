-- Add tenders_turnkey_3_badge_1 and tenders_turnkey_3_badge_2 for third group listbox badges
-- (stack.svg: "Поддержка по выстраиванию процессов" / earphones.svg: "24/7 информационная и техническая поддержка")
--
-- Run against the CONTENT database:
--   psql "$CONTENT_DATABASE_URL" -f apps/api/src/db/migrations/002_tenders_turnkey_3_badges.sql
-- After running, restart API or run cache warmup.

BEGIN;

-- Ensure unique index exists for content_items upsert (from 001 / content-from-i18n)
CREATE UNIQUE INDEX IF NOT EXISTS idx_content_items_screen_key
  ON content_items (screen_location, content_key);

CREATE UNIQUE INDEX IF NOT EXISTS idx_content_translations_item_lang
  ON content_translations (content_item_id, language_code);

-- 1) Upsert content_items for the two new keys
INSERT INTO content_items (screen_location, content_key, component_type, is_active)
VALUES
  ('tenders_brokers', 'tenders_turnkey_3_badge_1', 'text', true),
  ('tenders_brokers', 'tenders_turnkey_3_badge_2', 'text', true)
ON CONFLICT (screen_location, content_key) DO UPDATE SET
  updated_at = NOW(),
  is_active = true;

-- 2) Upsert content_translations (he, en, ru) for both keys
INSERT INTO content_translations (content_item_id, language_code, content_value, status)
SELECT ci.id, v.lang, v.content_value, 'approved'
FROM (VALUES
  ('tenders_brokers', 'tenders_turnkey_3_badge_1', 'he', 'תמיכה בבניית תהליכים'),
  ('tenders_brokers', 'tenders_turnkey_3_badge_1', 'en', 'Support for building processes'),
  ('tenders_brokers', 'tenders_turnkey_3_badge_1', 'ru', 'Поддержка по выстраиванию процессов'),
  ('tenders_brokers', 'tenders_turnkey_3_badge_2', 'he', 'תמיכה מידעית וטכנית 24/7'),
  ('tenders_brokers', 'tenders_turnkey_3_badge_2', 'en', '24/7 information and technical support'),
  ('tenders_brokers', 'tenders_turnkey_3_badge_2', 'ru', '24/7 информационная и техническая поддержка')
) AS v(screen_location, content_key, lang, content_value)
JOIN content_items ci ON ci.screen_location = v.screen_location AND ci.content_key = v.content_key
ON CONFLICT (content_item_id, language_code) DO UPDATE SET
  content_value = EXCLUDED.content_value,
  status = EXCLUDED.status;

COMMIT;
