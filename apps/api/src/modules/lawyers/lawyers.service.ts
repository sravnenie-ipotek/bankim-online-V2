import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LawyerEntity } from '../../entities/lawyer.entity';
import { resolveLanguage } from '../../helpers/language.helper';

@Injectable()
export class LawyersService {
  constructor(
    @InjectRepository(LawyerEntity)
    private readonly lawyerRepo: Repository<LawyerEntity>,
  ) {}

  async getAll(lang: string, city?: string) {
    const selectedLang = resolveLanguage(lang);
    const nameColumn = `l.name_${selectedLang}`;

    const qb = this.lawyerRepo
      .createQueryBuilder('l')
      .select('l.id', 'id')
      .addSelect(nameColumn, 'name')
      .addSelect('l.specialization', 'specialization')
      .addSelect('l.city', 'city')
      .addSelect('l.phone', 'phone')
      .addSelect('l.email', 'email')
      .addSelect('l.rating', 'rating')
      .addSelect('l.is_featured', 'is_featured')
      .where('l.is_active = :active', { active: true });

    if (city) {
      qb.andWhere('l.city = :city', { city });
    }

    qb.orderBy('l.is_featured', 'DESC').addOrderBy('l.rating', 'DESC');

    const rows = await qb.getRawMany();
    return {
      status: 'success',
      data: rows,
      language: selectedLang,
      total: rows.length,
    };
  }
}
