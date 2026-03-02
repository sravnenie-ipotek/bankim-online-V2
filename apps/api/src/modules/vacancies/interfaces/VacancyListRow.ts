export interface VacancyListRow {
  id: number;
  title: string;
  category: string | null;
  subcategory: string | null;
  location: string | null;
  employment_type: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  description: string | null;
  requirements: string | null;
  benefits: string | null;
  is_featured: boolean;
  posted_date: Date | null;
  closing_date: Date | null;
}
