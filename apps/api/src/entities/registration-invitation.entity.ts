import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { BankEntity } from './bank.entity.js';
import { BankBranchEntity } from './bank-branch.entity.js';
import { AdminUserEntity } from './admin-user.entity.js';
import { BankEmployeeEntity } from './bank-employee.entity.js';

@Entity('registration_invitations')
export class RegistrationInvitationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bank_id: number;

  @Column({ type: 'int', nullable: true })
  branch_id: number | null;

  @Column()
  invited_by: number;

  @Column({ type: 'int', nullable: true })
  employee_id: number | null;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => BankEntity)
  @JoinColumn({ name: 'bank_id' })
  bank: BankEntity;

  @ManyToOne(() => BankBranchEntity)
  @JoinColumn({ name: 'branch_id' })
  branch: BankBranchEntity;

  @ManyToOne(() => AdminUserEntity)
  @JoinColumn({ name: 'invited_by' })
  invitedByUser: AdminUserEntity;

  @ManyToOne(() => BankEmployeeEntity)
  @JoinColumn({ name: 'employee_id' })
  employee: BankEmployeeEntity;
}
