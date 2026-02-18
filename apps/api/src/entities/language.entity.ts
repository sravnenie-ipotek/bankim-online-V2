import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('languages')
export class LanguageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  native_name: string;

  @Column({ default: 'ltr' })
  direction: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_default: boolean;
}
