import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ContentItemEntity } from '../../entities/content-item.entity';
import { ContentTranslationEntity } from '../../entities/content-translation.entity';
import { ContentCategoryEntity } from '../../entities/content-category.entity';
import { LanguageEntity } from '../../entities/language.entity';
import { ContentEntry } from './interfaces/content-entry.interface.js';
import { ContentItemListRow } from './interfaces/content-item-list-row.interface.js';
import type { GetContentByKeyResponse } from './interfaces/get-content-by-key-response.interface.js';
import { CacheConfig } from '../../config/cache.config.js';

const DEFAULT_TTL_MS = 300_000;
const VALIDATION_ERRORS_TTL_MS = 600_000;
const SUPPORTED_LANGUAGES = ['en', 'he', 'ru'] as const;

function normalizeLanguage(lang: string): string {
  const base = lang.split('-')[0].toLowerCase();
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(base) ? base : 'en';
}

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentItemEntity, 'content')
    private readonly contentItemRepo: Repository<ContentItemEntity>,
    @InjectRepository(ContentTranslationEntity, 'content')
    private readonly translationRepo: Repository<ContentTranslationEntity>,
    @InjectRepository(ContentCategoryEntity, 'content')
    private readonly categoryRepo: Repository<ContentCategoryEntity>,
    @InjectRepository(LanguageEntity, 'content')
    private readonly languageRepo: Repository<LanguageEntity>,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly config: ConfigService,
    private readonly cacheConfig: CacheConfig,
  ) {}

  async getContentByScreen(screen: string, language: string, type?: string) {
    const lang = normalizeLanguage(language);
    const cacheKey = `${this.cacheConfig.CACHE_KEY_PREFIX_CONTENT}${screen}:${lang}:${type || 'all'}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    console.log(
      `[ContentService] Cache miss for ${screen}:${lang} - reading from SQL`,
    );
    const response = await this.loadContentByScreenFromDb(
      screen,
      lang,
      type,
    );
    const ttl = this.config.get<number>('REDIS_TTL_CONTENT') ?? DEFAULT_TTL_MS;
    await this.cache.set(cacheKey, { ...response, cached: true }, ttl);
    return response;
  }

  /**
   * Warmup only: load from DB and set this key in Redis. Does not clear cache.
   * Updates the single key so existing Redis keys are left intact.
   */
  async warmContentByScreen(
    screen: string,
    language: string,
    type?: string,
  ): Promise<void> {
    const cacheKey = `${this.cacheConfig.CACHE_KEY_PREFIX_CONTENT}${screen}:${language}:${type || 'all'}`;
    const response = await this.loadContentByScreenFromDb(
      screen,
      language,
      type,
    );
    const ttl = this.config.get<number>('REDIS_TTL_CONTENT') ?? DEFAULT_TTL_MS;
    await this.cache.set(cacheKey, { ...response, cached: true }, ttl);
  }

  /**
   * Warmup only: one bulk query for all active+approved content, group by (screen, language), set Redis keys.
   * Replaces 357 individual warmContentByScreen calls.
   */
  async warmAllContentBulk(): Promise<void> {
    const rows: {
      content_key: string;
      component_type: string;
      category: string;
      content_value: string;
      language_code: string;
      status: string;
      screen_location: string;
    }[] = await this.contentItemRepo
      .createQueryBuilder('ci')
      .innerJoin(ContentTranslationEntity, 'ct', 'ci.id = ct.content_item_id')
      .select('ci.content_key', 'content_key')
      .addSelect('ci.component_type', 'component_type')
      .addSelect('ci.category', 'category')
      .addSelect('ct.content_value', 'content_value')
      .addSelect('ct.language_code', 'language_code')
      .addSelect('ct.status', 'status')
      .addSelect('ci.screen_location', 'screen_location')
      .where('ct.status = :status', { status: 'approved' })
      .andWhere('ci.is_active = :active', { active: true })
      .orderBy('ci.screen_location')
      .addOrderBy('ct.language_code')
      .addOrderBy('ci.content_key')
      .getRawMany();

    const byKey = new Map<
      string,
      {
        screen: string;
        language: string;
        content: Record<string, ContentEntry>;
      }
    >();
    for (const row of rows) {
      const screen = row.screen_location ?? '';
      const language = row.language_code ?? '';
      const key = `${screen}:${language}`;
      if (!byKey.has(key)) {
        byKey.set(key, { screen, language, content: {} });
      }
      const entry = byKey.get(key)!;
      entry.content[row.content_key] = {
        value: row.content_value,
        component_type: row.component_type,
        category: row.category,
        language: row.language_code,
        status: row.status,
      };
    }

    const ttl = this.config.get<number>('REDIS_TTL_CONTENT') ?? DEFAULT_TTL_MS;
    const prefix = this.cacheConfig.CACHE_KEY_PREFIX_CONTENT;
    for (const { screen, language, content } of byKey.values()) {
      const cacheKey = `${prefix}${screen}:${language}:all`;
      const response = {
        status: 'success' as const,
        screen_location: screen,
        language_code: language,
        content_count: Object.keys(content).length,
        content,
        cached: true,
      };
      await this.cache.set(cacheKey, response, ttl);
    }
  }

  private async loadContentByScreenFromDb(
    screen: string,
    language: string,
    type?: string,
  ): Promise<{
    status: 'success';
    screen_location: string;
    language_code: string;
    content_count: number;
    content: Record<string, ContentEntry>;
    filtered_by_type?: string;
    cached: boolean;
  }> {
    const qb = this.contentItemRepo
      .createQueryBuilder('ci')
      .innerJoin(ContentTranslationEntity, 'ct', 'ci.id = ct.content_item_id')
      .select('ci.content_key', 'content_key')
      .addSelect('ci.component_type', 'component_type')
      .addSelect('ci.category', 'category')
      .addSelect('ct.content_value', 'content_value')
      .addSelect('ct.language_code', 'language_code')
      .addSelect('ct.status', 'status')
      .where('ci.screen_location = :screen', { screen })
      .andWhere('ct.language_code = :language', { language })
      .andWhere('ct.status = :status', { status: 'approved' })
      .andWhere('ci.is_active = :active', { active: true })
      .orderBy('ci.content_key');

    if (type) {
      qb.andWhere('ci.component_type = :type', { type });
    }

    const rows: {
      content_key: string;
      component_type: string;
      category: string;
      content_value: string;
      language_code: string;
      status: string;
    }[] = await qb.getRawMany();

    const content: Record<string, ContentEntry> = {};
    for (const row of rows) {
      content[row.content_key] = {
        value: row.content_value,
        component_type: row.component_type,
        category: row.category,
        language: row.language_code,
        status: row.status,
      };
    }

    return {
      status: 'success',
      screen_location: screen,
      language_code: language,
      content_count: rows.length,
      content,
      ...(type && { filtered_by_type: type }),
      cached: false,
    };
  }

  async getContentByKey(
    key: string,
    language: string,
  ): Promise<GetContentByKeyResponse> {
    const lang = normalizeLanguage(language);
    const cacheKey = `${this.cacheConfig.CACHE_KEY_PREFIX_ASSET}${key}:${lang}`;
    const cached = await this.cache.get<GetContentByKeyResponse>(cacheKey);
    if (cached) return cached;

    const item = await this.contentItemRepo.findOne({
      where: { content_key: key, is_active: true },
    });

    if (!item) {
      throw new NotFoundException('Content item not found');
    }

    const translation = await this.findTranslationWithFallback(
      item.id,
      lang,
    );

    const response = {
      status: 'success' as const,
      content_key: key,
      requested_language: language,
      actual_language: translation?.language_code ?? language,
      fallback_used: translation
        ? translation.language_code !== language
        : false,
      content: {
        value: translation?.content_value ?? '',
        component_type: item.component_type,
        category: item.category,
        screen_location: item.screen_location,
      },
    };

    const ttl = this.config.get<number>('REDIS_TTL_CONTENT') ?? DEFAULT_TTL_MS;
    await this.cache.set(cacheKey, response, ttl);
    return response;
  }

  async getCategories() {
    const categories = await this.categoryRepo.find({
      where: { is_active: true },
      order: { sort_order: 'ASC', name: 'ASC' },
    });
    return {
      status: 'success',
      categories_count: categories.length,
      categories,
    };
  }

  async getLanguages() {
    const languages = await this.languageRepo.find({
      where: { is_active: true },
      order: { is_default: 'DESC', name: 'ASC' },
    });
    return { status: 'success', languages_count: languages.length, languages };
  }

  /** Distinct (screen_location, language_code) for cache warmup. */
  async getScreenLanguagePairs(): Promise<
    Array<{ screen: string; language: string }>
  > {
    const rows = await this.contentItemRepo
      .createQueryBuilder('ci')
      .innerJoin(ContentTranslationEntity, 'ct', 'ci.id = ct.content_item_id')
      .distinct(true)
      .select('ci.screen_location', 'screen')
      .addSelect('ct.language_code', 'language')
      .where('ci.is_active = :active', { active: true })
      .andWhere('ct.status = :status', { status: 'approved' })
      .getRawMany();
    // Normalize: drivers may return lowercase or raw column names
    return rows
      .map((row: Record<string, string>) => ({
        screen: row.screen ?? row.screen_location ?? '',
        language: row.language ?? row.language_code ?? '',
      }))
      .filter((p) => p.screen && p.language);
  }

  async getValidationErrors(language: string) {
    const lang = normalizeLanguage(language);
    const cacheKey = `${this.cacheConfig.CACHE_KEY_PREFIX_VALIDATION_ERRORS}${lang}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const response = await this.loadValidationErrorsFromDb(lang);
    const ttl =
      this.config.get<number>('REDIS_TTL_CONTENT') ?? VALIDATION_ERRORS_TTL_MS;
    await this.cache.set(cacheKey, { ...response, cached: true }, ttl);
    return response;
  }

  /**
   * Warmup only: load validation_errors from DB and set this key in Redis. Does not clear cache.
   */
  async warmValidationErrors(language: string): Promise<void> {
    const cacheKey = `${this.cacheConfig.CACHE_KEY_PREFIX_VALIDATION_ERRORS}${language}`;
    const response = await this.loadValidationErrorsFromDb(language);
    const ttl =
      this.config.get<number>('REDIS_TTL_CONTENT') ?? VALIDATION_ERRORS_TTL_MS;
    await this.cache.set(cacheKey, { ...response, cached: true }, ttl);
  }

  /**
   * Warmup only: one bulk query for all validation_errors (all languages), set Redis keys.
   * Replaces 3 individual warmValidationErrors calls.
   */
  async warmAllValidationErrorsBulk(): Promise<void> {
    const rows: {
      content_key: string;
      component_type: string;
      category: string;
      content_value: string;
      language_code: string;
      status: string;
    }[] = await this.contentItemRepo
      .createQueryBuilder('ci')
      .innerJoin(ContentTranslationEntity, 'ct', 'ci.id = ct.content_item_id')
      .select('ci.content_key', 'content_key')
      .addSelect('ci.component_type', 'component_type')
      .addSelect('ci.category', 'category')
      .addSelect('ct.content_value', 'content_value')
      .addSelect('ct.language_code', 'language_code')
      .addSelect('ct.status', 'status')
      .where('ci.screen_location = :screen', { screen: 'validation_errors' })
      .andWhere('ct.status = :status', { status: 'approved' })
      .andWhere('ci.is_active = :active', { active: true })
      .orderBy('ct.language_code')
      .addOrderBy('ci.content_key')
      .getRawMany();

    const byLanguage = new Map<string, Record<string, ContentEntry>>();
    for (const row of rows) {
      const language = row.language_code ?? '';
      if (!byLanguage.has(language)) {
        byLanguage.set(language, {});
      }
      const content = byLanguage.get(language)!;
      content[row.content_key] = {
        value: row.content_value,
        component_type: row.component_type,
        category: row.category,
        language: row.language_code,
        status: row.status,
      };
    }

    const ttl =
      this.config.get<number>('REDIS_TTL_CONTENT') ?? VALIDATION_ERRORS_TTL_MS;
    const prefix = this.cacheConfig.CACHE_KEY_PREFIX_VALIDATION_ERRORS;
    for (const [language, content] of byLanguage) {
      const cacheKey = `${prefix}${language}`;
      const response = {
        status: 'success' as const,
        screen_location: 'validation_errors',
        language_code: language,
        content_count: Object.keys(content).length,
        content,
        cached: true,
      };
      await this.cache.set(cacheKey, response, ttl);
    }
  }

  private async loadValidationErrorsFromDb(language: string): Promise<{
    status: 'success';
    screen_location: string;
    language_code: string;
    content_count: number;
    content: Record<string, ContentEntry>;
    cached: boolean;
  }> {
    const rows: {
      content_key: string;
      component_type: string;
      category: string;
      content_value: string;
      language_code: string;
      status: string;
    }[] = await this.contentItemRepo
      .createQueryBuilder('ci')
      .innerJoin(ContentTranslationEntity, 'ct', 'ci.id = ct.content_item_id')
      .select('ci.content_key', 'content_key')
      .addSelect('ci.component_type', 'component_type')
      .addSelect('ci.category', 'category')
      .addSelect('ct.content_value', 'content_value')
      .addSelect('ct.language_code', 'language_code')
      .addSelect('ct.status', 'status')
      .where('ci.screen_location = :screen', { screen: 'validation_errors' })
      .andWhere('ct.language_code = :language', { language })
      .andWhere('ct.status = :status', { status: 'approved' })
      .andWhere('ci.is_active = :active', { active: true })
      .orderBy('ci.content_key')
      .getRawMany();

    const content: Record<string, ContentEntry> = {};
    for (const row of rows) {
      content[row.content_key] = {
        value: row.content_value,
        component_type: row.component_type,
        category: row.category,
        language: row.language_code,
        status: row.status,
      };
    }

    return {
      status: 'success',
      screen_location: 'validation_errors',
      language_code: language,
      content_count: rows.length,
      content,
      cached: false,
    };
  }

  async getContentItems(
    page: number,
    limit: number,
    category?: string,
    screenLocation?: string,
    search?: string,
  ) {
    const offset = (page - 1) * limit;

    const qb: SelectQueryBuilder<ContentItemEntity> = this.contentItemRepo
      .createQueryBuilder('ci')
      .leftJoin(ContentTranslationEntity, 'ct', 'ci.id = ct.content_item_id')
      .select('ci.id', 'id')
      .addSelect('ci.content_key', 'content_key')
      .addSelect('ci.content_type', 'content_type')
      .addSelect('ci.category', 'category')
      .addSelect('ci.screen_location', 'screen_location')
      .addSelect('ci.component_type', 'component_type')
      .addSelect('ci.description', 'description')
      .addSelect('ci.created_at', 'created_at')
      .addSelect('ci.updated_at', 'updated_at')
      .addSelect('COUNT(ct.id)', 'translation_count')
      .addSelect(
        "COUNT(CASE WHEN ct.status = 'approved' THEN 1 END)",
        'approved_translations',
      )
      .where('ci.is_active = :active', { active: true })
      .groupBy('ci.id')
      .addGroupBy('ci.content_key')
      .addGroupBy('ci.content_type')
      .addGroupBy('ci.category')
      .addGroupBy('ci.screen_location')
      .addGroupBy('ci.component_type')
      .addGroupBy('ci.description')
      .addGroupBy('ci.created_at')
      .addGroupBy('ci.updated_at')
      .orderBy('ci.updated_at', 'DESC')
      .limit(limit)
      .offset(offset);

    if (category) {
      qb.andWhere('ci.category = :category', { category });
    }
    if (screenLocation) {
      qb.andWhere('ci.screen_location = :screenLocation', { screenLocation });
    }
    if (search) {
      qb.andWhere(
        '(ci.content_key ILIKE :search OR ci.description ILIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    const rows: ContentItemListRow[] = await qb.getRawMany();

    const countQb = this.contentItemRepo
      .createQueryBuilder('ci')
      .where('ci.is_active = :active', { active: true });

    if (category) countQb.andWhere('ci.category = :category', { category });
    if (screenLocation)
      countQb.andWhere('ci.screen_location = :screenLocation', {
        screenLocation,
      });
    if (search) {
      countQb.andWhere(
        '(ci.content_key ILIKE :search OR ci.description ILIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    const total = await countQb.getCount();

    return {
      status: 'success',
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      items: rows,
    };
  }

  async getCacheStats() {
    return {
      status: 'success',
      cache_stats: { message: 'Cache is managed by Nest CacheModule' },
      ttl: '300 seconds (5 minutes)',
    };
  }

  async clearCache() {
    const cacheWithStores = this.cache as unknown as {
      stores?: Array<{ clear?: () => Promise<void> }>;
    };
    const stores = cacheWithStores.stores;
    if (stores?.[0] && typeof stores[0].clear === 'function') {
      await stores[0].clear();
    }
    return { status: 'success', message: 'Content cache cleared successfully' };
  }

  private async findTranslationWithFallback(
    contentItemId: number,
    language: string,
  ): Promise<ContentTranslationEntity | null> {
    const translation = await this.translationRepo.findOne({
      where: {
        content_item_id: contentItemId,
        language_code: language,
        status: 'approved',
      },
    });
    if (translation) return translation;

    return this.translationRepo.findOne({
      where: {
        content_item_id: contentItemId,
        language_code: 'en',
        status: 'approved',
      },
    });
  }
}
