import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { BankEmployeeEntity } from '../../entities/bank-employee.entity';
import { BankEmployeeServiceEntity } from '../../entities/bank-employee-service.entity';
import { RegistrationFormConfigEntity } from '../../entities/registration-form-config.entity';
import { resolveLanguage } from '../../helpers/language.helper';

@Injectable()
export class BankWorkerService {
  constructor(
    @InjectRepository(BankEmployeeEntity)
    private readonly employeeRepo: Repository<BankEmployeeEntity>,
    @InjectRepository(BankEmployeeServiceEntity)
    private readonly employeeServiceRepo: Repository<BankEmployeeServiceEntity>,
    @InjectRepository(RegistrationFormConfigEntity)
    private readonly regConfigRepo: Repository<RegistrationFormConfigEntity>,
    private readonly config: ConfigService,
  ) {}

  private get jwtSecret(): string {
    const secret = this.config.get<string>('JWT_SECRET');
    if (!secret) throw new Error('JWT_SECRET is required');
    return secret;
  }

  async register(body: {
    fullName: string;
    position: string;
    corporateEmail: string;
    bankId: number;
    branchId: number;
    bankNumber: string;
    termsAccepted: boolean;
    selectedServices?: number[];
  }) {
    const {
      fullName,
      position,
      corporateEmail,
      bankId,
      branchId,
      bankNumber,
      termsAccepted,
      selectedServices,
    } = body;

    if (
      !fullName ||
      !position ||
      !corporateEmail ||
      !bankId ||
      !branchId ||
      !bankNumber ||
      !termsAccepted
    ) {
      throw new BadRequestException('All required fields must be filled');
    }

    const existing = await this.employeeRepo.findOne({
      where: { corporate_email: corporateEmail },
    });
    if (existing)
      throw new ConflictException('This corporate email is already registered');

    const registrationToken = jwt.sign(
      { email: corporateEmail, timestamp: Date.now() },
      this.jwtSecret,
      { expiresIn: '24h' },
    );

    const employee = this.employeeRepo.create({
      name: fullName,
      position,
      corporate_email: corporateEmail,
      bank_id: bankId,
      branch_id: branchId,
      bank_number: bankNumber,
      terms_accepted: termsAccepted,
      terms_accepted_at: new Date(),
      registration_token: registrationToken,
      registration_expires: new Date(Date.now() + 86400000),
    });
    const saved = await this.employeeRepo.save(employee);

    if (selectedServices && selectedServices.length > 0) {
      const serviceEntries = selectedServices.map((serviceId) =>
        this.employeeServiceRepo.create({
          employee_id: saved.id,
          service_id: serviceId,
        }),
      );
      await this.employeeServiceRepo.save(serviceEntries);
    }

    return {
      data: {
        id: saved.id,
        name: saved.name,
        email: saved.corporate_email,
        status: saved.status,
        registrationToken,
      },
      status: 'success',
      message:
        'Registration successful. Please check your email for verification.',
    };
  }

  async getRegistrationConfig(language: string) {
    const selectedLang = resolveLanguage(language);

    const rows = await this.regConfigRepo.find({
      where: { language: selectedLang, is_active: true },
    });

    const configMap: Record<string, string> = {};
    for (const row of rows) {
      configMap[row.field_name] = row.field_value;
    }

    return { data: configMap, status: 'success', language: selectedLang };
  }
}
