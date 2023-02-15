import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsEntity } from './goods.entity';
import { GoodsResolver } from './goods.resolver';
import { GoodsService } from './goods.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsEntity])],
  providers: [GoodsService, GoodsResolver],
  exports: [GoodsService],
})
export class GoodsModule {}
