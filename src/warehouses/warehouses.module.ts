import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsModule } from 'src/goods/goods.module';
import { WarehousesEntity } from './warehouses.entity';
import { WarehousesResolver } from './warehouses.resolver';
import { WarehousesSeeder } from './warehouses.seeder';
import { WarehousesService } from './warehouses.service';

@Module({
  imports: [TypeOrmModule.forFeature([WarehousesEntity]), GoodsModule],
  providers: [WarehousesService, WarehousesResolver, WarehousesSeeder],
  exports: [WarehousesService],
})
export class WarehousesModule {}
