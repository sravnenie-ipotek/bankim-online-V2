import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefinanceController } from './refinance.controller';
import { RefinanceService } from './refinance.service';
import { BankingStandardEntity } from '../../entities/banking-standard.entity';
import { BankEntity } from '../../entities/bank.entity';
import { BankConfigurationEntity } from '../../entities/bank-configuration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BankingStandardEntity,
      BankEntity,
      BankConfigurationEntity,
    ]),
  ],
  controllers: [RefinanceController],
  providers: [RefinanceService],
  exports: [RefinanceService],
})
export class RefinanceModule {}
