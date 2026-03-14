import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrokerSubmissionEntity } from '../../entities/broker-submission.entity';
import type { SubmitBrokerDto } from './dto/submit-broker.dto';

@Injectable()
export class BrokersService {
  constructor(
    @InjectRepository(BrokerSubmissionEntity)
    private readonly submissionRepo: Repository<BrokerSubmissionEntity>,
  ) {}

  async submit(dto: SubmitBrokerDto): Promise<{
    status: string;
    message: string;
    data: { id: number; submitted_at: Date };
  }> {
    const entity = this.submissionRepo.create({
      first_name: dto.firstName,
      last_name: dto.lastName,
      phone: dto.phone,
      email: dto.email,
      city: dto.city,
      desired_region: dto.desiredRegion,
      employment_type: dto.employmentType,
      monthly_income: dto.monthlyIncome,
      experience: dto.experience,
      has_client_cases: dto.hasClientCases,
      has_debt_cases: dto.hasDebtCases,
      additional_info: dto.additionalInfo ?? null,
      agree_terms: dto.agreeTerms,
      license_number: dto.licenseNumber ?? null,
    });
    const saved = await this.submissionRepo.save(entity);
    return {
      status: 'success',
      message: 'Application submitted successfully',
      data: {
        id: saved.id,
        submitted_at: saved.submitted_at,
      },
    };
  }
}
