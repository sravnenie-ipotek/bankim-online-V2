import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BankBranchEntity } from './bank-branch.entity.js';

@Entity('banks')
export class BankEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_en: string;

  @Column({ nullable: true })
  name_he: string;

  @Column({ nullable: true })
  name_ru: string;

  @Column({ type: 'varchar', nullable: true })
  url: string | null;

  @Column({ default: 0 })
  tender: number;

  @Column({ default: 0 })
  priority: number;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: 0 })
  display_order: number;

  @OneToMany(() => BankBranchEntity, (branch) => branch.bank)
  branches: BankBranchEntity[];
}
