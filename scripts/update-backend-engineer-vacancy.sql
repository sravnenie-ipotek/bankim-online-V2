-- Update header (title) and description for Backend Engineer vacancy (en, he, ru).
-- Run against main app DB: psql "$DATABASE_URL" -f scripts/update-backend-engineer-vacancy.sql

UPDATE vacancies
SET
  title = 'Backend Engineer',
  description_en = $en$
We are looking for a Backend Engineer to design, build and maintain our services.

Responsibilities:
• Design and develop scalable backend services and APIs
• Write clean, maintainable code and tests
• Collaborate with frontend and product teams

Requirements:
• Experience with Node.js / TypeScript or similar
• Knowledge of SQL and databases (PostgreSQL)
• Familiarity with REST APIs and best practices
$en$,
  description_he = $he$
אנחנו מחפשים מהנדס Backend לתכנן, לבנות ולתחזק את השירותים שלנו.

תחומי אחריות:
• תכנון ופיתוח שירותי Backend ו-APIs בקנה מידה
• כתיבת קוד נקי, ניתן לתחזוקה ובדיקות
• שיתוף פעולה עם צוותי Frontend ומעבדה

דרישות:
• ניסיון ב-Node.js / TypeScript או דומה
• ידע ב-SQL ומסדי נתונים (PostgreSQL)
• הכרות עם REST APIs ושיטות עבודה מומלצות
$he$,
  description_ru = $ru$
Мы ищем Backend-инженера для проектирования, разработки и поддержки наших сервисов.

Обязанности:
• Проектирование и разработка масштабируемых backend-сервисов и API
• Написание чистого, поддерживаемого кода и тестов
• Взаимодействие с командами frontend и продукта

Требования:
• Опыт работы с Node.js / TypeScript или аналогами
• Знание SQL и баз данных (PostgreSQL)
• Знание REST API и лучших практик
$ru$
WHERE id = 1;
