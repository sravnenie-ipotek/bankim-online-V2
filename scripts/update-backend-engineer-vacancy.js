#!/usr/bin/env node
/**
 * Update header (title) and description for the Backend Engineer vacancy
 * in English, Hebrew, and Russian.
 *
 * Usage:
 *   node scripts/update-backend-engineer-vacancy.js
 *   node scripts/update-backend-engineer-vacancy.js <vacancy_id>
 *
 * Requires DATABASE_URL in .env (main app DB where vacancies table lives).
 */

require('dotenv').config();
const { Pool } = require('pg');

const TITLE = 'Backend Engineer';

const DESCRIPTION_EN = `We are looking for a Backend Engineer to design, build and maintain our services.

Responsibilities:
• Design and develop scalable backend services and APIs
• Write clean, maintainable code and tests
• Collaborate with frontend and product teams

Requirements:
• Experience with Node.js / TypeScript or similar
• Knowledge of SQL and databases (PostgreSQL)
• Familiarity with REST APIs and best practices`;

const DESCRIPTION_HE = `אנחנו מחפשים מהנדס Backend לתכנן, לבנות ולתחזק את השירותים שלנו.

תחומי אחריות:
• תכנון ופיתוח שירותי Backend ו-APIs בקנה מידה
• כתיבת קוד נקי, ניתן לתחזוקה ובדיקות
• שיתוף פעולה עם צוותי Frontend ומעבדה

דרישות:
• ניסיון ב-Node.js / TypeScript או דומה
• ידע ב-SQL ומסדי נתונים (PostgreSQL)
• הכרות עם REST APIs ו� Best practices`;

const DESCRIPTION_RU = `Мы ищем Backend-инженера для проектирования, разработки и поддержки наших сервисов.

Обязанности:
• Проектирование и разработка масштабируемых backend-сервисов и API
• Написание чистого, поддерживаемого кода и тестов
• Взаимодействие с командами frontend и продукта

Требования:
• Опыт работы с Node.js / TypeScript или аналогами
• Знание SQL и баз данных (PostgreSQL)
• Знание REST API и лучших практик`;

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL is not set. Set it in .env (main app database).');
    process.exit(1);
  }

  const pool = new Pool({ connectionString: databaseUrl });
  const vacancyId = process.argv[2] ? parseInt(process.argv[2], 10) : null;

  try {
    let targetId = vacancyId;
    if (targetId == null || isNaN(targetId)) {
      const findResult = await pool.query(
        `SELECT id, title FROM vacancies WHERE LOWER(title) LIKE $1 AND is_active = true`,
        ['%backend engineer%']
      );
      if (findResult.rows.length === 0) {
        console.error('No active vacancy found with title matching "backend engineer".');
        console.error('Create one in the DB or run: node scripts/update-backend-engineer-vacancy.js <vacancy_id>');
        process.exit(1);
      }
      if (findResult.rows.length > 1) {
        console.error('Multiple vacancies match "backend engineer". Pass vacancy id as first argument.');
        findResult.rows.forEach((r) => console.error(`  id=${r.id} title=${r.title}`));
        process.exit(1);
      }
      targetId = findResult.rows[0].id;
      console.log(`Found vacancy id=${targetId} title="${findResult.rows[0].title}"`);
    } else {
      const exists = await pool.query('SELECT id, title FROM vacancies WHERE id = $1', [targetId]);
      if (exists.rows.length === 0) {
        console.error(`Vacancy with id=${targetId} not found.`);
        process.exit(1);
      }
      console.log(`Updating vacancy id=${targetId} title="${exists.rows[0].title}"`);
    }

    await pool.query(
      `UPDATE vacancies
       SET title = $1, description_en = $2, description_he = $3, description_ru = $4
       WHERE id = $5`,
      [TITLE, DESCRIPTION_EN, DESCRIPTION_HE, DESCRIPTION_RU, targetId]
    );

    console.log('Updated title and description (en, he, ru) for vacancy id=', targetId);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
