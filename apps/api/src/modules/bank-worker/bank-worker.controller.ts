import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { BankWorkerService } from './bank-worker.service';

@Controller()
export class BankWorkerController {
  constructor(private readonly bankWorkerService: BankWorkerService) {}

  @Post('bank-employee/register')
  register(
    @Body()
    body: {
      fullName: string;
      position: string;
      corporateEmail: string;
      bankId: number;
      branchId: number;
      bankNumber: string;
      termsAccepted: boolean;
      selectedServices?: number[];
    },
  ) {
    return this.bankWorkerService.register(body);
  }

  @Get('registration-config/:language')
  getRegistrationConfig(@Param('language') language: string) {
    return this.bankWorkerService.getRegistrationConfig(language);
  }
}
