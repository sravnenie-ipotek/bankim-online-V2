-- Performance indexes for the content screen query
-- (JOIN content_items + content_translations filtered by screen_location, language_code, status, is_active)
--
-- Run against the CONTENT database:
--   psql "$CONTENT_DATABASE_URL" -f 001_add_content_indexes.sql

CREATE INDEX IF NOT EXISTS idx_content_items_screen_active
  ON content_items (screen_location, is_active);

CREATE INDEX IF NOT EXISTS idx_content_translations_lookup
  ON content_translations (content_item_id, language_code, status);
