import { Inject, Injectable } from '@nestjs/common';
import type { OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { KafkaClient } from './kafka.client';
import { KAFKA_CLIENT_TOKEN } from './kafka.constant';

@Injectable()
export class KafkaService implements OnModuleInit, OnApplicationShutdown {
  constructor(
    @Inject(KAFKA_CLIENT_TOKEN) public readonly client: KafkaClient,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  async onApplicationShutdown() {
    await this.client.close();
  }
}
