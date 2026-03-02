import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesController } from './vacancies.controller';
import { VacanciesService } from './vacancies.service';

describe('VacanciesController', () => {
  let controller: VacanciesController;
  let service: {
    getAll: jest.Mock;
    getCategories: jest.Mock;
    getById: jest.Mock;
    apply: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      getAll: jest.fn(),
      getCategories: jest.fn(),
      getById: jest.fn(),
      apply: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacanciesController],
      providers: [{ provide: VacanciesService, useValue: service }],
    }).compile();

    controller = module.get<VacanciesController>(VacanciesController);
  });

  describe('getAll', () => {
    it('returns service result with default lang and active_only', async () => {
      const payload = {
        status: 'success',
        data: [],
        total: 0,
        language: 'en',
        category: 'all',
      };
      service.getAll.mockResolvedValue(payload);

      const result = await controller.getAll();

      expect(result).toEqual(payload);
      expect(service.getAll).toHaveBeenCalledWith(undefined, 'en', 'true');
    });

    it('passes category and lang query to service', async () => {
      const payload = {
        status: 'success',
        data: [{ id: 1, title: 'Dev', category: 'development' }],
        total: 1,
        language: 'he',
        category: 'development',
      };
      service.getAll.mockResolvedValue(payload);

      const result = await controller.getAll('development', 'he');

      expect(result).toEqual(payload);
      expect(service.getAll).toHaveBeenCalledWith('development', 'he', 'true');
    });

    it('passes active_only query to service', async () => {
      service.getAll.mockResolvedValue({
        status: 'success',
        data: [],
        total: 0,
        language: 'en',
        category: 'all',
      });

      await controller.getAll(undefined, 'en', 'false');

      expect(service.getAll).toHaveBeenCalledWith(undefined, 'en', 'false');
    });
  });

  describe('getCategories', () => {
    it('returns service result', async () => {
      const payload = {
        status: 'success',
        data: [{ category: 'development', count: '5' }],
      };
      service.getCategories.mockResolvedValue(payload);

      const result = await controller.getCategories();

      expect(result).toEqual(payload);
      expect(service.getCategories).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('returns service result with id and default lang', async () => {
      const payload = {
        status: 'success',
        data: { id: 1, title: 'Backend Developer', description: '...' },
        language: 'en',
      };
      service.getById.mockResolvedValue(payload);

      const result = await controller.getById(1);

      expect(result).toEqual(payload);
      expect(service.getById).toHaveBeenCalledWith(1, 'en');
    });

    it('passes lang query to service', async () => {
      const payload = { status: 'success', data: {}, language: 'he' };
      service.getById.mockResolvedValue(payload);

      await controller.getById(2, 'he');

      expect(service.getById).toHaveBeenCalledWith(2, 'he');
    });
  });

  describe('apply', () => {
    it('calls service with id and body and returns result', async () => {
      const body = {
        applicant_name: 'Jane Doe',
        applicant_email: 'jane@example.com',
        applicant_phone: '+972501234567',
        applicant_city: 'tel_aviv',
      };
      const payload = {
        status: 'success',
        message: 'Application submitted successfully',
        data: {
          application_id: 10,
          applied_at: new Date(),
          vacancy_title: 'Dev',
        },
      };
      service.apply.mockResolvedValue(payload);

      const result = await controller.apply(1, body);

      expect(result).toEqual(payload);
      expect(service.apply).toHaveBeenCalledWith(1, body);
    });

    it('passes optional fields to service', async () => {
      const body = {
        applicant_name: 'Jane',
        applicant_email: 'j@x.com',
        applicant_phone: '+972501234567',
        applicant_city: 'tel_aviv',
        cover_letter: 'Hello',
        expected_salary: 20000,
        portfolio_url: 'https://jane.dev',
      };
      service.apply.mockResolvedValue({
        status: 'success',
        message: 'OK',
        data: {},
      });

      await controller.apply(3, body);

      expect(service.apply).toHaveBeenCalledWith(3, body);
    });
  });
});
