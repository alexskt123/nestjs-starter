import { BaseEntity } from 'src/common/base.entity';
import { WarehousesEntity } from 'src/warehouses/warehouses.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Goods')
export class GoodsEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  warehouseId: number;

  @ManyToOne(() => WarehousesEntity)
  @JoinColumn({ name: 'warehouseId', referencedColumnName: 'id' })
  warehouse: WarehousesEntity;
}
