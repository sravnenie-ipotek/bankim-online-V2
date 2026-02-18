import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { CityEntity } from '../../entities/city.entity';
import { RegionEntity } from '../../entities/region.entity';
import { ProfessionEntity } from '../../entities/profession.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [CityEntity, RegionEntity, ProfessionEntity],
      'content',
    ),
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
