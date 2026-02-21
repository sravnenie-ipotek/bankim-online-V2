import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { DropdownService } from './dropdown.service';
import { CacheWarmupService } from './cache-warmup.service';
import { ContentItemEntity } from '../../entities/content-item.entity';
import { ContentTranslationEntity } from '../../entities/content-translation.entity';
import { ContentCategoryEntity } from '../../entities/content-category.entity';
import { LanguageEntity } from '../../entities/language.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        ContentItemEntity,
        ContentTranslationEntity,
        ContentCategoryEntity,
        LanguageEntity,
      ],
      'content',
    ),
  ],
  controllers: [ContentController],
  providers: [ContentService, DropdownService, CacheWarmupService],
  exports: [ContentService, DropdownService, CacheWarmupService],
})
export class ContentModule {}
