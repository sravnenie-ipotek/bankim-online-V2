import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ContentItemEntity } from '../../entities/content-item.entity';
import { ContentTranslationEntity } from '../../entities/content-translation.entity';
import { ContentCategoryEntity } from '../../entities/content-category.entity';
import { LanguageEntity } from '../../entities/language.entity';
import { ContentEntry } from './interfaces/content-entry.interface.js';
import { ContentItemListRow } from './interfaces/content-item-list-row.interface.js';

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
  ) {}

  async getContentByScreen(screen: string, language: string, type?: string) {
    const cacheKey = `content_${screen}_${language}_${type || 'all'}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

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

    const response = {
      status: 'success',
      screen_location: screen,
      language_code: language,
      content_count: rows.length,
      content,
      ...(type && { filtered_by_type: type }),
      cached: false,
    };

    await this.cache.set(cacheKey, { ...response, cached: true }, 300_000);
    return response;
  }

  async getContentByKey(key: string, language: string) {
    const item = await this.contentItemRepo.findOne({
      where: { content_key: key, is_active: true },
    });

    if (!item) {
      throw new NotFoundException('Content item not found');
    }

    const translation = await this.findTranslationWithFallback(
      item.id,
      language,
    );

    return {
      status: 'success',
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

  async getValidationErrors(language: string) {
    const cacheKey = `validation_errors_${language}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

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

    const response = {
      status: 'success',
      screen_location: 'validation_errors',
      language_code: language,
      content_count: rows.length,
      content,
      cached: false,
    };

    await this.cache.set(cacheKey, { ...response, cached: true }, 600_000);
    return response;
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
    const stores = (
      this.cache as unknown as { stores: { reset?: () => Promise<void> }[] }
    ).stores;
    if (stores?.[0]?.reset) await stores[0].reset();
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
