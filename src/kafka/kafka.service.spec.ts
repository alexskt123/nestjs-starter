import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { KafkaService } from './kafka.service';
import { KafkaClient } from './kafka.client';
import { KAFKA_CLIENT_TOKEN } from './kafka.constant';
import { mockKafkaConfigService } from './kafka.config.mock';

describe('Kafka Service', () => {
  let kafkaService: KafkaService;
  let kafkaClient: KafkaClient;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: ConfigService, useValue: mockKafkaConfigService },
        { provide: KAFKA_CLIENT_TOKEN, useClass: KafkaClient },
        KafkaService,
      ],
    }).compile();

    kafkaService = module.get<KafkaService>(KafkaService);
    kafkaClient = module.get<KafkaClient>(KAFKA_CLIENT_TOKEN);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call connect and close on the client', async () => {
    const spyKafkaClientConnect = jest
      .spyOn(kafkaClient, 'connect')
      .mockImplementation(jest.fn());
    const spyKafkaClientClose = jest
      .spyOn(kafkaClient, 'close')
      .mockImplementation(jest.fn());

    await kafkaService.onModuleInit();
    expect(spyKafkaClientConnect).toBeCalledTimes(1);

    await kafkaService.onApplicationShutdown();
    expect(spyKafkaClientClose).toBeCalledTimes(1);
  });
});
