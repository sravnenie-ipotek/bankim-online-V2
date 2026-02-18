import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BankEmployeeEntity } from './bank-employee.entity';

@Entity('worker_approval_queue')
export class WorkerApprovalQueueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employee_id: number;

  @Column({ default: 'pending' })
  approval_status: string;

  @Column({ type: 'timestamp', nullable: true })
  submitted_at: Date;

  @Column({ type: 'int', nullable: true })
  reviewed_by: number | null;

  @Column({ type: 'timestamp', nullable: true })
  reviewed_at: Date | null;

  @Column({ type: 'text', nullable: true })
  admin_notes: string | null;

  @ManyToOne(() => BankEmployeeEntity)
  @JoinColumn({ name: 'employee_id' })
  employee: BankEmployeeEntity;
}
