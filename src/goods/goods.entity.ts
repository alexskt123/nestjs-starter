import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('Goods')
export class GoodsEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  price: number;
}
