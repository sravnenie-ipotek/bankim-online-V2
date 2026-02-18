import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminJwtGuard } from './guards/admin-jwt.guard';
import { ClientEntity } from '../../entities/client.entity';
import { BankEntity } from '../../entities/bank.entity';
import { BankBranchEntity } from '../../entities/bank-branch.entity';
import { LoanApplicationEntity } from '../../entities/loan-application.entity';
import { RegistrationInvitationEntity } from '../../entities/registration-invitation.entity';
import { AdminUserEntity } from '../../entities/admin-user.entity';
import { BankEmployeeEntity } from '../../entities/bank-employee.entity';
import { WorkerApprovalQueueEntity } from '../../entities/worker-approval-queue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      BankEntity,
      BankBranchEntity,
      LoanApplicationEntity,
      RegistrationInvitationEntity,
      AdminUserEntity,
      BankEmployeeEntity,
      WorkerApprovalQueueEntity,
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminJwtGuard],
  exports: [AdminService],
})
export class AdminModule {}
