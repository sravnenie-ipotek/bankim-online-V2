import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BrokersService } from './brokers.service';
import { BrokerSubmissionEntity } from '../../entities/broker-submission.entity';
import type { SubmitBrokerDto } from './dto/submit-broker.dto';

describe('BrokersService', () => {
  let service: BrokersService;
  let submissionRepo: {
    create: jest.Mock;
    save: jest.Mock;
  };

  const validDto: SubmitBrokerDto = {
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '+972501234567',
    email: 'jane@example.com',
    city: 'tel_aviv',
    desiredRegion: 'center',
    employmentType: 'employment',
    monthlyIncome: '10000',
    experience: '5',
    hasClientCases: true,
    hasDebtCases: false,
    agreeTerms: true,
  };

  beforeEach(async () => {
    const savedEntity = {
      id: 1,
      first_name: validDto.firstName,
      last_name: validDto.lastName,
      phone: validDto.phone,
      email: validDto.email,
      city: validDto.city,
      desired_region: validDto.desiredRegion,
      employment_type: validDto.employmentType,
      monthly_income: validDto.monthlyIncome,
      experience: validDto.experience,
      has_client_cases: validDto.hasClientCases,
      has_debt_cases: validDto.hasDebtCases,
      additional_info: null,
      agree_terms: validDto.agreeTerms,
      license_number: null,
      submitted_at: new Date('2025-01-15T12:00:00Z'),
    };

    submissionRepo = {
      create: jest.fn((dto: Partial<BrokerSubmissionEntity>) => ({ ...dto })),
      save: jest.fn((entity: Partial<BrokerSubmissionEntity>) =>
        Promise.resolve({
          ...entity,
          id: 1,
          submitted_at: savedEntity.submitted_at,
        }),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrokersService,
        {
          provide: getRepositoryToken(BrokerSubmissionEntity),
          useValue: submissionRepo,
        },
      ],
    }).compile();

    service = module.get<BrokersService>(BrokersService);
  });

  describe('submit', () => {
    it('creates entity with mapped DTO fields and returns success', async () => {
      const result = await service.submit(validDto);

      expect(result.status).toBe('success');
      expect(result.message).toBe('Application submitted successfully');
      expect(typeof result.data.id).toBe('number');
      expect(result.data.submitted_at).toBeInstanceOf(Date);
      expect(submissionRepo.create).toHaveBeenCalledWith({
        first_name: validDto.firstName,
        last_name: validDto.lastName,
        phone: validDto.phone,
        email: validDto.email,
        city: validDto.city,
        desired_region: validDto.desiredRegion,
        employment_type: validDto.employmentType,
        monthly_income: validDto.monthlyIncome,
        experience: validDto.experience,
        has_client_cases: validDto.hasClientCases,
        has_debt_cases: validDto.hasDebtCases,
        additional_info: null,
        agree_terms: validDto.agreeTerms,
        license_number: null,
      });
      expect(submissionRepo.save).toHaveBeenCalled();
    });

    it('passes optional additionalInfo and licenseNumber to entity', async () => {
      const dtoWithOptionals: SubmitBrokerDto = {
        ...validDto,
        additionalInfo: 'Some comments',
        licenseNumber: 'LIC-123',
      };

      await service.submit(dtoWithOptionals);

      expect(submissionRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          additional_info: 'Some comments',
          license_number: 'LIC-123',
        }),
      );
    });

    it('returns saved id and submitted_at in data', async () => {
      const fixedDate = new Date('2025-02-01T10:00:00Z');
      submissionRepo.save.mockResolvedValueOnce({
        id: 42,
        submitted_at: fixedDate,
      });

      const result = await service.submit(validDto);

      expect(result.data.id).toBe(42);
      expect(result.data.submitted_at).toEqual(fixedDate);
    });

    it('rejects when save throws', async () => {
      const dbError = new Error('Connection refused');
      submissionRepo.save.mockRejectedValue(dbError);

      await expect(service.submit(validDto)).rejects.toThrow(
        'Connection refused',
      );
    });

    it('rejects when create throws', async () => {
      submissionRepo.create.mockImplementation(() => {
        throw new Error('Invalid entity');
      });

      await expect(service.submit(validDto)).rejects.toThrow('Invalid entity');
    });
  });
});
