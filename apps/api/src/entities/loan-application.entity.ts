import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('loan_applications')
export class LoanApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
