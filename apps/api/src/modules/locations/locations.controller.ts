import { Controller, Get, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller()
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('v1/cities')
  getCitiesV1() {
    return this.locationsService.getCitiesV1();
  }

  @Get('get-cities')
  getCities(@Query('lang') lang: string) {
    return this.locationsService.getCities(lang || 'en');
  }

  @Get('get-regions')
  getRegions(@Query('lang') lang: string) {
    return this.locationsService.getRegions(lang || 'en');
  }

  @Get('get-professions')
  getProfessions(
    @Query('lang') lang: string,
    @Query('category') category: string,
  ) {
    return this.locationsService.getProfessions(lang || 'en', category || null);
  }
}
