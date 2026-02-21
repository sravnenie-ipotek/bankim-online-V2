import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

/**
 * Contract for cache/memory configuration used by Nest CacheModule and content/dropdown services.
 */
export interface MemoryConfiguration {
  createOptions(config: ConfigService): CacheModuleOptions;
  readonly CACHE_KEY_PREFIX_CONTENT: string;
  readonly CACHE_KEY_PREFIX_VALIDATION_ERRORS: string;
  readonly CACHE_KEY_PREFIX_DROPDOWNS: string;
  readonly CACHE_KEY_PREFIX_ASSET: string;
}
