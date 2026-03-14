-- Update Hebrew translations for tenders_brokers (turnkey section) to match locales/he/tenders_brokers.json
-- Run against the content DB. Then restart API or run cache warmup.

BEGIN;

UPDATE content_translations ct
SET content_value = 'אספקת משרד מאובזר'
FROM content_items ci
WHERE ct.content_item_id = ci.id
  AND ci.screen_location = 'tenders_brokers'
  AND ci.content_key = 'tenders_turnkey_title'
  AND ct.language_code = 'he';

UPDATE content_translations ct
SET content_value = 'קבלת צוות עובדים'
FROM content_items ci
WHERE ct.content_item_id = ci.id
  AND ci.screen_location = 'tenders_brokers'
  AND ci.content_key = 'tenders_turnkey_bullet_2'
  AND ct.language_code = 'he';

UPDATE content_translations ct
SET content_value = 'זכויות שימוש במותג שלנו'
FROM content_items ci
WHERE ct.content_item_id = ci.id
  AND ci.screen_location = 'tenders_brokers'
  AND ci.content_key = 'tenders_turnkey_bullet_3'
  AND ct.language_code = 'he';

UPDATE content_translations ct
SET content_value = 'אנו מכסים את עלויות השיווק'
FROM content_items ci
WHERE ct.content_item_id = ci.id
  AND ci.screen_location = 'tenders_brokers'
  AND ci.content_key = 'tenders_turnkey_bullet_4'
  AND ct.language_code = 'he';

COMMIT;
