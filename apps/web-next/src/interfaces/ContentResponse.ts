import { ContentItem } from './ContentItem';

export interface ContentResponse {
  status: string;
  screen_location: string;
  language_code: string;
  content_count: number;
  content: Record<string, ContentItem>;
}
