import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GoodsModel } from 'src/goods/goods.model';
import { GoodsService } from 'src/goods/goods.service';
import { ResolveGoodsArgs } from './warehouses.input';
import { WarehousesModel } from './warehouses.model';
import { WarehousesService } from './warehouses.service';

@Resolver(() => WarehousesModel)
export class WarehousesResolver {
  constructor(
    private warehousesService: WarehousesService,
    private goodsService: GoodsService,
  ) {}

  @Query(() => [WarehousesModel])
  async Warehouses() {
    return this.warehousesService.findAll();
  }

  @ResolveField('goods', () => [GoodsModel])
  async getGoods(
    @Parent() warehouse: WarehousesModel,
    @Args() goodsArgs: ResolveGoodsArgs,
  ): Promise<GoodsModel[]> {
    const { id } = warehouse;
    const { name } = goodsArgs;
    return this.goodsService.findByWarehouseIdAndGoodsName(id, name);
  }
}
