import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacancyEntity } from '../../entities/vacancy.entity';
import { VacancyApplicationEntity } from '../../entities/vacancy-application.entity';
import { CityEntity } from '../../entities/city.entity';

function createQueryBuilderChain(getManyResult: unknown, getRawManyResult?: unknown) {
  const chain = {
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue(getManyResult),
    getRawMany: jest.fn().mockResolvedValue(getRawManyResult ?? getManyResult),
  };
  return chain;
}

function createVacancyEntity(overrides: Partial<VacancyEntity> = {}): VacancyEntity {
  return {
    id: 1,
    title: 'Backend Developer',
    category: 'development',
    subcategory: null,
    location: 'tel_aviv',
    employment_type: 'full_time',
    salary_min: null,
    salary_max: null,
    salary_currency: null,
    description_en: 'Build APIs',
    description_he: null,
    description_ru: null,
    requirements_en: 'Node.js',
    requirements_he: null,
    requirements_ru: null,
    benefits_en: null,
    benefits_he: null,
    benefits_ru: null,
    responsibilities_en: null,
    responsibilities_he: null,
    responsibilities_ru: null,
    nice_to_have_en: null,
    nice_to_have_he: null,
    nice_to_have_ru: null,
    is_featured: false,
    is_active: true,
    posted_date: new Date('2025-01-01'),
    closing_date: null,
    created_at: new Date('2025-01-01'),
    ...overrides,
  } as VacancyEntity;
}

