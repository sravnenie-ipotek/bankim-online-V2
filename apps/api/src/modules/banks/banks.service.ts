import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankEntity } from '../../entities/bank.entity';
import { BankBranchEntity } from '../../entities/bank-branch.entity';
import { IsraeliBankNumberEntity } from '../../entities/israeli-bank-number.entity';
import { ServiceEntity } from '../../entities/service.entity';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { BankListRow } from './interfaces/bank-list-row.interface.js';
import { BankFullRow } from './interfaces/bank-full-row.interface.js';
import { BranchRow } from './interfaces/branch-row.interface.js';
import { IsraeliBankNumberRow } from './interfaces/israeli-bank-number-row.interface.js';
import { ServiceRow } from './interfaces/service-row.interface.js';

@Injectable()
export class BanksService {
  constructor(
    @InjectRepository(BankEntity)
    private readonly bankRepo: Repository<BankEntity>,
    @InjectRepository(BankBranchEntity)
    private readonly branchRepo: Repository<BankBranchEntity>,
    @InjectRepository(IsraeliBankNumberEntity)
    private readonly bankNumberRepo: Repository<IsraeliBankNumberEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepo: Repository<ServiceEntity>,
  ) {}

  async getBanksList(): Promise<ApiResponse<BankListRow[]>> {
    try {
      const banks = await this.bankRepo
        .createQueryBuilder('b')
        .select(['b.id', 'b.name_en', 'b.name_he', 'b.name_ru'])
        .where('b.is_active = :active', { active: true })
        .orderBy('b.display_order', 'ASC')
        .addOrderBy('b.name_en', 'ASC')
        .getMany();

      const data: BankListRow[] = banks.map((b) => ({
        id: b.id,
        name_en: b.name_en,
        name_he: b.name_he,
        name_ru: b.name_ru,
      }));

      return { status: 'success', data };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        `Failed to load banks: ${msg}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBankBranches(bankId: number): Promise<ApiResponse<BranchRow[]>> {
    try {
      const branches = await this.branchRepo
        .createQueryBuilder('bb')
        .select([
          'bb.id',
          'bb.name_en',
          'bb.name_he',
          'bb.name_ru',
          'bb.branch_code',
          'bb.city',
          'bb.address',
        ])
        .where('bb.bank_id = :bankId', { bankId })
        .andWhere('bb.is_active = :active', { active: true })
        .orderBy('bb.name_en', 'ASC')
        .getMany();

      const data: BranchRow[] = branches.map((bb) => ({
        id: bb.id,
        name_en: bb.name_en,
        name_he: bb.name_he,
        name_ru: bb.name_ru,
        branch_code: bb.branch_code,
        city: bb.city,
        address: bb.address,
      }));

      return { status: 'success', data };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        `Failed to load branches: ${msg}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getIsraeliBankNumbers(): Promise<ApiResponse<IsraeliBankNumberRow[]>> {
    try {
      const numbers = await this.bankNumberRepo
        .createQueryBuilder('ibn')
        .select(['ibn.bank_number', 'ibn.bank_name_en', 'ibn.bank_name_he'])
        .where('ibn.is_active = :active', { active: true })
        .orderBy('ibn.bank_number', 'ASC')
        .getMany();

      const data: IsraeliBankNumberRow[] = numbers.map((n) => ({
        bank_number: n.bank_number,
        bank_name_en: n.bank_name_en,
        bank_name_he: n.bank_name_he,
      }));

      return { status: 'success', data };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        `Failed to load bank numbers: ${msg}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getServicesList(): Promise<ApiResponse<ServiceRow[]>> {
    try {
      const services = await this.serviceRepo
        .createQueryBuilder('s')
        .select([
          's.id',
          's.service_key',
          's.name_en',
          's.name_he',
          's.name_ru',
          's.description_en',
          's.description_he',
          's.description_ru',
        ])
        .where('s.is_active = :active', { active: true })
        .orderBy('s.display_order', 'ASC')
        .addOrderBy('s.name_en', 'ASC')
        .getMany();

      const data: ServiceRow[] = services.map((s) => ({
        id: s.id,
        service_key: s.service_key,
        name_en: s.name_en,
        name_he: s.name_he,
        name_ru: s.name_ru,
        description_en: s.description_en,
        description_he: s.description_he,
        description_ru: s.description_ru,
      }));

      return { status: 'success', data };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        `Failed to load services: ${msg}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBanksV1(): Promise<ApiResponse<BankFullRow[]>> {
    try {
      const banks = await this.bankRepo
        .createQueryBuilder('b')
        .select([
          'b.id',
          'b.name_en',
          'b.name_he',
          'b.name_ru',
          'b.url',
          'b.tender',
          'b.priority',
          'b.is_active',
        ])
        .orderBy('b.priority', 'ASC')
        .addOrderBy('b.name_en', 'ASC')
        .getMany();

      const data: BankFullRow[] = banks.map((b) => ({
        id: b.id,
        name_en: b.name_en,
        name_he: b.name_he,
        name_ru: b.name_ru,
        url: b.url,
        tender: b.tender,
        priority: b.priority,
        is_active: b.is_active,
      }));

      return { status: 'success', data };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        `Failed to load banks: ${msg}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
