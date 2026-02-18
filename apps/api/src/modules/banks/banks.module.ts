import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksController } from './banks.controller';
import { BanksService } from './banks.service';
import { BankEntity } from '../../entities/bank.entity';
import { BankBranchEntity } from '../../entities/bank-branch.entity';
import { IsraeliBankNumberEntity } from '../../entities/israeli-bank-number.entity';
import { ServiceEntity } from '../../entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BankEntity,
      BankBranchEntity,
      IsraeliBankNumberEntity,
      ServiceEntity,
    ]),
  ],
  controllers: [BanksController],
  providers: [BanksService],
})
export class BanksModule {}
