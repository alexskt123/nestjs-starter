import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CountriesRequestParamDto {
  @IsString()
  @IsOptional()
  code: string;
}

export class CountriesResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  code: string;
}
