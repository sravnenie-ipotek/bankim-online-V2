import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BankEntity } from './bank.entity.js';

@Entity('bank_branches')
export class BankBranchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bank_id: number;

  @Column()
  name_en: string;

  @Column({ nullable: true })
  name_he: string;

  @Column({ nullable: true })
  name_ru: string;

  @Column()
  branch_code: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => BankEntity, (bank) => bank.branches)
  @JoinColumn({ name: 'bank_id' })
  bank: BankEntity;
}
