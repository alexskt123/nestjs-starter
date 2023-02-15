import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehousesEntity } from './warehouses.entity';
import { warehousesStub } from './warehouses.mock';

@Injectable()
export class WarehousesSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(WarehousesEntity)
    private readonly warehousesRepository: Repository<WarehousesEntity>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (
      this.configService.get('SEED') &&
      (await this.warehousesRepository.count()) === 0
    ) {
      // eslint-disable-next-line no-restricted-syntax
      for (const warehouses of warehousesStub) {
        const newWarehouses = this.warehousesRepository.create({
          ...warehouses,
        });
        // eslint-disable-next-line no-await-in-loop
        await this.warehousesRepository.save(newWarehouses);
      }
    }
  }
}
