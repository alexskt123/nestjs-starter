import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { KafkaOptions } from '@nestjs/microservices';
import { ConfigType } from 'src/common/type';
import { KafkaService } from './kafka.service';
import { KafkaClient } from './kafka.client';
import { KAFKA_CLIENT_TOKEN } from './kafka.constant';

@Module({
  providers: [
    {
      provide: KAFKA_CLIENT_TOKEN,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigType, true>) =>
        new KafkaClient(
          configService.get<KafkaOptions>('KAFKA.MS_OPTIONS').options,
        ),
    },
    KafkaService,
  ],
  exports: [KafkaService],
})
export class KafkaModule {}
