import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BrokersController } from './brokers.controller';
import { BrokersService } from './brokers.service';
import type { SubmitBrokerDto } from './dto/submit-broker.dto';

describe('BrokersController', () => {
  let controller: BrokersController;
  let service: { submit: jest.Mock };

  beforeEach(async () => {
    service = { submit: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrokersController],
      providers: [{ provide: BrokersService, useValue: service }],
    }).compile();

    controller = module.get<BrokersController>(BrokersController);
  });

  describe('submit', () => {
    const validBody: SubmitBrokerDto = {
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

    it('calls service with body and returns result', async () => {
      const payload = {
        status: 'success',
        message: 'Application submitted successfully',
        data: { id: 1, submitted_at: new Date() },
      };
      service.submit.mockResolvedValue(payload);

      const result = await controller.submit(validBody);

      expect(result).toEqual(payload);
      expect(service.submit).toHaveBeenCalledWith(validBody);
    });

    it('passes optional additionalInfo and licenseNumber to service', async () => {
      const bodyWithOptionals: SubmitBrokerDto = {
        ...validBody,
        additionalInfo: 'Some comments',
        licenseNumber: 'LIC-123',
      };
      service.submit.mockResolvedValue({
        status: 'success',
        message: 'OK',
        data: { id: 2, submitted_at: new Date() },
      });

      await controller.submit(bodyWithOptionals);

      expect(service.submit).toHaveBeenCalledWith(bodyWithOptionals);
    });

    it('propagates error when service throws', async () => {
      const err = new BadRequestException('Invalid data');
      service.submit.mockRejectedValue(err);

      await expect(controller.submit(validBody)).rejects.toThrow(
        BadRequestException,
      );
      await expect(controller.submit(validBody)).rejects.toThrow(
        'Invalid data',
      );
    });

    it('propagates generic error when service throws', async () => {
      service.submit.mockRejectedValue(new Error('Database connection failed'));

      await expect(controller.submit(validBody)).rejects.toThrow(
        'Database connection failed',
      );
    });
  });
});
