import { Controller, Get, Query } from '@nestjs/common';
import { LawyersService } from './lawyers.service';

@Controller('lawyers')
export class LawyersController {
  constructor(private readonly lawyersService: LawyersService) {}

  @Get()
  getAll(@Query('lang') lang = 'en', @Query('city') city?: string) {
    return this.lawyersService.getAll(lang, city);
  }
}
