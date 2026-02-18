import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankWorkerController } from './bank-worker.controller';
import { BankWorkerService } from './bank-worker.service';
import { BankEmployeeEntity } from '../../entities/bank-employee.entity';
import { BankEmployeeServiceEntity } from '../../entities/bank-employee-service.entity';
import { RegistrationFormConfigEntity } from '../../entities/registration-form-config.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BankEmployeeEntity,
      BankEmployeeServiceEntity,
      RegistrationFormConfigEntity,
    ]),
  ],
  controllers: [BankWorkerController],
  providers: [BankWorkerService],
  exports: [BankWorkerService],
})
export class BankWorkerModule {}
