import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DropdownFieldExtractor } from './helpers/dropdown-field-extractor';
import { DropdownAliasMapper } from './helpers/dropdown-alias-mapper';
import { ContentItemEntity } from '../../entities/content-item.entity';
import { ContentTranslationEntity } from '../../entities/content-translation.entity';
import { DropdownResponse } from '../../interfaces/dropdown-response.interface';
import { DropdownEntry } from '../../interfaces/dropdown-entry.interface';
import { DropdownRawRow } from './interfaces/dropdown-raw-row.interface.js';
import { CacheConfig } from '../../config/cache.config.js';

const DEFAULT_TTL_MS = 300_000;

@Injectable()
export class DropdownService {
  private readonly fieldExtractor = new DropdownFieldExtractor();
  private readonly aliasMapper = new DropdownAliasMapper();

  constructor(
    @InjectRepository(ContentItemEntity, 'content')
    private readonly contentItemRepo: Repository<ContentItemEntity>,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly config: ConfigService,
    private readonly cacheConfig: CacheConfig,
  ) {}

  async getDropdownsByScreen(screen: string, language: string) {
    const cacheKey = `${this.cacheConfig.CACHE_KEY_PREFIX_DROPDOWNS}${screen}:${language}`;
    const cached = await this.cache.get<DropdownResponse>(cacheKey);
    if (cached) return cached;

    const response = await this.loadDropdownsByScreenFromDb(screen, language);
    const ttl = this.config.get<number>('REDIS_TTL_CONTENT') ?? DEFAULT_TTL_MS;
    await this.cache.set(cacheKey, { ...response, cached: true }, ttl);
    return response;
  }

  /**
   * Warmup only: load from DB and set this key in Redis. Does not clear cache.
   * Updates the single key so existing Redis keys are left intact.
   */
  async warmDropdownsByScreen(screen: string, language: string): Promise<void> {
    const cacheKey = `${this.cacheConfig.CACHE_KEY_PREFIX_DROPDOWNS}${screen}:${language}`;
    const response = await this.loadDropdownsByScreenFromDb(screen, language);
    const ttl = this.config.get<number>('REDIS_TTL_CONTENT') ?? DEFAULT_TTL_MS;
    await this.cache.set(cacheKey, { ...response, cached: true }, ttl);
  }

  /**
   * Warmup only: one bulk query for all dropdown items (all screens/languages), group in JS, set Redis keys.
   * Replaces 357 individual warmDropdownsByScreen calls.
   */
  async warmAllDropdownsBulk(): Promise<void> {
    type BulkRow = DropdownRawRow & {
      screen_location: string;
      language_code: string;
    };
    const rows: BulkRow[] = await this.contentItemRepo
      .createQueryBuilder('ci')
      .innerJoin(ContentTranslationEntity, 'ct', 'ci.id = ct.content_item_id')
      .select('ci.content_key', 'content_key')
      .addSelect('ci.component_type', 'component_type')
      .addSelect('ct.content_value', 'content_value')
      .addSelect('ci.screen_location', 'screen_location')
      .addSelect('ct.language_code', 'language_code')
      .where('ct.status = :status', { status: 'approved' })
      .andWhere('ci.is_active = :active', { active: true })
      .andWhere('ci.component_type IN (:...types)', {
        types: [
          'dropdown_container',
          'dropdown_option',
          'option',
          'placeholder',
          'label',
        ],
      })
      .orderBy('ci.screen_location')
      .addOrderBy('ct.language_code')
      .addOrderBy('ci.content_key')
      .addOrderBy('ci.component_type')
      .getRawMany();

    const byKey = new Map<
      string,
      {
        screen: string;
        language: string;
        response: DropdownResponse;
        dropdownMap: Map<string, DropdownEntry>;
        rowCount: number;
      }
    >();

    for (const row of rows) {
      const screen = row.screen_location ?? '';
      const language = row.language_code ?? '';
      const key = `${screen}:${language}`;
      if (!byKey.has(key)) {
        const response: DropdownResponse = {
          status: 'success',
          screen_location: screen,
          language_code: language,
          dropdowns: [],
          options: {},
          placeholders: {},
          labels: {},
          cached: false,
        };
        byKey.set(key, {
          screen,
          language,
          response,
          dropdownMap: new Map<string, DropdownEntry>(),
          rowCount: 0,
        });
      }
      const group = byKey.get(key)!;
      group.rowCount += 1;
      const fieldName = this.fieldExtractor.extract(row.content_key);
      const dropdownKey = `${screen}_${fieldName}`;
      if (!group.dropdownMap.has(fieldName)) {
        group.dropdownMap.set(fieldName, {
          key: dropdownKey,
          label: null,
          options: [],
          placeholder: null,
        });
      }
      const dropdown = group.dropdownMap.get(fieldName)!;
      this.applyRowToDropdown(row, dropdown, group.response);
    }

    const ttl = this.config.get<number>('REDIS_TTL_CONTENT') ?? DEFAULT_TTL_MS;
    const prefix = this.cacheConfig.CACHE_KEY_PREFIX_DROPDOWNS;
    for (const {
      screen,
      language,
      response,
      dropdownMap,
      rowCount,
    } of byKey.values()) {
      this.buildFinalResponse(dropdownMap, response);
      this.aliasMapper.applyAliases(screen, language, response);
      response.performance = {
        total_items: rowCount,
        dropdowns_found: response.dropdowns.length,
        query_time: new Date().toISOString(),
      };
      const cacheKey = `${prefix}${screen}:${language}`;
      await this.cache.set(cacheKey, { ...response, cached: true }, ttl);
    }
  }

