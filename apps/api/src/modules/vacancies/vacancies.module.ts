import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacanciesController } from './vacancies.controller';
import { VacanciesService } from './vacancies.service';
import { VacancyEntity } from '../../entities/vacancy.entity';
import { VacancyApplicationEntity } from '../../entities/vacancy-application.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VacancyEntity, VacancyApplicationEntity]),
  ],
  controllers: [VacanciesController],
  providers: [VacanciesService],
  exports: [VacanciesService],
})
export class VacanciesModule {}
