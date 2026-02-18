import { Controller, Get, Param } from '@nestjs/common';
import { BanksService } from './banks.service';

@Controller()
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Get('banks/list')
  getBanksList() {
    return this.banksService.getBanksList();
  }

  @Get('banks/:bankId/branches')
  getBankBranches(@Param('bankId') bankId: string) {
    return this.banksService.getBankBranches(parseInt(bankId, 10));
  }

  @Get('bank-numbers/israel')
  getIsraeliBankNumbers() {
    return this.banksService.getIsraeliBankNumbers();
  }

  @Get('services/list')
  getServicesList() {
    return this.banksService.getServicesList();
  }

  @Get('v1/banks')
  getBanksV1() {
    return this.banksService.getBanksV1();
  }
}
