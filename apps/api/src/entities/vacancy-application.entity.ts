import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('vacancy_applications')
export class VacancyApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vacancy_id: number;

  @Column()
  applicant_name: string;

  @Column()
  applicant_email: string;

  @Column()
  applicant_phone: string;

  @Column()
  applicant_city: string;

  @Column({ type: 'decimal', nullable: true })
  expected_salary: number | null;

  @Column({ type: 'varchar', nullable: true })
  portfolio_url: string | null;

  @Column({ type: 'text', nullable: true })
  cover_letter: string | null;

  @Column({ type: 'varchar', nullable: true })
  resume_file_path: string | null;

  @CreateDateColumn()
  applied_at: Date;
}
