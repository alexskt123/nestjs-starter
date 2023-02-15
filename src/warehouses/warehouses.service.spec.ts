import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehousesEntity } from './warehouses.entity';
import { warehousesStub } from './warehouses.mock';
import { WarehousesService } from './warehouses.service';

const WarehousesRepositoryMock = jest.fn(() => ({
  find: jest.fn().mockReturnValue(warehousesStub),
}));

describe('WarehousesService', () => {
  let warehousesService: WarehousesService;
  let warehousesRepository: Repository<WarehousesEntity>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        WarehousesService,
        {
          provide: getRepositoryToken(WarehousesEntity),
          useFactory: WarehousesRepositoryMock,
        },
      ],
    }).compile();

    warehousesService = module.get<WarehousesService>(WarehousesService);
    warehousesRepository = module.get<Repository<WarehousesEntity>>(
      getRepositoryToken(WarehousesEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to findAll', async () => {
    const warehousesRepositorySpy = jest.spyOn(warehousesRepository, 'find');

    const getResult = await warehousesService.findAll();
    expect(warehousesRepositorySpy).toBeCalledTimes(1);
    expect(warehousesRepositorySpy).toBeCalledWith();
    expect(getResult).toEqual(warehousesStub);
  });
});
