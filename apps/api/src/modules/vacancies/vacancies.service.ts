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
import { resolveLanguage } from '../../helpers/language.helper';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(VacancyEntity)
    private readonly vacancyRepo: Repository<VacancyEntity>,
    @InjectRepository(VacancyApplicationEntity)
    private readonly applicationRepo: Repository<VacancyApplicationEntity>,
  ) {}

  async getAll(category: string | undefined, lang: string, activeOnly: string) {
    const selectedLang = resolveLanguage(lang);

    const qb = this.vacancyRepo
      .createQueryBuilder('v')
      .select('v.id', 'id')
      .addSelect('v.title', 'title')
      .addSelect('v.category', 'category')
      .addSelect('v.subcategory', 'subcategory')
      .addSelect('v.location', 'location')
      .addSelect('v.employment_type', 'employment_type')
      .addSelect('v.salary_min', 'salary_min')
      .addSelect('v.salary_max', 'salary_max')
      .addSelect('v.salary_currency', 'salary_currency')
      .addSelect(`v.description_${selectedLang}`, 'description')
      .addSelect(`v.requirements_${selectedLang}`, 'requirements')
      .addSelect(`v.benefits_${selectedLang}`, 'benefits')
      .addSelect('v.is_featured', 'is_featured')
      .addSelect('v.posted_date', 'posted_date')
      .addSelect('v.closing_date', 'closing_date');

    if (activeOnly === 'true') {
      qb.andWhere('v.is_active = :active', { active: true });
    }

    if (category && category !== 'all') {
      qb.andWhere('v.category = :category', { category });
    }

    qb.andWhere('(v.closing_date IS NULL OR v.closing_date >= CURRENT_DATE)');
    qb.orderBy('v.is_featured', 'DESC').addOrderBy('v.posted_date', 'DESC');

    const rows = await qb.getRawMany();
    return {
      status: 'success',
      data: rows,
      total: rows.length,
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
      .getRawMany();

    return { status: 'success', data: rows };
  }

  async getById(id: number, lang: string) {
    const selectedLang = resolveLanguage(lang);

    const row = await this.vacancyRepo
      .createQueryBuilder('v')
      .select('v.id', 'id')
      .addSelect('v.title', 'title')
      .addSelect('v.category', 'category')
      .addSelect('v.subcategory', 'subcategory')
      .addSelect('v.location', 'location')
      .addSelect('v.employment_type', 'employment_type')
      .addSelect('v.salary_min', 'salary_min')
      .addSelect('v.salary_max', 'salary_max')
      .addSelect('v.salary_currency', 'salary_currency')
      .addSelect(`v.description_${selectedLang}`, 'description')
      .addSelect(`v.requirements_${selectedLang}`, 'requirements')
      .addSelect(`v.benefits_${selectedLang}`, 'benefits')
      .addSelect(`v.responsibilities_${selectedLang}`, 'responsibilities')
      .addSelect(`v.nice_to_have_${selectedLang}`, 'nice_to_have')
      .addSelect('v.is_featured', 'is_featured')
      .addSelect('v.posted_date', 'posted_date')
      .addSelect('v.closing_date', 'closing_date')
      .addSelect('v.created_at', 'created_at')
      .where('v.id = :id', { id })
      .andWhere('v.is_active = :active', { active: true })
      .getRawOne();

    if (!row) throw new NotFoundException('Vacancy not found');
    return { status: 'success', data: row, language: selectedLang };
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

    const phoneRegex = /^(\+?972|0)?[5-9]\d{8}$/;
    if (!phoneRegex.test(applicant_phone.replace(/[-\s]/g, ''))) {
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
