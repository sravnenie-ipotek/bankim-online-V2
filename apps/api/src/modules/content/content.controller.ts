import {
  Controller,
  Get,
  Param,
  Query,
  Delete as HttpDelete,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { DropdownService } from './dropdown.service';

@Controller()
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly dropdownService: DropdownService,
  ) {}

  /* ──── Screen-based content ──── */

  @Get('content/screen/:screen/:language')
  getContentByScreen(
    @Param('screen') screen: string,
    @Param('language') language: string,
    @Query('type') type?: string,
  ) {
    return this.contentService.getContentByScreen(screen, language, type);
  }

  /* ──── Categories ──── */

  @Get('content/categories')
  getCategories() {
    return this.contentService.getCategories();
  }

  /* ──── Languages ──── */

  @Get('content/languages')
  getLanguages() {
    return this.contentService.getLanguages();
  }

  /* ──── Validation errors ──── */

  @Get('content/validation_errors/:language')
  getValidationErrors(@Param('language') language: string) {
    return this.contentService.getValidationErrors(language);
  }

  /* ──── Paginated content items ──── */

  @Get('content/items')
  getContentItems(
    @Query('page') page = '1',
    @Query('limit') limit = '50',
    @Query('category') category?: string,
    @Query('screen_location') screenLocation?: string,
    @Query('search') search?: string,
  ) {
    return this.contentService.getContentItems(
      parseInt(page),
      parseInt(limit),
      category,
      screenLocation,
      search,
    );
  }

  /* ──── Cache management ──── */

  @Get('content/cache/stats')
  getCacheStats() {
    return this.contentService.getCacheStats();
  }

  @HttpDelete('content/cache')
  clearCache() {
    return this.contentService.clearCache();
  }

  /* ──── Single content key (must come AFTER all specific content/* routes) ──── */

  @Get('content/:key/:language')
  getContentByKey(
    @Param('key') key: string,
    @Param('language') language: string,
  ) {
    return this.contentService.getContentByKey(key, language);
  }

  /* ──── Dropdowns ──── */

  @Get('dropdowns/:screen/:language')
  getDropdownsByScreenPath(
    @Param('screen') screen: string,
    @Param('language') language: string,
  ) {
    return this.dropdownService.getDropdownsByScreen(screen, language);
  }

  @Get('v1/dropdowns')
  getDropdowns(
    @Query('screen') screen: string,
    @Query('language') language = 'en',
  ) {
    return this.dropdownService.getDropdownsByScreen(screen, language);
  }

  @Get('v1/dropdowns/:fieldName')
  getDropdownByField(
    @Param('fieldName') fieldName: string,
    @Query('screen') screen: string,
    @Query('language') language = 'en',
  ) {
    return this.dropdownService.getDropdownByField(fieldName, screen, language);
  }

  @Get('v1/dropdown-options')
  getDropdownOptions(
    @Query('screen_location') screenLocation: string,
    @Query('language') language = 'en',
    @Query('business_path') businessPath?: string,
  ) {
    return this.dropdownService.getDropdownOptions(
      screenLocation,
      language,
      businessPath,
    );
  }
}
