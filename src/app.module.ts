import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { CountriesModule } from './countries/countries.module';
import { EventsModule } from './events/events.module';
import { GoodsModule } from './goods/goods.module';
import { WarehousesModule } from './warehouses/warehouses.module';

@Module({
  imports: [
    CommonModule,
    WarehousesModule,
    GoodsModule,
    CountriesModule,
    EventsModule,
  ],
})
export class AppModule {}
