-- Broker questionnaire submissions (tenders-for-brokers form).
-- Run against the main database:
--   psql "$DATABASE_URL" -f apps/api/src/db/migrations/003_broker_submissions.sql

BEGIN;

CREATE TABLE IF NOT EXISTS broker_submissions (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  desired_region VARCHAR(255) NOT NULL,
  employment_type VARCHAR(255) NOT NULL,
  monthly_income VARCHAR(255) NOT NULL,
  experience VARCHAR(255) NOT NULL,
  has_client_cases BOOLEAN NOT NULL,
  has_debt_cases BOOLEAN NOT NULL,
  additional_info TEXT,
  agree_terms BOOLEAN NOT NULL,
  license_number VARCHAR(255),
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc')
);

COMMIT;
