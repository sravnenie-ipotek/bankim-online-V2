import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('customer/compare-banks')
  compareBanks(@Body() body: Record<string, unknown>) {
    return this.customerService.compareBanks(body);
  }

  @Get('customer/mortgage-programs')
  getMortgagePrograms() {
    return this.customerService.getMortgagePrograms();
  }

  @Get('cors-test')
  getCorsTest(@Headers('origin') origin: string | undefined) {
    return this.customerService.getCorsTest(origin);
  }
}
