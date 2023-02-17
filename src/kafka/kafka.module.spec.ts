import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { KafkaModule } from './kafka.module';
import { KafkaService } from './kafka.service';
import { KafkaClient } from './kafka.client';
import { KAFKA_CLIENT_TOKEN } from './kafka.constant';
import { mockKafkaConfigService } from './kafka.config.mock';

describe('kafka.module', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [
            () => ({
              'KAFKA.MS_OPTIONS':
                mockKafkaConfigService.get('KAFKA.MS_OPTIONS'),
            }),
          ],
        }),
        KafkaModule,
      ],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(KafkaService)).toBeInstanceOf(KafkaService);
    expect(module.get(KAFKA_CLIENT_TOKEN)).toBeInstanceOf(KafkaClient);
  });
});
