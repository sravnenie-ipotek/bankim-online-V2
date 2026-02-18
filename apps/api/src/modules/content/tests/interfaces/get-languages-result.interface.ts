export interface GetLanguagesResult {
  status: string;
  languages_count: number;
  languages: Array<{
    id: number;
    code: string;
    name: string;
    is_active: boolean;
  }>;
}
