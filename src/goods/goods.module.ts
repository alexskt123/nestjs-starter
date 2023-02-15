import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehousesEntity } from 'src/warehouses/warehouses.entity';
import { GoodsEntity } from './goods.entity';
import { GoodsResolver } from './goods.resolver';
import { GoodsSeeder } from './goods.seeder';
import { GoodsService } from './goods.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsEntity, WarehousesEntity])],
  providers: [GoodsService, GoodsResolver, GoodsSeeder],
  exports: [GoodsService],
})
export class GoodsModule {}
