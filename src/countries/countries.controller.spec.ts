import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CountriesController } from './countries.controller';
import { CountriesEntity } from './countries.entity';
import { countriesStub } from './countries.mock';
import { CountriesService } from './countries.service';

const CountriesRepositoryMock = jest.fn(() => ({
  find: jest.fn().mockReturnValue(countriesStub),
}));

describe('CountriesController', () => {
  let countriesController: CountriesController;
  let countriesService: CountriesService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CountriesService,
        CountriesController,
        {
          provide: getRepositoryToken(CountriesEntity),
          useFactory: CountriesRepositoryMock,
        },
      ],
    }).compile();

    countriesController = module.get<CountriesController>(CountriesController);
    countriesService = module.get<CountriesService>(CountriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly call findByCode on Countries Service', async () => {
    const requestParams = {
      code: 'CN',
    };
    const countriesServiceSpy = jest.spyOn(countriesService, 'findByCode');
    const countriesResponse = await countriesController.getCountriess(
      requestParams,
    );

    expect(countriesServiceSpy).toBeCalledTimes(1);
    expect(countriesServiceSpy).toBeCalledWith(requestParams.code);
    expect(countriesResponse).toStrictEqual(countriesStub);
  });
});
