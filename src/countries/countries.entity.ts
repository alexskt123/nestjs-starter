import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('Countries')
export class CountriesEntity extends BaseEntity {
  @Column({
    unique: true,
  })
  code: string;

  @Column({
    unique: true,
  })
  name: string;
}
