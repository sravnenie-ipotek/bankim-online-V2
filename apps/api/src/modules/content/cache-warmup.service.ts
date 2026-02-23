import { Injectable } from '@nestjs/common';
import { LoggerService } from '@bankimonline/logger';
import { ContentService } from './content.service';
import { DropdownService } from './dropdown.service';

/**
 * Warms Redis with 3 bulk queries (content, validation_errors, dropdowns).
 * Does not clear Redis: we set each key so existing keys stay intact.
 */
@Injectable()
export class CacheWarmupService {
  constructor(
    private readonly contentService: ContentService,
    private readonly dropdownService: DropdownService,
    private readonly logger: LoggerService,
  ) {}

  async warm(): Promise<void> {
    this.logger.log(
      'Cache warmup started (bulk: content, validation_errors, dropdowns)',
      'CacheWarmupService',
    );
    try {
      const t0 = Date.now();

      const [contentMs, validationMs, dropdownMs] = await Promise.all([
        this.warmContentWithTiming(),
        this.warmValidationErrorsWithTiming(),
        this.warmDropdownsWithTiming(),
      ]);

      const totalMs = Date.now() - t0;
      this.logger.log(
        `Warmed content (${contentMs}ms) + validation_errors (${validationMs}ms) + dropdowns (${dropdownMs}ms) in ${totalMs}ms`,
        'CacheWarmupService',
      );
      this.logger.log('Cache warmup completed', 'CacheWarmupService');
    } catch (err) {
      this.logger.error(
        err instanceof Error ? err.message : 'Cache warmup failed',
        err instanceof Error ? err.stack : undefined,
        'CacheWarmupService',
      );
      throw err;
    }
  }

  private async warmContentWithTiming(): Promise<number> {
    const t = Date.now();
    await this.contentService.warmAllContentBulk();
    return Date.now() - t;
  }

  private async warmValidationErrorsWithTiming(): Promise<number> {
    const t = Date.now();
    await this.contentService.warmAllValidationErrorsBulk();
    return Date.now() - t;
  }

  private async warmDropdownsWithTiming(): Promise<number> {
    const t = Date.now();
    await this.dropdownService.warmAllDropdownsBulk();
    return Date.now() - t;
  }
}
