import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('bank_employee_services')
export class BankEmployeeServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employee_id: number;

  @Column()
  service_id: number;

  @CreateDateColumn()
  created_at: Date;
}
