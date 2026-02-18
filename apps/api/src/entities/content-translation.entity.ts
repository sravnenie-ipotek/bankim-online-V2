import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ContentItemEntity } from './content-item.entity';

@Entity('content_translations')
@Index('idx_content_translations_lookup', [
  'content_item_id',
  'language_code',
  'status',
])
export class ContentTranslationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content_item_id: number;

  @Column()
  language_code: string;

  @Column({ type: 'text' })
  content_value: string;

  @Column({ default: 'draft' })
  status: string;

  @ManyToOne(() => ContentItemEntity, (item) => item.translations)
  @JoinColumn({ name: 'content_item_id' })
  contentItem: ContentItemEntity;
}