describe('VacanciesService', () => {
  let service: VacanciesService;
  let vacancyRepo: {
    createQueryBuilder: jest.Mock;
    findOne: jest.Mock;
  };
  let applicationRepo: {
    findOne: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
  };
  let cityRepo: {
    createQueryBuilder: jest.Mock;
  };

  beforeEach(async () => {
    const vacancyEntity = createVacancyEntity();
    const vacancyChain = createQueryBuilderChain([vacancyEntity]);
    vacancyRepo = {
      createQueryBuilder: jest.fn().mockReturnValue(vacancyChain),
      findOne: jest.fn().mockResolvedValue(vacancyEntity),
    };

    applicationRepo = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn((dto: Partial<VacancyApplicationEntity>) => ({ ...dto, id: 1, applied_at: new Date() })),
      save: jest.fn((entity: Partial<VacancyApplicationEntity>) => Promise.resolve({ ...entity, id: 1, applied_at: new Date() })),
    };

    const cityChain = createQueryBuilderChain(null, [{ key: 'tel_aviv', name: 'Tel Aviv' }]);
    cityRepo = {
      createQueryBuilder: jest.fn().mockReturnValue(cityChain),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VacanciesService,
        { provide: getRepositoryToken(VacancyEntity), useValue: vacancyRepo },
        {
          provide: getRepositoryToken(VacancyApplicationEntity),
          useValue: applicationRepo,
        },
        {
          provide: getRepositoryToken(CityEntity, 'content'),
          useValue: cityRepo,
        },
      ],
    }).compile();

    service = module.get<VacanciesService>(VacanciesService);
  });

  describe('getAll', () => {
    it('returns success with data array and total', async () => {
      const result = await service.getAll(undefined, 'en', 'true');

      expect(result).toMatchObject({
        status: 'success',
        language: 'en',
        category: 'all',
      });
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.total).toBe(result.data.length);
      expect(result.data[0]).toMatchObject({
        id: 1,
        title: 'Backend Developer',
        category: 'development',
        location: 'Tel Aviv',
      });
    });

    it('filters by category when provided', async () => {
      const qb = vacancyRepo.createQueryBuilder();
      await service.getAll('development', 'he', 'true');

      expect(qb.andWhere).toHaveBeenCalledWith('v.category = :category', {
        category: 'development',
      });
    });

    it('does not filter by category when category is "all"', async () => {
      await service.getAll('all', 'en', 'true');

      const andWhereCalls = vacancyRepo.createQueryBuilder().andWhere.mock.calls;
      const categoryCall = andWhereCalls.find(
        (c: [string]) => c[0]?.includes('category'),
      );
      expect(categoryCall).toBeUndefined();
    });

    it('resolves language to supported lang and passes to response', async () => {
      const result = await service.getAll(undefined, 'ru', 'true');

      expect(result.language).toBe('ru');
    });

    it('falls back to en for invalid lang', async () => {
      const result = await service.getAll(undefined, 'xx', 'true');

      expect(result.language).toBe('en');
    });
  });

  describe('getCategories', () => {
    it('returns success with categories data', async () => {
      const rawData = [
        { category: 'development', count: '5' },
        { category: 'design', count: '2' },
      ];
      vacancyRepo.createQueryBuilder.mockReturnValue(
        createQueryBuilderChain(null, rawData),
      );

      const result = await service.getCategories();

      expect(result).toEqual({ status: 'success', data: rawData });
    });
  });

  describe('getById', () => {
    it('returns vacancy detail by id', async () => {
      const entity = createVacancyEntity({ id: 2, title: 'Frontend Dev' });
      vacancyRepo.findOne.mockResolvedValue(entity);

      const result = await service.getById(2, 'en');

      expect(result.status).toBe('success');
      expect(result.data).toMatchObject({ id: 2, title: 'Frontend Dev' });
      expect(result.language).toBe('en');
      expect(vacancyRepo.findOne).toHaveBeenCalledWith({
        where: { id: 2, is_active: true },
      });
    });

    it('throws NotFoundException when vacancy not found', async () => {
      vacancyRepo.findOne.mockResolvedValue(null);

      await expect(service.getById(999, 'en')).rejects.toThrow(NotFoundException);
      await expect(service.getById(999, 'en')).rejects.toThrow(
        'Vacancy not found',
      );
    });
  });

  describe('apply', () => {
    const validBody = {
      applicant_name: 'Jane Doe',
      applicant_email: 'jane@example.com',
      applicant_phone: '+972501234567',
      applicant_city: 'tel_aviv',
    };

    it('submits application and returns success', async () => {
      const result = await service.apply(1, validBody);

      expect(result.status).toBe('success');
      expect(result.message).toBe('Application submitted successfully');
      expect(result.data).toMatchObject({
        application_id: expect.any(Number),
        vacancy_title: 'Backend Developer',
      });
      expect(applicationRepo.create).toHaveBeenCalled();
      expect(applicationRepo.save).toHaveBeenCalled();
    });

    it('throws BadRequestException when required fields missing', async () => {
      await expect(
        service.apply(1, {
          applicant_name: '',
          applicant_email: 'j@x.com',
          applicant_phone: '+972501234567',
          applicant_city: 'tel_aviv',
        }),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.apply(1, {
          applicant_name: '',
          applicant_email: 'j@x.com',
          applicant_phone: '+972501234567',
          applicant_city: 'tel_aviv',
        }),
      ).rejects.toThrow('Name, email, phone, and city are required');
    });

    it('throws BadRequestException for invalid email', async () => {
      await expect(
        service.apply(1, {
          ...validBody,
          applicant_email: 'not-an-email',
        }),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.apply(1, {
          ...validBody,
          applicant_email: 'not-an-email',
        }),
      ).rejects.toThrow('Invalid email format');
    });

    it('throws BadRequestException for invalid phone', async () => {
      await expect(
        service.apply(1, {
          ...validBody,
          applicant_phone: '123',
        }),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.apply(1, {
          ...validBody,
          applicant_phone: '123',
        }),
      ).rejects.toThrow('Invalid phone number format');
    });

    it('throws NotFoundException when vacancy not found', async () => {
      vacancyRepo.findOne.mockResolvedValue(null);

      await expect(service.apply(999, validBody)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.apply(999, validBody)).rejects.toThrow(
        'Vacancy not found or not accepting applications',
      );
    });

    it('throws NotFoundException when vacancy is closed', async () => {
      vacancyRepo.findOne.mockResolvedValue(
        createVacancyEntity({
          closing_date: new Date('2020-01-01'),
        }),
      );

      await expect(service.apply(1, validBody)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws ConflictException when applicant already applied', async () => {
      applicationRepo.findOne.mockResolvedValue({ id: 1 });

      await expect(service.apply(1, validBody)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.apply(1, validBody)).rejects.toThrow(
        'You have already applied for this position',
      );
    });

    it('passes optional fields to created application', async () => {
      await service.apply(1, {
        ...validBody,
        cover_letter: 'Hello',
        expected_salary: 20000,
        portfolio_url: 'https://jane.dev',
      });

      expect(applicationRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          cover_letter: 'Hello',
          expected_salary: 20000,
          portfolio_url: 'https://jane.dev',
        }),
      );
    });
  });
});
