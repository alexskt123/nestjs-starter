import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodsEntity } from './goods.entity';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsEntity)
    private readonly goodsEntityRepository: Repository<GoodsEntity>,
  ) {}

  public async findAll(): Promise<GoodsEntity[]> {
    return this.goodsEntityRepository.find();
  }

  public async findByWarehouseIdAndGoodsName(
    id: number,
    name: string | undefined,
  ): Promise<GoodsEntity[]> {
    return this.goodsEntityRepository.find({
      where: {
        name,
        warehouseId: id,
      },
    });
  }
}
