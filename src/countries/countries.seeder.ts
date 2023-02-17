import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountriesEntity } from './countries.entity';
import { countriesStub } from './countries.mock';

@Injectable()
export class CountriesSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(CountriesEntity)
    private readonly countriesRepository: Repository<CountriesEntity>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (
      this.configService.get('SEED') &&
      (await this.countriesRepository.count()) === 0
    ) {
      // eslint-disable-next-line no-restricted-syntax
      for (const countries of countriesStub) {
        const newCountries = this.countriesRepository.create({
          ...countries,
        });
        // eslint-disable-next-line no-await-in-loop
        await this.countriesRepository.save(newCountries);
      }
    }
  }
}
