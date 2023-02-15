import { BaseEntity } from 'src/common/base.entity';
import { GoodsEntity } from 'src/goods/goods.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('Warehouses')
export class WarehousesEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  location: string;

  @OneToMany(() => GoodsEntity, (goodsEntity) => goodsEntity.warehouse, {
    cascade: true,
  })
  goods: GoodsEntity[];
}
