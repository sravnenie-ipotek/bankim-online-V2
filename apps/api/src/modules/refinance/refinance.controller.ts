import { Controller, Post, Body, Headers } from '@nestjs/common';
import { RefinanceService } from './refinance.service';

@Controller()
export class RefinanceController {
  constructor(private readonly refinanceService: RefinanceService) {}

  @Post('refinance-mortgage')
  refinanceMortgage(
    @Body()
    body: {
      target: string;
      amount_left: number;
      full_amount: number;
      estate_type: string;
      bank_id: number;
      programs?: unknown[];
      years?: number;
    },
    @Headers('accept-language') acceptLanguage: string,
  ) {
    return this.refinanceService.refinanceMortgage(body, acceptLanguage);
  }

  @Post('refinance-credit')
  refinanceCredit(
    @Body()
    body: {
      loans_data?: { amount: number }[];
      monthly_income?: number;
      expenses?: number;
    },
  ) {
    return this.refinanceService.refinanceCredit(body);
  }
}
