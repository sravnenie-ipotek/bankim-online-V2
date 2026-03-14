import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrokersController } from './brokers.controller';
import { BrokersService } from './brokers.service';
import { BrokerSubmissionEntity } from '../../entities/broker-submission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrokerSubmissionEntity])],
  controllers: [BrokersController],
  providers: [BrokersService],
  exports: [BrokersService],
})
export class BrokersModule {}
