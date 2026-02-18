import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MortgageController } from './mortgage.controller';
import { MortgageService } from './mortgage.service';
import { BankingStandardEntity } from '../../entities/banking-standard.entity';
import { PropertyOwnershipRuleEntity } from '../../entities/property-ownership-rule.entity';
import { ContentItemEntity } from '../../entities/content-item.entity';
import { ContentTranslationEntity } from '../../entities/content-translation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BankingStandardEntity,
      PropertyOwnershipRuleEntity,
    ]),
    TypeOrmModule.forFeature(
      [ContentItemEntity, ContentTranslationEntity],
      'content',
    ),
  ],
  controllers: [MortgageController],
  providers: [MortgageService],
  exports: [MortgageService],
})
export class MortgageModule {}
