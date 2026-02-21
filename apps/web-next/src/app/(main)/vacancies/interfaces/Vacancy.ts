export interface Vacancy {
  id: string
  title: string
  category: string
  employment_type: string
  salary_from?: number
  salary_to?: number
  location: string
  description: string
}
