import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Get()
  getAll(
    @Query('category') category?: string,
    @Query('lang') lang = 'en',
    @Query('active_only') activeOnly = 'true',
  ) {
    return this.vacanciesService.getAll(category, lang, activeOnly);
  }

  @Get('categories')
  getCategories() {
    return this.vacanciesService.getCategories();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number, @Query('lang') lang = 'en') {
    return this.vacanciesService.getById(id, lang);
  }

  @Post(':id/apply')
  apply(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      applicant_name: string;
      applicant_email: string;
      applicant_phone: string;
      applicant_city: string;
      expected_salary?: number;
      portfolio_url?: string;
      cover_letter?: string;
    },
  ) {
    return this.vacanciesService.apply(id, body);
  }
}
