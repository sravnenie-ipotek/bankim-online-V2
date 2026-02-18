import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContentTranslationEntity } from './content-translation.entity.js';

@Entity('content_items')
@Index('idx_content_items_screen_active', ['screen_location', 'is_active'])
export class ContentItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content_key: string;

  @Column({ nullable: true })
  content_type: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  screen_location: string;

  @Column({ nullable: true })
  component_type: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => ContentTranslationEntity,
    (translation) => translation.contentItem,
  )
  translations: ContentTranslationEntity[];
}
