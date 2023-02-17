import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesController } from './countries.controller';
import { CountriesEntity } from './countries.entity';
import { CountriesSeeder } from './countries.seeder';
import { CountriesService } from './countries.service';

@Module({
  imports: [TypeOrmModule.forFeature([CountriesEntity])],
  providers: [CountriesService, CountriesSeeder],
  controllers: [CountriesController],
  exports: [CountriesService],
})
export class CountriesModule {}
