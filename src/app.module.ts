import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { GoodsModule } from './goods/goods.module';
import { WarehousesModule } from './warehouses/warehouses.module';

@Module({
  imports: [CommonModule, WarehousesModule, GoodsModule],
})
export class AppModule {}
