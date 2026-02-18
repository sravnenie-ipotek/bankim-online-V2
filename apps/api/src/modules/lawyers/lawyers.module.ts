import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LawyersController } from './lawyers.controller';
import { LawyersService } from './lawyers.service';
import { LawyerEntity } from '../../entities/lawyer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LawyerEntity])],
  controllers: [LawyersController],
  providers: [LawyersService],
  exports: [LawyersService],
})
export class LawyersModule {}
