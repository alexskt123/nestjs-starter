import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodsEntity } from './goods.entity';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsEntity)
    private readonly GoodsEntityRepository: Repository<GoodsEntity>,
  ) {}

  public async findAll(): Promise<GoodsEntity[]> {
    return this.GoodsEntityRepository.find();
  }
}