  private async loadDropdownsByScreenFromDb(
    screen: string,
    language: string,
  ): Promise<DropdownResponse> {
    const rows: DropdownRawRow[] = await this.contentItemRepo
      .createQueryBuilder('ci')
      .innerJoin(ContentTranslationEntity, 'ct', 'ci.id = ct.content_item_id')
      .select('ci.content_key', 'content_key')
      .addSelect('ci.component_type', 'component_type')
      .addSelect('ct.content_value', 'content_value')
      .where('ci.screen_location = :screen', { screen })
      .andWhere('ct.language_code = :language', { language })
      .andWhere('ct.status = :status', { status: 'approved' })
      .andWhere('ci.is_active = :active', { active: true })
      .andWhere('ci.component_type IN (:...types)', {
        types: [
          'dropdown_container',
          'dropdown_option',
          'option',
          'placeholder',
          'label',
        ],
      })
      .orderBy('ci.content_key')
      .addOrderBy('ci.component_type')
      .getRawMany();

    const response: DropdownResponse = {
      status: 'success',
      screen_location: screen,
      language_code: language,
      dropdowns: [],
      options: {},
      placeholders: {},
      labels: {},
      cached: false,
    };

    const dropdownMap = new Map<string, DropdownEntry>();

    for (const row of rows) {
      const fieldName = this.fieldExtractor.extract(row.content_key);
      const dropdownKey = `${screen}_${fieldName}`;

      if (!dropdownMap.has(fieldName)) {
        dropdownMap.set(fieldName, {
          key: dropdownKey,
          label: null,
          options: [],
          placeholder: null,
        });
      }
      const dropdown = dropdownMap.get(fieldName)!;

      this.applyRowToDropdown(row, dropdown, response);
    }

    this.buildFinalResponse(dropdownMap, response);
    this.aliasMapper.applyAliases(screen, language, response);

    response.performance = {
      total_items: rows.length,
      dropdowns_found: response.dropdowns.length,
      query_time: new Date().toISOString(),
    };

    return response;
  }

  async getDropdownByField(
    fieldName: string,
    screen: string,
    language: string,
  ) {
    const full = await this.getDropdownsByScreen(screen, language);
    const key = `${screen}_${fieldName}`;
    return {
      status: 'success',
      field: fieldName,
      options: full.options[key] || [],
      label: full.labels[key] || null,
      placeholder: full.placeholders[key] || null,
    };
  }

  async getDropdownOptions(
    screenLocation: string,
    language: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- reserved for future business-path filtering
    _businessPath?: string,
  ) {
    return this.getDropdownsByScreen(screenLocation, language);
  }

