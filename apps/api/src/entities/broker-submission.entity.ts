import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('broker_submissions')
export class BrokerSubmissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  city: string;

  @Column()
  desired_region: string;

  @Column()
  employment_type: string;

  @Column()
  monthly_income: string;

  @Column()
  experience: string;

  @Column({ type: 'boolean' })
  has_client_cases: boolean;

  @Column({ type: 'boolean' })
  has_debt_cases: boolean;

  @Column({ type: 'text', nullable: true })
  additional_info: string | null;

  @Column({ type: 'boolean' })
  agree_terms: boolean;

  @Column({ type: 'varchar', nullable: true })
  license_number: string | null;

  @CreateDateColumn()
  submitted_at: Date;
}
