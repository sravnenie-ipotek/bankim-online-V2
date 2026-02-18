import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { BankingStandardEntity } from '../../entities/banking-standard.entity';
import { BankEntity } from '../../entities/bank.entity';
import { BankConfigurationEntity } from '../../entities/bank-configuration.entity';
import { LoanData } from '../../interfaces/loan-data.interface';

@Injectable()
export class RefinanceService {
  constructor(
    @InjectRepository(BankingStandardEntity)
    private readonly standardRepo: Repository<BankingStandardEntity>,
    @InjectRepository(BankEntity)
    private readonly bankRepo: Repository<BankEntity>,
    @InjectRepository(BankConfigurationEntity)
    private readonly bankConfigRepo: Repository<BankConfigurationEntity>,
    @InjectDataSource('content') private readonly contentDs: DataSource,
    @InjectDataSource() private readonly mainDs: DataSource,
  ) {}

  async refinanceMortgage(
    body: {
      target: string;
      amount_left: number;
      full_amount: number;
      estate_type: string;
      bank_id: number;
      programs?: unknown[];
      years?: number;
    },
    acceptLanguage: string,
  ) {
    const {
      target,
      amount_left,
      full_amount,
      estate_type,
      bank_id,
      years = 25,
    } = body;
    if (!target || !amount_left || !full_amount || !estate_type || !bank_id) {
      throw new BadRequestException('Missing required fields');
    }

    const currentRate = parseFloat(
      await this.callContentDbFunction('get_current_mortgage_rate()'),
    );

    const savingsRow = await this.standardRepo.findOne({
      where: {
        business_path: 'mortgage_refinance',
        standard_category: 'refinance',
        standard_name: 'minimum_savings_percentage',
        is_active: true,
      },
    });
    const savingsPercentage = savingsRow
      ? parseFloat(savingsRow.standard_value)
      : 2.0;

    const monthlyPaymentStr = await this.callMainDbFunction(
      `calculate_annuity_payment(${amount_left}, ${currentRate}, ${years})`,
    );
    const monthlyPayment = Math.round(parseFloat(monthlyPaymentStr));
    const totalSavings = Math.round(amount_left * (savingsPercentage / 100));

    const lang = acceptLanguage?.split(',')[0]?.split('-')[0] || 'en';

    const banksRows = await this.bankRepo
      .createQueryBuilder('b')
      .leftJoin(
        BankConfigurationEntity,
        'bc',
        "b.id = bc.bank_id AND bc.product_type = 'mortgage' AND bc.is_active = true",
      )
      .select(this.bankNameExpression(lang), 'name')
      .addSelect(`COALESCE(bc.base_interest_rate, :rate)`, 'rate')
      .where('b.tender = :tender', { tender: 1 })
      .setParameter('rate', currentRate)
      .orderBy('COALESCE(bc.base_interest_rate, :rate)', 'ASC')
      .limit(3)
      .getRawMany<{ name: string; rate: string }>();

    const recommendedBanks = banksRows.map((bank, index) => ({
      name: bank.name,
      rate: parseFloat(bank.rate),
      monthly: Math.round(monthlyPayment * (1 + index * 0.05)),
    }));

    return {
      status: 'success',
      message: 'Refinance calculation completed using database parameters',
      data: {
        percent: currentRate,
        monthly_payment: monthlyPayment,
        total_savings: totalSavings,
        recommended_banks: recommendedBanks,
        calculation_source: 'database_driven',
      },
    };
  }

  async refinanceCredit(body: {
    loans_data?: LoanData[];
    monthly_income?: number;
    expenses?: number;
  }) {
    const totalDebt = body.loans_data
      ? body.loans_data.reduce((sum, loan) => sum + (loan.amount || 0), 0)
      : 0;
    if (totalDebt === 0)
      throw new BadRequestException('No debt amount provided for refinancing');

    const rateRow = await this.standardRepo.findOne({
      where: {
        business_path: 'credit_refinance',
        standard_category: 'rates',
        standard_name: 'quick_good_rate',
        is_active: true,
      },
    });
    const currentCreditRate = rateRow
      ? parseFloat(rateRow.standard_value)
      : 8.5;

    const reductionRow = await this.standardRepo.findOne({
      where: {
        business_path: 'credit_refinance',
        standard_category: 'refinance',
        standard_name: 'minimum_rate_reduction',
        is_active: true,
      },
    });
    const minReduction = reductionRow
      ? parseFloat(reductionRow.standard_value)
      : 1.0;
    const newRate = Math.max(currentCreditRate - minReduction, 5.0);

    const newMonthlyStr = await this.callMainDbFunction(
      `calculate_annuity_payment(${totalDebt}, ${newRate}, 5)`,
    );
    const newMonthly = Math.round(parseFloat(newMonthlyStr));

    const oldMonthlyStr = await this.callMainDbFunction(
      `calculate_annuity_payment(${totalDebt}, ${currentCreditRate}, 5)`,
    );
    const oldMonthly = Math.round(parseFloat(oldMonthlyStr));
    const monthlySavings = oldMonthly - newMonthly;

    return {
      status: 'success',
      message:
        'Credit refinance calculation completed using database parameters',
      data: {
        percent: newRate,
        monthly_payment: newMonthly,
        total_savings: monthlySavings * 60,
        total_debt: totalDebt,
        monthly_savings: monthlySavings,
        old_rate: currentCreditRate,
        calculation_source: 'database_driven',
      },
    };
  }

  private bankNameExpression(lang: string): string {
    if (lang === 'he') return 'COALESCE(b.name_he, b.name_en)';
    if (lang === 'ru') return 'COALESCE(b.name_ru, b.name_en)';
    return 'b.name_en';
  }

  private async callContentDbFunction(functionCall: string): Promise<string> {
    // eslint-disable-next-line no-restricted-syntax -- bare SELECT function() has no FROM; QueryBuilder requires a main alias
    const rows = await this.contentDs.manager.query<Array<{ result: string }>>(
      `SELECT ${functionCall} AS result`,
    );
    return rows?.[0]?.result ?? '0';
  }

  private async callMainDbFunction(functionCall: string): Promise<string> {
    // eslint-disable-next-line no-restricted-syntax -- bare SELECT function() has no FROM; QueryBuilder requires a main alias
    const rows = await this.mainDs.manager.query<Array<{ result: string }>>(
      `SELECT ${functionCall} AS result`,
    );
    return rows?.[0]?.result ?? '0';
  }
}
