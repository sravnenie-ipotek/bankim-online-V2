import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  service_key: string;

  @Column()
  name_en: string;

  @Column({ nullable: true })
  name_he: string;

  @Column({ nullable: true })
  name_ru: string;

  @Column({ type: 'text', nullable: true })
  description_en: string | null;

  @Column({ type: 'text', nullable: true })
  description_he: string | null;

  @Column({ type: 'text', nullable: true })
  description_ru: string | null;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: 0 })
  display_order: number;
}
