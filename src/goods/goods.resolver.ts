import { Query, Resolver } from '@nestjs/graphql';
import { GoodsModel } from './goods.model';
import { GoodsService } from './goods.service';

@Resolver(() => GoodsModel)
export class GoodsResolver {
  constructor(private goodsService: GoodsService) {}

  @Query(() => [GoodsModel])
  async Goods() {
    return this.goodsService.findAll();
  }
}
