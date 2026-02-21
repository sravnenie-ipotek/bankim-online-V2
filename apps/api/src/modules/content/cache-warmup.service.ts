import { Injectable } from '@nestjs/common';
import { LoggerService } from '@bankimonline/logger';
import { ContentService } from './content.service';
import { DropdownService } from './dropdown.service';

const CONCURRENCY = 5;

type ScreenLanguagePair = { screen: string; language: string };

async function runBounded<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);
  }
  return results;
}

/**
 * Warms Redis by updating only the content/dropdown/validation keys from DB.
 * Does not clear Redis: we set each key one by one so existing keys stay intact.
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
      'Cache warmup started (update by key only, no clear)',
      'CacheWarmupService',
    );
    try {
      // ContentService.getScreenLanguagePairs() returns Promise<ScreenLanguagePair[]>; type not resolved by ESLint for injected service
      /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
      const pairs: ScreenLanguagePair[] =
        await this.contentService.getScreenLanguagePairs();
      /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
      if (pairs.length === 0) {
        this.logger.warn(
          'Cache warmup skipped: no screen/language pairs (content_items with is_active and approved translations)',
          'CacheWarmupService',
        );
        return;
      }
      const languages = [...new Set(pairs.map((p) => p.language))];

      // Injected service types not fully resolved by ESLint
      /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
      await runBounded(pairs, CONCURRENCY, (p) =>
        this.contentService.warmContentByScreen(p.screen, p.language),
      );
      this.logger.log(
        `Warmed content for ${pairs.length} screen/language pairs`,
        'CacheWarmupService',
      );

      await runBounded(languages, CONCURRENCY, (lang) =>
        this.contentService.warmValidationErrors(lang),
      );
      this.logger.log(
        `Warmed validation_errors for ${languages.length} languages`,
        'CacheWarmupService',
      );

      await runBounded(pairs, CONCURRENCY, (p) =>
        this.dropdownService.warmDropdownsByScreen(p.screen, p.language),
      );
      /* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
      this.logger.log(
        `Warmed dropdowns for ${pairs.length} screen/language pairs`,
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
}
