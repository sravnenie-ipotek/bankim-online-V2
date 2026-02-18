import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('vacancies')
export class VacancyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  subcategory: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  employment_type: string;

  @Column({ type: 'decimal', nullable: true })
  salary_min: number;

  @Column({ type: 'decimal', nullable: true })
  salary_max: number;

  @Column({ nullable: true })
  salary_currency: string;

  @Column({ type: 'text', nullable: true })
  description_en: string;

  @Column({ type: 'text', nullable: true })
  description_he: string;

  @Column({ type: 'text', nullable: true })
  description_ru: string;

  @Column({ type: 'text', nullable: true })
  requirements_en: string;

  @Column({ type: 'text', nullable: true })
  requirements_he: string;

  @Column({ type: 'text', nullable: true })
  requirements_ru: string;

  @Column({ type: 'text', nullable: true })
  benefits_en: string;

  @Column({ type: 'text', nullable: true })
  benefits_he: string;

  @Column({ type: 'text', nullable: true })
  benefits_ru: string;

  @Column({ type: 'text', nullable: true })
  responsibilities_en: string;

  @Column({ type: 'text', nullable: true })
  responsibilities_he: string;

  @Column({ type: 'text', nullable: true })
  responsibilities_ru: string;

  @Column({ type: 'text', nullable: true })
  nice_to_have_en: string;

  @Column({ type: 'text', nullable: true })
  nice_to_have_he: string;

  @Column({ type: 'text', nullable: true })
  nice_to_have_ru: string;

  @Column({ default: false })
  is_featured: boolean;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'date', nullable: true })
  posted_date: Date;

  @Column({ type: 'date', nullable: true })
  closing_date: Date | null;

  @CreateDateColumn()
  created_at: Date;
}
