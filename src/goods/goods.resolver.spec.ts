import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodsEntity } from './goods.entity';
import { goodsStub } from './goods.mock';
import { GoodsResolver } from './goods.resolver';
import { GoodsService } from './goods.service';

export const GoodsRepositoryMock = jest.fn(() => ({
  find: jest.fn().mockReturnValue(goodsStub),
}));

describe('GoodsResolver', () => {
  let goodsResolver: GoodsResolver;
  let goodsService: GoodsService;
  let goodsRepository: Repository<GoodsEntity>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GoodsResolver,
        GoodsService,
        {
          provide: getRepositoryToken(GoodsEntity),
          useFactory: GoodsRepositoryMock,
        },
      ],
    }).compile();

    goodsResolver = module.get<GoodsResolver>(GoodsResolver);
    goodsService = module.get<GoodsService>(GoodsService);
    goodsRepository = module.get<Repository<GoodsEntity>>(
      getRepositoryToken(GoodsEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to call Goods from resolver', async () => {
    const goodsRepositorySpy = jest.spyOn(goodsRepository, 'find');
    const goodsServiceSpy = jest.spyOn(goodsService, 'findAll');

    const getResult = await goodsResolver.Goods();
    expect(goodsRepositorySpy).toBeCalledTimes(1);
    expect(goodsRepositorySpy).toBeCalledWith();
    expect(goodsServiceSpy).toBeCalledTimes(1);
    expect(goodsServiceSpy).toBeCalledWith();
    expect(getResult).toEqual(goodsStub);
  });
});
