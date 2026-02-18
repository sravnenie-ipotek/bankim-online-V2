import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('registration_form_config')
export class RegistrationFormConfigEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string;

  @Column()
  field_name: string;

  @Column({ type: 'text' })
  field_value: string;

  @Column({ default: true })
  is_active: boolean;
}
