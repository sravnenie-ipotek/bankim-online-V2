import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { BankingStandardEntity } from '../../entities/banking-standard.entity';
import { PropertyOwnershipRuleEntity } from '../../entities/property-ownership-rule.entity';
import { ContentItemEntity } from '../../entities/content-item.entity';
import { ContentTranslationEntity } from '../../entities/content-translation.entity';

@Injectable()
export class MortgageService {
  constructor(
    @InjectRepository(BankingStandardEntity)
    private readonly standardRepo: Repository<BankingStandardEntity>,
    @InjectRepository(PropertyOwnershipRuleEntity)
    private readonly ownershipRuleRepo: Repository<PropertyOwnershipRuleEntity>,
    @InjectRepository(ContentItemEntity, 'content')
    private readonly contentItemRepo: Repository<ContentItemEntity>,
    @InjectDataSource('content') private readonly contentDs: DataSource,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async getCalculationParameters(businessPath: string) {
    const validPaths = [
      'mortgage',
      'credit',
      'mortgage_refinance',
      'credit_refinance',
    ];
    if (!validPaths.includes(businessPath)) {
      throw new BadRequestException(
        'Invalid business_path. Must be one of: ' + validPaths.join(', '),
      );
    }

    const cacheKey = `calculation_parameters_${businessPath}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) return cached;

    const standards = await this.standardRepo
      .createQueryBuilder('bs')
      .select([
        'bs.standard_category',
        'bs.standard_name',
        'bs.standard_value',
        'bs.value_type',
        'bs.description',
      ])
      .where('bs.business_path = :businessPath', { businessPath })
      .andWhere('bs.is_active = :active', { active: true })
      .andWhere('(bs.effective_to IS NULL OR bs.effective_to >= CURRENT_DATE)')
      .orderBy('bs.standard_category')
      .addOrderBy('bs.standard_name')
      .getMany();

    const parameters: Record<
      string,
      Record<string, { value: number; type: string; description: string }>
    > = {};
    for (const row of standards) {
      if (!parameters[row.standard_category])
        parameters[row.standard_category] = {};
      parameters[row.standard_category][row.standard_name] = {
        value: parseFloat(row.standard_value),
        type: row.value_type,
        description: row.description,
      };
    }

    const rateResult = await this.callDbFunction('get_current_mortgage_rate()');
    const currentRate = parseFloat(rateResult);

    let propertyOwnershipLtvs: Record<
      string,
      { ltv: number; min_down_payment: number }
    > = {};
    try {
      const rules = await this.ownershipRuleRepo.find({
        where: { is_active: true },
      });
      for (const rule of rules) {
        propertyOwnershipLtvs[rule.option_key] = {
          ltv: parseFloat(rule.ltv_percentage),
          min_down_payment: parseFloat(rule.min_down_payment_percentage),
        };
      }
    } catch {
      propertyOwnershipLtvs = {
        no_property: { ltv: 75.0, min_down_payment: 25.0 },
        has_property: { ltv: 50.0, min_down_payment: 50.0 },
        selling_property: { ltv: 70.0, min_down_payment: 30.0 },
      };
    }

    const responseData = {
      status: 'success',
      data: {
        business_path: businessPath,
        current_interest_rate: currentRate,
        property_ownership_ltvs: propertyOwnershipLtvs,
        standards: parameters,
        last_updated: new Date().toISOString(),
      },
    };

    await this.cache.set(cacheKey, responseData, 300_000);
    return responseData;
  }

  async getPropertyOwnershipLtv() {
    const standards = await this.standardRepo
      .createQueryBuilder('bs')
      .select(['bs.standard_name', 'bs.standard_value'])
      .where('bs.business_path = :path', { path: 'mortgage' })
      .andWhere('bs.standard_category = :category', {
        category: 'property_ownership_ltv',
      })
      .andWhere('bs.is_active = :active', { active: true })
      .orderBy('bs.standard_name')
      .getMany();

    const ltvRatios: Record<string, number> = {};
    for (const row of standards) {
      let key = row.standard_name;
      if (key === 'no_property_max_ltv') key = 'no_property';
      if (key === 'has_property_max_ltv') key = 'has_property';
      if (key === 'selling_property_max_ltv') key = 'selling_property';
      ltvRatios[key] = parseFloat(row.standard_value) / 100;
    }

    return { status: 'success', data: ltvRatios };
  }

  async getPropertyOwnershipOptions(language: string) {
    const businessRows = await this.ownershipRuleRepo.find({
      where: { is_active: true },
      order: { display_order: 'ASC' },
    });

    const translationRows = await this.contentItemRepo
      .createQueryBuilder('ci')
      .innerJoin(ContentTranslationEntity, 'ct', 'ci.id = ct.content_item_id')
      .select('ci.content_key', 'content_key')
      .addSelect('ct.content_value', 'content_value')
      .where('ci.content_key LIKE :prefix', { prefix: 'property_ownership_%' })
      .andWhere('ct.language_code = :language', { language })
      .andWhere('ci.screen_location = :screen', { screen: 'mortgage_step1' })
      .getRawMany<{ content_key: string; content_value: string }>();

    const translations: Record<string, string> = {};
    for (const row of translationRows) {
      translations[row.content_key] = row.content_value;
    }

    const options = businessRows.map((row) => ({
      option_key: row.option_key,
      option_text:
        translations[`property_ownership_${row.option_key}`] || row.option_key,
      ltv_percentage: row.ltv_percentage,
      financing_percentage: row.financing_percentage,
      display_order: row.display_order,
    }));

    return {
      status: 'success',
      data: {
        options,
        description:
          'Property ownership options affect maximum financing percentage',
      },
    };
  }

  async calculatePayment(
    loanAmount: number,
    termYears: number,
    propertyOwnership?: string,
  ) {
    if (!loanAmount || !termYears) {
      throw new BadRequestException(
        'Missing required fields: loan_amount, term_years',
      );
    }

    const interestRate = await this.callDbFunction(
      'get_current_mortgage_rate()',
    );
    const monthlyPaymentStr = await this.callDbFunction(
      `calculate_annuity_payment(${loanAmount}, get_current_mortgage_rate(), ${termYears})`,
    );

    let ltvInfo = null;
    if (propertyOwnership) {
      const rule = await this.ownershipRuleRepo.findOne({
        where: { option_key: propertyOwnership, is_active: true },
      });
      if (rule) {
        ltvInfo = {
          option_key: rule.option_key,
          ltv_percentage: rule.ltv_percentage,
          financing_percentage: rule.financing_percentage,
          description: `Property ownership: ${propertyOwnership}`,
        };
      }
    }

    const monthlyPayment = parseFloat(monthlyPaymentStr);
    const totalPayment = monthlyPayment * termYears * 12;
    const totalInterest = totalPayment - loanAmount;

    return {
      status: 'success',
      data: {
        loan_amount: loanAmount,
        term_years: termYears,
        interest_rate: parseFloat(interestRate),
        monthly_payment: monthlyPayment,
        total_payment: totalPayment,
        total_interest: totalInterest,
        ltv_info: ltvInfo,
        calculation_note:
          'Uses configurable interest rate from banking_standards table',
      },
    };
  }

  private async callDbFunction(functionCall: string): Promise<string> {
    // eslint-disable-next-line no-restricted-syntax -- bare SELECT function() has no FROM; QueryBuilder requires a main alias
    const rows = await this.contentDs.manager.query<Array<{ result: string }>>(
      `SELECT ${functionCall} AS result`,
    );
    return rows?.[0]?.result ?? '0';
  }
}
