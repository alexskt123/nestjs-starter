import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/base.model';
import { GoodsModel } from 'src/goods/goods.model';

@ObjectType()
export class WarehousesModel extends BaseModel {
  @Field()
  name: string;

  @Field()
  location: string;

  @Field(() => [GoodsModel], {
    description: 'list of goods',
  })
  goods: GoodsModel[];
}
