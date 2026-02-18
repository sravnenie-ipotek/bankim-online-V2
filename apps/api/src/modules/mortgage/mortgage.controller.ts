import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MortgageService } from './mortgage.service';

@Controller()
export class MortgageController {
  constructor(private readonly mortgageService: MortgageService) {}

  @Get('v1/calculation-parameters')
  getCalculationParameters(@Query('business_path') businessPath = 'mortgage') {
    return this.mortgageService.getCalculationParameters(businessPath);
  }

  @Get('property-ownership-ltv')
  getPropertyOwnershipLtv() {
    return this.mortgageService.getPropertyOwnershipLtv();
  }

  @Get('customer/property-ownership-options')
  getPropertyOwnershipOptions(@Query('language') language = 'en') {
    return this.mortgageService.getPropertyOwnershipOptions(language);
  }

  @Post('customer/calculate-payment')
  calculatePayment(
    @Body('loan_amount') loanAmount: number,
    @Body('term_years') termYears: number,
    @Body('property_ownership') propertyOwnership?: string,
  ) {
    return this.mortgageService.calculatePayment(
      loanAmount,
      termYears,
      propertyOwnership,
    );
  }
}
