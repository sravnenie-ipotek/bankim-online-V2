#!/usr/bin/env node
/**
 * Reads all i18n locale JSON files (public/locales/{lang}/*.json),
 * flattens keys across all languages, and generates SQL to upsert
 * content_items and content_translations for the content DB (cache source).
 *
 * Run from repo root: node scripts/generate-content-sql-from-i18n.js
 * Output: scripts/content-from-i18n.sql
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '../apps/web-next/public/locales');
const OUTPUT_SQL = path.join(__dirname, 'content-from-i18n.sql');

const LANGUAGES = ['he', 'en', 'ru'];
const DEFAULT_COMPONENT_TYPE = 'text';
const STATUS_APPROVED = 'approved';

/** Flatten object to key paths; values must be strings (skip non-string). */
function flattenKeys(obj, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flattenKeys(v, key));
    } else if (typeof v === 'string') {
      out[key] = v;
    }
  }
  return out;
}

function loadLocaleFile(lang, namespace) {
  const filePath = path.join(LOCALES_DIR, lang, `${namespace}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Warning: could not read ${filePath}: ${e.message}`);
    return null;
  }
}

function getNamespaces() {
  const firstLang = LANGUAGES[0];
  const dir = path.join(LOCALES_DIR, firstLang);
  if (!fs.existsSync(dir)) {
    console.error(`Locales dir not found: ${dir}`);
    process.exit(1);
  }
  return fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
}

