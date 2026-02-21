import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';
import type { MemoryConfiguration } from './interfaces/MemoryConfiguration.js';

const DEFAULT_TTL_MS = 300_000; // 5 min
const REDIS_KEY_PREFIX = 'bankim:';

export class CacheConfig implements MemoryConfiguration {
  readonly CACHE_KEY_PREFIX_CONTENT = 'content:';
  readonly CACHE_KEY_PREFIX_VALIDATION_ERRORS = 'content:validation_errors:';
  readonly CACHE_KEY_PREFIX_DROPDOWNS = 'dropdowns:';
  readonly CACHE_KEY_PREFIX_ASSET = 'content:asset:';

  buildRedisUrl(config: ConfigService): string {
    const host = config.get<string>('REDIS_HOST', 'localhost');
    const port = config.get<number>('REDIS_PORT', 6379);
    const password = config.get<string>('REDIS_PASSWORD');
    if (password) {
      return `redis://:${encodeURIComponent(password)}@${host}:${port}`;
    }
    return `redis://${host}:${port}`;
  }

  getTtl(config: ConfigService): number {
    return (
      config.get<number>('REDIS_TTL_CONTENT') ??
      config.get<number>('REDIS_TTL') ??
      DEFAULT_TTL_MS
    );
  }

  createOptions(config: ConfigService): CacheModuleOptions {
    const redisHost = config.get<string>('REDIS_HOST');
    const ttl = this.getTtl(config);

    if (redisHost) {
      const redisUrl = this.buildRedisUrl(config);
      // @keyv/redis and keyv have loose typings; store is passed to Nest CacheModule which accepts it
      /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
      const redisStore = new KeyvRedis(redisUrl);
      const store = new Keyv({
        store: redisStore,
        namespace: REDIS_KEY_PREFIX,
        ttl,
      });
      /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */

      return {
        isGlobal: true,
        ttl,
        stores: [store],
      };
    }

    return {
      isGlobal: true,
      ttl,
    };
  }
}
