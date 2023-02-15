import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodsEntity } from './goods.entity';
import { goodsStub } from './goods.mock';
import { GoodsService } from './goods.service';

const GoodsRepositoryMock = jest.fn(() => ({
  find: jest.fn().mockReturnValue(goodsStub),
}));

describe('GoodsService', () => {
  let goodsService: GoodsService;
  let goodsRepository: Repository<GoodsEntity>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GoodsService,
        {
          provide: getRepositoryToken(GoodsEntity),
          useFactory: GoodsRepositoryMock,
        },
      ],
    }).compile();

    goodsService = module.get<GoodsService>(GoodsService);
    goodsRepository = module.get<Repository<GoodsEntity>>(
      getRepositoryToken(GoodsEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to findAll', async () => {
    const goodsRepositorySpy = jest.spyOn(goodsRepository, 'find');

    const getResult = await goodsService.findAll();
    expect(goodsRepositorySpy).toBeCalledTimes(1);
    expect(goodsRepositorySpy).toBeCalledWith();
    expect(getResult).toEqual(goodsStub);
  });

  it('should be able to findByWarehouseIdAndGoodsName', async () => {
    const goodsRepositorySpy = jest.spyOn(goodsRepository, 'find');

    const getResult = await goodsService.findByWarehouseIdAndGoodsName(
      1,
      'Apple',
    );
    expect(goodsRepositorySpy).toBeCalledTimes(1);
    expect(goodsRepositorySpy).toBeCalledWith({
      where: { name: 'Apple', warehouseId: 1 },
    });
    expect(getResult).toEqual(goodsStub);
  });
});
