import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('property_ownership_rules')
export class PropertyOwnershipRuleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  option_key: string;

  @Column()
  ltv_percentage: string;

  @Column({ nullable: true })
  min_down_payment_percentage: string;

  @Column({ nullable: true })
  financing_percentage: string;

  @Column({ default: 0 })
  display_order: number;

  @Column({ default: true })
  is_active: boolean;
}
