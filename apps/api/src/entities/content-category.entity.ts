import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('content_categories')
export class ContentCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  display_name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  parent_id: number | null;

  @Column({ default: 0 })
  sort_order: number;

  @Column({ default: true })
  is_active: boolean;
}
