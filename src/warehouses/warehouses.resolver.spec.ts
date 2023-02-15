import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GoodsEntity } from 'src/goods/goods.entity';
import { goodsStub } from 'src/goods/goods.mock';
import { GoodsRepositoryMock } from 'src/goods/goods.resolver.spec';
import { GoodsService } from 'src/goods/goods.service';
import { Repository } from 'typeorm';
import { WarehousesEntity } from './warehouses.entity';
import { warehousesStub } from './warehouses.mock';
import { WarehousesResolver } from './warehouses.resolver';
import { WarehousesService } from './warehouses.service';

const WarehousesRepositoryMock = jest.fn(() => ({
  find: jest.fn().mockReturnValue(warehousesStub),
}));

describe('WarehousesResolver', () => {
  let warehousesResolver: WarehousesResolver;
  let warehousesService: WarehousesService;
  let warehousesRepository: Repository<WarehousesEntity>;
  let goodsService: GoodsService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        WarehousesResolver,
        WarehousesService,
        GoodsService,
        {
          provide: getRepositoryToken(WarehousesEntity),
          useFactory: WarehousesRepositoryMock,
        },
        {
          provide: getRepositoryToken(GoodsEntity),
          useFactory: GoodsRepositoryMock,
        },
      ],
    }).compile();

    warehousesResolver = module.get<WarehousesResolver>(WarehousesResolver);
    warehousesService = module.get<WarehousesService>(WarehousesService);
    warehousesRepository = module.get<Repository<WarehousesEntity>>(
      getRepositoryToken(WarehousesEntity),
    );
    goodsService = module.get<GoodsService>(GoodsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to call Warehouses from resolver', async () => {
    const warehousesRepositorySpy = jest.spyOn(warehousesRepository, 'find');
    const warehousesServiceSpy = jest.spyOn(warehousesService, 'findAll');

    const getResult = await warehousesResolver.Warehouses();
    expect(warehousesRepositorySpy).toBeCalledTimes(1);
    expect(warehousesRepositorySpy).toBeCalledWith();
    expect(warehousesServiceSpy).toBeCalledTimes(1);
    expect(warehousesServiceSpy).toBeCalledWith();
    expect(getResult).toEqual(warehousesStub);
  });

  it('should be able to resolve goods', async () => {
    const goodsServiceSpy = jest.spyOn(
      goodsService,
      'findByWarehouseIdAndGoodsName',
    );

    const getResult = await warehousesResolver.getGoods(warehousesStub[0], {});

    expect(goodsServiceSpy).toBeCalledTimes(1);
    expect(goodsServiceSpy).toBeCalledWith(1, undefined);
    expect(getResult).toStrictEqual(goodsStub);
  });
});
