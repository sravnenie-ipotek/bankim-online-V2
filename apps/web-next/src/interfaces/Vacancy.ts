export interface Vacancy {
  id: string;
  title: string;
  category: string;
  employment_type: string;
  salary_from?: number;
  salary_to?: number;
  salary_min?: number | null;
  salary_max?: number | null;
  location: string;
  description: string;
}
