import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseModel {
  @Field(() => Int)
  id: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  version: number;
}
