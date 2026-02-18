import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cities')
export class CityEntity {
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

  @Column({ default: true })
  is_active: boolean;
}
