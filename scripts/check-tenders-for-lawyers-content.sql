-- Check if tenders_for_lawyers (or tenders_lawyers) content exists in the content DB.
-- Run: psql "$CONTENT_DATABASE_URL" -f scripts/check-tenders-for-lawyers-content.sql
--
-- Note: content-from-i18n.sql inserts under screen_location 'tenders_lawyers' (from tenders_lawyers.json).
-- The tenders-for-lawyers page uses useContentFetch('tenders_for_lawyers'). If your API maps that to
-- the same table, ensure the API accepts tenders_for_lawyers as an alias for tenders_lawyers, or
-- change the page to use 'tenders_lawyers' so the keys are found.

-- 1) Count content_items for the lawyers screen (try both possible screen names)
SELECT 'content_items (tenders_for_lawyers)' AS check_type, screen_location, COUNT(*) AS cnt
FROM content_items
WHERE screen_location IN ('tenders_for_lawyers', 'tenders_lawyers')
GROUP BY screen_location;

-- 2) List all content keys for the lawyers screen
SELECT ci.screen_location, ci.content_key, ci.is_active
FROM content_items ci
WHERE ci.screen_location IN ('tenders_for_lawyers', 'tenders_lawyers')
ORDER BY ci.screen_location, ci.content_key;

-- 3) Sample translations (one row per key per language) to verify values exist
SELECT ci.screen_location, ci.content_key, ct.language_code, LEFT(ct.content_value, 60) AS content_preview
FROM content_items ci
JOIN content_translations ct ON ct.content_item_id = ci.id
WHERE ci.screen_location IN ('tenders_for_lawyers', 'tenders_lawyers')
ORDER BY ci.content_key, ct.language_code;

-- 4) Keys required by tenders-for-lawyers page (must all exist)
-- tenders_about_text, lawyers_hero_red_part, tenders_about_title,
-- tenders_advantage_1, tenders_advantage_2, tenders_advantage_3, tenders_register_button
SELECT ci.screen_location, ci.content_key,
       COUNT(ct.id) FILTER (WHERE ct.language_code = 'he') AS has_he,
       COUNT(ct.id) FILTER (WHERE ct.language_code = 'en') AS has_en,
       COUNT(ct.id) FILTER (WHERE ct.language_code = 'ru') AS has_ru
FROM content_items ci
LEFT JOIN content_translations ct ON ct.content_item_id = ci.id
WHERE ci.screen_location IN ('tenders_for_lawyers', 'tenders_lawyers')
  AND ci.content_key IN (
    'tenders_about_text', 'lawyers_hero_red_part', 'tenders_about_title',
    'tenders_advantage_1', 'tenders_advantage_2', 'tenders_advantage_3',
    'tenders_register_button'
  )
GROUP BY ci.screen_location, ci.content_key
ORDER BY ci.content_key;
