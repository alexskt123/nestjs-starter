import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehousesEntity } from './warehouses.entity';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectRepository(WarehousesEntity)
    private readonly warehousesEntityRepository: Repository<WarehousesEntity>,
  ) {}

  public async findAll(): Promise<WarehousesEntity[]> {
    return this.warehousesEntityRepository.find();
  }
}
