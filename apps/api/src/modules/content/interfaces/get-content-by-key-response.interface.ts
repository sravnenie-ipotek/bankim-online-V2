export interface GetContentByKeyResponse {
  status: 'success';
  content_key: string;
  requested_language: string;
  actual_language: string;
  fallback_used: boolean;
  content: {
    value: string;
    component_type: string;
    category: string;
    screen_location: string;
  };
}
