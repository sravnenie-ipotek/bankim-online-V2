export interface VacancyDetail {
  id: string;
  title: string;
  category: string;
  employment_type: string;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string | null;
  salary_from?: number;
  salary_to?: number;
  location: string;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  nice_to_have?: string[];
  benefits?: string[];
}