  private applyRowToDropdown(
    row: DropdownRawRow,
    dropdown: DropdownEntry,
    response: DropdownResponse,
  ): void {
    switch (row.component_type) {
      case 'dropdown_container':
        dropdown.label = row.content_value;
        response.labels[dropdown.key] = row.content_value;
        break;

      case 'dropdown_option':
      case 'option': {
        const optionValue = this.extractOptionValue(row.content_key);
        if (optionValue) {
          dropdown.options.push({
            value: optionValue,
            label: row.content_value,
          });
        }
        break;
      }

      case 'placeholder':
        dropdown.placeholder = row.content_value;
        response.placeholders[dropdown.key] = row.content_value;
        break;

      case 'label':
        if (!dropdown.label) {
          dropdown.label = row.content_value;
          response.labels[dropdown.key] = row.content_value;
        }
        break;
    }
  }

  private extractOptionValue(contentKey: string): string | null {
    const patterns: RegExp[] = [
      /_option_(.+)$/,
      /_(selling_property)$/,
      /_(no_property)$/,
      /_(has_property)$/,
      /_(im_selling_a_property)$/,
      /_(i_no_own_any_property)$/,
      /_(i_own_a_property)$/,
      /_(yes_first_home)$/,
      /_(no_additional_property)$/,
      /_(investment)$/,
      /_(within_3_months)$/,
      /_(3_to_6_months)$/,
      /_(6_to_12_months)$/,
      /_(over_12_months)$/,
      /_(apartment)$/,
      /_(garden_apartment)$/,
      /_(penthouse)$/,
      /_(private_house)$/,
      /_(other)$/,
      /_(fixed_rate)$/,
      /_(variable_rate)$/,
      /_(mixed_rate)$/,
      /_(not_sure)$/,
      /_(single)$/,
      /_(married)$/,
      /_(divorced)$/,
      /_(widowed)$/,
      /_(partner)$/,
      /_(commonlaw_partner)$/,
      /_(no_high_school_diploma)$/,
      /_(partial_high_school_diploma)$/,
      /_(full_high_school_diploma)$/,
      /_(postsecondary_education)$/,
      /_(bachelors)$/,
      /_(masters)$/,
      /_(doctorate)$/,
      /_(employee)$/,
      /_(selfemployed)$/,
      /_(pension)$/,
      /_(student)$/,
      /_(unemployed)$/,
      /_(unpaid_leave)$/,
      /_(0_no_additional_income)$/,
      /_(1_no_additional_income)$/,
      /_(additional_salary)$/,
      /_(additional_work)$/,
      /_(property_rental_income)$/,
      /_(no_additional_income)$/,
      /_(0_no_obligations)$/,
      /_(bank_loan)$/,
      /_(consumer_credit)$/,
      /_(credit_card)$/,
      /_(no_obligations)$/,
      /_(fixed_interest)$/,
      /_(variable_interest)$/,
      /_(prime_interest)$/,
      /_(mixed_interest)$/,
      /_(cash_out_refinance)$/,
      /_(consolidate_debts)$/,
      /_(lower_interest_rate)$/,
      /_(reduce_monthly_payment)$/,
      /_(shorten_mortgage_term)$/,
      /_(land)$/,
      /_(no_not_registered)$/,
      /_(hapoalim)$/,
      /_(leumi)$/,
      /_(discount)$/,
      /_(massad)$/,
      /_(mizrahi)$/,
      /_([^_]+)$/,
    ];

    for (const pattern of patterns) {
      const m = contentKey.match(pattern);
      if (m) {
        let value = m[1];
        if (
          value === '0_no_additional_income' ||
          value === '1_no_additional_income'
        )
          value = 'no_additional_income';
        if (value === '0_no_obligations') value = 'no_obligations';
        return value;
      }
    }
    return null;
  }

  private buildFinalResponse(
    dropdownMap: Map<string, DropdownEntry>,
    response: DropdownResponse,
  ): void {
    dropdownMap.forEach((dropdown, fieldName) => {
      if (dropdown.options.length > 0 || dropdown.label) {
        response.dropdowns.push({
          key: dropdown.key,
          label: dropdown.label || fieldName.replace(/_/g, ' '),
        });
        if (dropdown.options.length > 0) {
          response.options[dropdown.key] = dropdown.options;
        }
      }
    });
  }
}
