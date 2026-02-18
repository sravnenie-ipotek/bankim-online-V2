import type { ContentEntry } from '../../interfaces/content-entry.interface';

export interface GetContentByScreenResult {
  content: Record<string, ContentEntry>;
}