function escapeSql(str) {
  if (str == null) return 'NULL';
  return "'" + String(str).replace(/'/g, "''").replace(/\\/g, '\\\\') + "'";
}

function main() {
  const namespaces = getNamespaces();
  /** Map: `${screen}|${content_key}` -> { screen, content_key, he?, en?, ru? } */
  const byKey = new Map();

  for (const namespace of namespaces) {
    for (const lang of LANGUAGES) {
      const obj = loadLocaleFile(lang, namespace);
      if (!obj) continue;
      const flat = flattenKeys(obj);
      for (const [contentKey, value] of Object.entries(flat)) {
        const mapKey = `${namespace}|${contentKey}`;
        if (!byKey.has(mapKey)) {
          byKey.set(mapKey, { screen: namespace, content_key: contentKey, he: null, en: null, ru: null });
        }
        const row = byKey.get(mapKey);
        row[lang] = value;
      }
    }
  }

  // Frontend menu/sidebar/footer use screen "global_components" but keys live in common.json.
  // Emit the same keys under global_components so API getContentByScreen('global_components') returns them.
  for (const entry of byKey.values()) {
    if (entry.screen !== 'common') continue;
    const mapKey = `global_components|${entry.content_key}`;
    if (byKey.has(mapKey)) continue;
    byKey.set(mapKey, {
      screen: 'global_components',
      content_key: entry.content_key,
      he: entry.he,
      en: entry.en,
      ru: entry.ru,
    });
  }

  // Frontend main page uses screen "home_page" but keys live in main_page.json and common.json.
  // Emit main_page keys under home_page, then common keys (so home_page has union of both).
  for (const entry of byKey.values()) {
    if (entry.screen !== 'main_page') continue;
    const mapKey = `home_page|${entry.content_key}`;
    if (byKey.has(mapKey)) continue;
    byKey.set(mapKey, {
      screen: 'home_page',
      content_key: entry.content_key,
      he: entry.he,
      en: entry.en,
      ru: entry.ru,
    });
  }
  for (const entry of byKey.values()) {
    if (entry.screen !== 'common') continue;
    const mapKey = `home_page|${entry.content_key}`;
    if (byKey.has(mapKey)) continue;
    byKey.set(mapKey, {
      screen: 'home_page',
      content_key: entry.content_key,
      he: entry.he,
      en: entry.en,
      ru: entry.ru,
    });
  }

  // Calculate mortgage flow uses mortgage_step1..4 and mortgage_calculation; keys live in common.
  const mortgageScreens = ['mortgage_step1', 'mortgage_step2', 'mortgage_step3', 'mortgage_step4', 'mortgage_calculation'];
  for (const screenName of mortgageScreens) {
    for (const entry of byKey.values()) {
      if (entry.screen !== 'common') continue;
      const mapKey = `${screenName}|${entry.content_key}`;
      if (byKey.has(mapKey)) continue;
      byKey.set(mapKey, {
        screen: screenName,
        content_key: entry.content_key,
        he: entry.he,
        en: entry.en,
        ru: entry.ru,
      });
    }
  }

  // Mortgage steps 1–3 use show_offers (and other main_page keys). Copy main_page keys to those screens.
  const mortgageStepsWithMainPage = ['mortgage_step1', 'mortgage_step2', 'mortgage_step3'];
  for (const screenName of mortgageStepsWithMainPage) {
    for (const entry of byKey.values()) {
      if (entry.screen !== 'main_page') continue;
      const mapKey = `${screenName}|${entry.content_key}`;
      if (byKey.has(mapKey)) continue;
      byKey.set(mapKey, {
        screen: screenName,
        content_key: entry.content_key,
        he: entry.he,
        en: entry.en,
        ru: entry.ru,
      });
    }
  }

  const rows = Array.from(byKey.values()).filter((r) => r.he || r.en || r.ru);
  console.log(`Collected ${rows.length} (screen, content_key) pairs from i18n (includes global_components, home_page, mortgage_step1-4 and mortgage_calculation copy of common).`);

  const lines = [
    '-- Generated by scripts/generate-content-sql-from-i18n.js',
    '-- Updates content_items and content_translations from public/locales/{lang}/*.json',
    '-- Run against the content DB. If you see "transaction is aborted", run ROLLBACK; then re-run this file.',
    '-- After running, restart API to warm cache (or call cache warmup).',
    '',
    'BEGIN;',
    '',
    '-- 1) Remove duplicate content_translations (keep one per content_item_id, language_code)',
    'DELETE FROM content_translations a',
    'USING content_translations b',
    'WHERE a.content_item_id = b.content_item_id AND a.language_code = b.language_code AND a.id > b.id;',
    '',
    '-- 2) Point translations at the kept content_item, then remove duplicate content_items',
    'WITH dup AS (',
    '  SELECT id, MIN(id) OVER (PARTITION BY screen_location, content_key) AS keep_id FROM content_items',
    ')',
    'UPDATE content_translations ct SET content_item_id = dup.keep_id',
    'FROM dup WHERE ct.content_item_id = dup.id AND dup.id <> dup.keep_id;',
    '',
    'DELETE FROM content_items a',
    'USING content_items b',
    'WHERE a.screen_location = b.screen_location AND a.content_key = b.content_key AND a.id > b.id;',
    '',
    '-- 3) Drop old unique on content_key only (so same key can exist in different screens)',
    'ALTER TABLE content_items DROP CONSTRAINT IF EXISTS content_items_content_key_key;',
    '',
    '-- 4) Ensure unique constraints for upserts (screen + key)',
    'CREATE UNIQUE INDEX IF NOT EXISTS idx_content_items_screen_key ON content_items(screen_location, content_key);',
    'CREATE UNIQUE INDEX IF NOT EXISTS idx_content_translations_item_lang ON content_translations(content_item_id, language_code);',
    '',
  ];

  const itemValues = [];
  const transValues = [];

  for (const r of rows) {
    const screen = r.screen;
    const content_key = r.content_key;
    itemValues.push(`(${escapeSql(screen)}, ${escapeSql(content_key)}, ${escapeSql(DEFAULT_COMPONENT_TYPE)}, true)`);
    for (const lang of LANGUAGES) {
      const val = r[lang];
      if (val != null && val !== '') {
        transValues.push(`(${escapeSql(screen)}, ${escapeSql(content_key)}, ${escapeSql(lang)}, ${escapeSql(val)})`);
      }
    }
  }

  const BATCH = 400;

  lines.push('-- Upsert content_items (batched)');
  for (let i = 0; i < itemValues.length; i += BATCH) {
    const batch = itemValues.slice(i, i + BATCH);
    lines.push(`INSERT INTO content_items (screen_location, content_key, component_type, is_active)`);
    lines.push('VALUES');
    lines.push(batch.join(',\n'));
    lines.push('ON CONFLICT (screen_location, content_key) DO UPDATE SET');
    lines.push('  updated_at = NOW(),');
    lines.push('  is_active = true;');
    lines.push('');
  }

  lines.push('-- Upsert content_translations (approved, batched)');
  for (let i = 0; i < transValues.length; i += BATCH) {
    const batch = transValues.slice(i, i + BATCH);
    lines.push('INSERT INTO content_translations (content_item_id, language_code, content_value, status)');
    lines.push('SELECT ci.id, v.lang, v.content_value, ' + escapeSql(STATUS_APPROVED));
    lines.push('FROM (VALUES');
    lines.push(batch.join(',\n'));
    lines.push(') AS v(screen_location, content_key, lang, content_value)');
    lines.push('JOIN content_items ci ON ci.screen_location = v.screen_location AND ci.content_key = v.content_key');
    lines.push('ON CONFLICT (content_item_id, language_code) DO UPDATE SET');
    lines.push('  content_value = EXCLUDED.content_value,');
    lines.push('  status = EXCLUDED.status;');
    lines.push('');
  }

  lines.push('COMMIT;');

  fs.writeFileSync(OUTPUT_SQL, lines.join('\n'), 'utf-8');
  console.log(`Written: ${OUTPUT_SQL}`);
}

main();
