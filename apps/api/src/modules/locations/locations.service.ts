import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '../../entities/city.entity';
import { RegionEntity } from '../../entities/region.entity';
import { ProfessionEntity } from '../../entities/profession.entity';
import { ApiResponse } from '../../interfaces/api-response.interface';
import {
  resolveLanguage,
  type SupportedLanguage,
} from '../../helpers/language.helper';

export interface CityRow {
  id: number;
  key: string;
  name: string;
}

export interface RegionRow {
  id: number;
  key: string;
  name: string;
}

export interface ProfessionRow {
  id: number;
  key: string;
  name: string;
  category: string;
}

export interface HardcodedCity {
  id: number;
  name_en: string;
  name_he: string;
  name_ru: string;
}

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(CityEntity, 'content')
    private readonly cityRepo: Repository<CityEntity>,
    @InjectRepository(RegionEntity, 'content')
    private readonly regionRepo: Repository<RegionEntity>,
    @InjectRepository(ProfessionEntity, 'content')
    private readonly professionRepo: Repository<ProfessionEntity>,
  ) {}

  private readonly hardcodedCities: HardcodedCity[] = [
    { id: 1, name_en: 'Tel Aviv', name_he: 'תל אביב', name_ru: 'Тель-Авив' },
    { id: 2, name_en: 'Jerusalem', name_he: 'ירושלים', name_ru: 'Иерусалим' },
    { id: 3, name_en: 'Haifa', name_he: 'חיפה', name_ru: 'Хайфа' },
    {
      id: 4,
      name_en: 'Rishon LeZion',
      name_he: 'ראשון לציון',
      name_ru: 'Ришон ле-Цион',
    },
    {
      id: 5,
      name_en: 'Petah Tikva',
      name_he: 'פתח תקווה',
      name_ru: 'Петах-Тиква',
    },
    { id: 6, name_en: 'Ashdod', name_he: 'אשדוד', name_ru: 'Ашдод' },
    { id: 7, name_en: 'Netanya', name_he: 'נתניה', name_ru: 'Нетания' },
    { id: 8, name_en: 'Beer Sheva', name_he: 'באר שבע', name_ru: 'Беэр-Шева' },
    { id: 9, name_en: 'Holon', name_he: 'חולון', name_ru: 'Холон' },
    { id: 10, name_en: 'Bnei Brak', name_he: 'בני ברק', name_ru: 'Бней-Брак' },
  ];

  getCitiesV1(): ApiResponse<HardcodedCity[]> {
    return {
      status: 'success',
      data: this.hardcodedCities,
      total: this.hardcodedCities.length,
    };
  }

  async getCities(lang: string): Promise<ApiResponse<CityRow[]>> {
    const selectedLang = resolveLanguage(lang);
    const nameColumn = this.nameColumnForLang('c', selectedLang);

    try {
      const rows: CityRow[] = await this.cityRepo
        .createQueryBuilder('c')
        .select('c.id', 'id')
        .addSelect('c.key', 'key')
        .addSelect(nameColumn, 'name')
        .where('c.is_active = :active', { active: true })
        .orderBy(nameColumn)
        .getRawMany();

      return {
        status: 'success',
        data: rows,
        language: selectedLang,
        total: rows.length,
      };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        `Failed to load cities: ${msg}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRegions(lang: string): Promise<ApiResponse<RegionRow[]>> {
    const selectedLang = resolveLanguage(lang);
    const nameColumn = this.nameColumnForLang('r', selectedLang);

    try {
      const rows: RegionRow[] = await this.regionRepo
        .createQueryBuilder('r')
        .select('r.id', 'id')
        .addSelect('r.key', 'key')
        .addSelect(nameColumn, 'name')
        .where('r.is_active = :active', { active: true })
        .orderBy(nameColumn)
        .getRawMany();

      return {
        status: 'success',
        data: rows,
        language: selectedLang,
        total: rows.length,
      };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        `Failed to load regions: ${msg}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProfessions(
    lang: string,
    category: string | null,
  ): Promise<ApiResponse<ProfessionRow[]>> {
    const selectedLang = resolveLanguage(lang);
    const nameColumn = this.nameColumnForLang('p', selectedLang);

    try {
      const qb = this.professionRepo
        .createQueryBuilder('p')
        .select('p.id', 'id')
        .addSelect('p.key', 'key')
        .addSelect(nameColumn, 'name')
        .addSelect('p.category', 'category')
        .where('p.is_active = :active', { active: true });

      if (category) {
        qb.andWhere('p.category = :category', { category });
      }

      qb.orderBy(nameColumn);

      const rows: ProfessionRow[] = await qb.getRawMany();

      return {
        status: 'success',
        data: rows,
        language: selectedLang,
        category,
        total: rows.length,
      };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        `Failed to load professions: ${msg}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private nameColumnForLang(alias: string, lang: SupportedLanguage): string {
    return `${alias}.name_${lang}`;
  }
}
