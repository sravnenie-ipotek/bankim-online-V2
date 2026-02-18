export interface ApiSuccessResponse<T = unknown> {
  status: 'success';
  data: T;
  language?: string;
  total?: number;
  category?: string | null;
  is_fallback?: boolean;
}
