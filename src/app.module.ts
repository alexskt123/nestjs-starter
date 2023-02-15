import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { GoodsModule } from './goods/goods.module';

@Module({
  imports: [CommonModule, GoodsModule],
})
export class AppModule {}
