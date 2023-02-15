import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodsEntity } from './goods.entity';
import { goodsStub } from './goods.mock';

@Injectable()
export class GoodsSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(GoodsEntity)
    private readonly goodsRepository: Repository<GoodsEntity>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (
      this.configService.get('SEED') &&
      (await this.goodsRepository.count()) === 0
    ) {
      // eslint-disable-next-line no-restricted-syntax
      for (const goods of goodsStub) {
        const newGoods = this.goodsRepository.create({
          ...goods,
        });
        // eslint-disable-next-line no-await-in-loop
        await this.goodsRepository.save(newGoods);
      }
    }
  }
}
