import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('banking_standards')
export class BankingStandardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  business_path: string;

  @Column()
  standard_category: string;

  @Column()
  standard_name: string;

  @Column()
  standard_value: string;

  @Column({ nullable: true })
  value_type: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'date', nullable: true })
  effective_to: Date | null;
}
