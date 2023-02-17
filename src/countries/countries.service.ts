import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountriesEntity } from './countries.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(CountriesEntity)
    private readonly countriesRepository: Repository<CountriesEntity>,
  ) {}

  public async findByCode(code: string): Promise<CountriesEntity[]> {
    return this.countriesRepository.find({
      where: {
        code,
      },
    });
  }
}
