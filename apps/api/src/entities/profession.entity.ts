import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('professions')
export class ProfessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  name_en: string;

  @Column({ nullable: true })
  name_he: string;

  @Column({ nullable: true })
  name_ru: string;

  @Column({ nullable: true })
  category: string;

  @Column({ default: true })
  is_active: boolean;
}
