import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'timestamp with time zone', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', onUpdate: 'NOW()' })
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
