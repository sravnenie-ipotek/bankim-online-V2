import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('bank_configurations')
export class BankConfigurationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bank_id: number;

  @Column()
  product_type: string;

  @Column({ type: 'decimal', nullable: true })
  base_interest_rate: number;

  @Column({ default: true })
  is_active: boolean;
}
