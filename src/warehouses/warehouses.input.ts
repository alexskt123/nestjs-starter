import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class ResolveGoodsArgs {
  @Field({ nullable: true })
  name?: string;
}
