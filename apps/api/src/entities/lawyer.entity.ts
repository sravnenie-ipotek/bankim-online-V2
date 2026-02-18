import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('lawyers')
export class LawyerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_en: string;

  @Column({ nullable: true })
  name_he: string;

  @Column({ nullable: true })
  name_ru: string;

  @Column({ nullable: true })
  specialization: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'decimal', default: 0 })
  rating: number;

  @Column({ default: false })
  is_featured: boolean;

  @Column({ default: true })
  is_active: boolean;
}
