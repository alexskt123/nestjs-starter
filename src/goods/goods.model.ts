import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/base.model';

@ObjectType()
export class GoodsModel extends BaseModel {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;
}
