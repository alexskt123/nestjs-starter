import { KAFKA_CLIENT_TOKEN } from './kafka.constant';

export const mockKafkaConfigService = {
  get: (configName: string) => {
    switch (configName) {
      case 'KAFKA.MS_OPTIONS':
        return {
          transport: 6,
          options: {
            client: {
              brokers: ['nestjs-starter.kafka:9091'],
            },
            consumer: {
              groupId: KAFKA_CLIENT_TOKEN,
              sessionTimeout: 20000,
              retry: {
                retries: 5,
                initialRetryTime: 100,
              },
            },
            producer: {
              createPartitioner: () => () => 1,
            },
            run: {
              autoCommitInterval: 1000,
            },
          },
        };
      default:
        return '';
    }
  },
};
