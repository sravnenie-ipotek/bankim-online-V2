const rawContentRow = {
  content_key: 'home_page.title',
  component_type: 'text',
  category: 'general',
  content_value: 'Welcome',
  language_code: 'he',
  status: 'approved',
} as const;

const categoryRow = { id: 1, name: 'general', is_active: true } as const;

const languageRow = {
  id: 1,
  code: 'he',
  name: 'Hebrew',
  is_active: true,
} as const;

export { rawContentRow, categoryRow, languageRow };

export class ContentFixtures {
  static readonly rawContentRow = rawContentRow;

  static readonly contentEntry = {
    value: 'Welcome',
    component_type: 'text',
    category: 'general',
    language: 'he',
    status: 'approved',
  };

  static readonly sampleContentItem = {
    id: 1,
    content_key: 'test_key',
    component_type: 'text',
    category: 'general',
    screen_location: 'home_page',
    is_active: true,
  };

  static readonly sampleTranslation = {
    id: 1,
    content_item_id: 1,
    language_code: 'he',
    content_value: 'Translated text',
    status: 'approved',
  };

  static readonly enFallbackTranslation = {
    id: 1,
    content_item_id: 1,
    language_code: 'en',
    content_value: 'English fallback',
    status: 'approved',
  };

  static readonly categoryRow = categoryRow;

  static readonly languageRow = languageRow;

  static readonly cachedScreenPayload = {
    status: 'success',
    screen_location: 'home_page',
    language_code: 'he',
    content_count: 0,
    content: {},
    cached: true,
  };

  static readonly cachedValidationPayload = {
    status: 'success',
    screen_location: 'validation_errors',
    language_code: 'he',
    content_count: 0,
    content: {},
    cached: true,
  };

  static readonly contentItemListRow = {
    id: 1,
    content_key: 'key1',
    content_type: 'text',
    category: 'general',
    screen_location: 'home_page',
    component_type: 'text',
    description: 'Desc',
    created_at: '2024-01-01',
    updated_at: '2024-01-02',
    translation_count: '2',
    approved_translations: '2',
  };

  static readonly dbError = new Error('DB connection failed');
}
