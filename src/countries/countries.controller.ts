import { Controller, Get, Param } from '@nestjs/common';
import {
  CountriesRequestParamDto,
  CountriesResponseDto,
} from './countries.dto';
import { CountriesService } from './countries.service';

@Controller('/countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Get()
  async getCountriess(
    @Param() countriesRequestParamDto: CountriesRequestParamDto,
  ): Promise<CountriesResponseDto[]> {
    const { code } = countriesRequestParamDto;

    return this.countriesService.findByCode(code);
  }
}
