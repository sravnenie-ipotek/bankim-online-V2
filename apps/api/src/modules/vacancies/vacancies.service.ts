import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VacancyEntity } from '../../entities/vacancy.entity';
import { VacancyApplicationEntity } from '../../entities/vacancy-application.entity';
import { CityEntity } from '../../entities/city.entity';
import { resolveLanguage, type SupportedLanguage } from '../../helpers/language.helper';
import type { VacancyListRow } from './interfaces/VacancyListRow.js';
import type { VacancyCategoryRow } from './interfaces/VacancyCategoryRow.js';
import { VacancyMapper } from './helpers/VacancyMapper.js';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(VacancyEntity)
    private readonly vacancyRepo: Repository<VacancyEntity>,
    @InjectRepository(VacancyApplicationEntity)
    private readonly applicationRepo: Repository<VacancyApplicationEntity>,
    @InjectRepository(CityEntity, 'content')
    private readonly cityRepo: Repository<CityEntity>,
  ) {}

  private async buildLocationMap(keys: string[], lang: SupportedLanguage): Promise<Map<string, string>> {
    if (!keys.length) return new Map();

    const nameCol = `name_${lang}` as keyof CityEntity;
    const cities = await this.cityRepo
      .createQueryBuilder('c')
      .select('c.key', 'key')
      .addSelect(`c.${nameCol}`, 'name')
      .where('c.key IN (:...keys)', { keys })
      .getRawMany<{ key: string; name: string }>();

    return new Map(cities.map((c) => [c.key, c.name]));
  }

  private resolveLocation(key: string | null, locationMap: Map<string, string>): string | null {
    if (!key) return null;
    return locationMap.get(key) ?? key;
  }

  async getAll(category: string | undefined, lang: string, activeOnly: string) {
    const selectedLang = resolveLanguage(lang);

    const qb = this.vacancyRepo
      .createQueryBuilder('v')
      .where('(v.closing_date IS NULL OR v.closing_date >= CURRENT_DATE)');

    if (activeOnly === 'true') {
      qb.andWhere('v.is_active = :active', { active: true });
    }

    if (category && category !== 'all') {
      qb.andWhere('v.category = :category', { category });
    }

    qb.orderBy('v.is_featured', 'DESC').addOrderBy('v.posted_date', 'DESC');

    const entities = await qb.getMany();

    const locationKeys = [...new Set(entities.map((e) => e.location).filter((l): l is string => !!l))];
    const locationMap = await this.buildLocationMap(locationKeys, selectedLang);

    const data: VacancyListRow[] = entities.map((e) =>
      VacancyMapper.toListRow(e, selectedLang, this.resolveLocation(e.location, locationMap)),
    );

    return {
      status: 'success',
      data,
      total: data.length,
      language: selectedLang,
      category: category || 'all',
    };
  }

  async getCategories() {
    const rows = await this.vacancyRepo
      .createQueryBuilder('v')
      .select('v.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .where('v.is_active = :active', { active: true })
      .andWhere('(v.closing_date IS NULL OR v.closing_date >= CURRENT_DATE)')
      .groupBy('v.category')
      .orderBy('count', 'DESC')
      .getRawMany<VacancyCategoryRow>();

    return { status: 'success', data: rows };
  }

  async getById(id: number, lang: string) {
    const selectedLang = resolveLanguage(lang);

    const entity = await this.vacancyRepo.findOne({
      where: { id, is_active: true },
    });

    if (!entity) throw new NotFoundException('Vacancy not found');

    const locationKeys = entity.location ? [entity.location] : [];
    const locationMap = await this.buildLocationMap(locationKeys, selectedLang);

    const data = VacancyMapper.toDetailRow(entity, selectedLang, this.resolveLocation(entity.location, locationMap));
    return { status: 'success', data, language: selectedLang };
  }

  async apply(
    vacancyId: number,
    body: {
      applicant_name: string;
      applicant_email: string;
      applicant_phone: string;
      applicant_city: string;
      expected_salary?: number;
      portfolio_url?: string;
      cover_letter?: string;
      resume_file_path?: string;
    },
  ) {
    const { applicant_name, applicant_email, applicant_phone, applicant_city } =
      body;

    if (
      !applicant_name ||
      !applicant_email ||
      !applicant_phone ||
      !applicant_city
    ) {
      throw new BadRequestException(
        'Name, email, phone, and city are required',
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicant_email))
      throw new BadRequestException('Invalid email format');

    const phoneRegex = /^\+?[\d\s\-().]{7,20}$/;
    if (!phoneRegex.test(applicant_phone.trim())) {
      throw new BadRequestException('Invalid phone number format');
    }

    const vacancy = await this.vacancyRepo.findOne({
      where: { id: vacancyId, is_active: true },
      select: ['id', 'title', 'closing_date'],
    });

    if (
      !vacancy ||
      (vacancy.closing_date && vacancy.closing_date < new Date())
    ) {
      throw new NotFoundException(
        'Vacancy not found or not accepting applications',
      );
    }

    const dup = await this.applicationRepo.findOne({
      where: { vacancy_id: vacancyId, applicant_email },
    });
    if (dup)
      throw new ConflictException('You have already applied for this position');

    const application = this.applicationRepo.create({
      vacancy_id: vacancyId,
      applicant_name,
      applicant_email,
      applicant_phone,
      applicant_city,
      expected_salary: body.expected_salary ?? null,
      portfolio_url: body.portfolio_url ?? null,
      cover_letter: body.cover_letter ?? null,
      resume_file_path: body.resume_file_path ?? null,
    });
    const saved = await this.applicationRepo.save(application);

    return {
      status: 'success',
      message: 'Application submitted successfully',
      data: {
        application_id: saved.id,
        applied_at: saved.applied_at,
        vacancy_title: vacancy.title,
      },
    };
  }
}
