import { Global, Module } from '@nestjs/common';
import { CacheConfig } from './cache.config.js';

@Global()
@Module({
  providers: [CacheConfig],
  exports: [CacheConfig],
})
export class CacheConfigModule {}
