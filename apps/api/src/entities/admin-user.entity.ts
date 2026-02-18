import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admin_users')
export class AdminUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
