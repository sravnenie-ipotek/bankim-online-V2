import type { SupportedLanguage } from '../../../helpers/language.helper.js';
import { languageColumn } from '../../../helpers/language.helper.js';
import type { VacancyEntity } from '../../../entities/vacancy.entity.js';
import type { VacancyListRow } from '../interfaces/VacancyListRow.js';
import type { VacancyDetailRow } from '../interfaces/VacancyDetailRow.js';

export class VacancyMapper {
  static toListRow(
    entity: VacancyEntity,
    lang: SupportedLanguage,
    locationName?: string | null,
  ): VacancyListRow {
    const descKey = languageColumn('description', lang) as keyof VacancyEntity;
    const reqKey = languageColumn('requirements', lang) as keyof VacancyEntity;
    const benKey = languageColumn('benefits', lang) as keyof VacancyEntity;
    return {
      id: entity.id,
      title: entity.title,
      category: entity.category ?? null,
      subcategory: entity.subcategory ?? null,
      location: locationName ?? entity.location ?? null,
      employment_type: entity.employment_type ?? null,
      salary_min: entity.salary_min ?? null,
      salary_max: entity.salary_max ?? null,
      salary_currency: entity.salary_currency ?? null,
      description: (entity[descKey] as string | undefined) ?? null,
      requirements: (entity[reqKey] as string | undefined) ?? null,
      benefits: (entity[benKey] as string | undefined) ?? null,
      is_featured: entity.is_featured ?? false,
      posted_date: entity.posted_date ?? null,
      closing_date: entity.closing_date ?? null,
    };
  }

  static toDetailRow(
    entity: VacancyEntity,
    lang: SupportedLanguage,
    locationName?: string | null,
  ): VacancyDetailRow {
    const list = VacancyMapper.toListRow(entity, lang, locationName);
    const respKey = languageColumn(
      'responsibilities',
      lang,
    ) as keyof VacancyEntity;
    const niceKey = languageColumn('nice_to_have', lang) as keyof VacancyEntity;
    return {
      ...list,
      responsibilities: (entity[respKey] as string | undefined) ?? null,
      nice_to_have: (entity[niceKey] as string | undefined) ?? null,
      created_at: entity.created_at ?? null,
    };
  }
}
