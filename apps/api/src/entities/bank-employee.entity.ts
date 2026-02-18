import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { BankEntity } from './bank.entity';
import { BankBranchEntity } from './bank-branch.entity';

@Entity('bank_employees')
export class BankEmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  position: string;

  @Column({ unique: true })
  corporate_email: string;

  @Column()
  bank_id: number;

  @Column({ nullable: true })
  branch_id: number;

  @Column({ nullable: true })
  bank_number: string;

  @Column({ default: false })
  terms_accepted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  terms_accepted_at: Date | null;

  @Column({ nullable: true })
  registration_token: string;

  @Column({ type: 'timestamp', nullable: true })
  registration_expires: Date | null;

  @Column({ default: 'pending' })
  approval_status: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'int', nullable: true })
  approved_by: number | null;

  @Column({ type: 'timestamp', nullable: true })
  approved_at: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  last_activity_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => BankEntity)
  @JoinColumn({ name: 'bank_id' })
  bank: BankEntity;

  @ManyToOne(() => BankBranchEntity)
  @JoinColumn({ name: 'branch_id' })
  branch: BankBranchEntity;
}
