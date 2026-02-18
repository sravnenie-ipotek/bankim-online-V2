import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('israeli_bank_numbers')
export class IsraeliBankNumberEntity {
  @PrimaryColumn()
  bank_number: number;

  @Column()
  bank_name_en: string;

  @Column({ nullable: true })
  bank_name_he: string;

  @Column({ default: true })
  is_active: boolean;
}
