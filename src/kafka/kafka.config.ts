import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import 'dotenv/config';
import { KAFKA_CLIENT_TOKEN } from './kafka.constant';

export default registerAs('KAFKA', () => ({
  MS_OPTIONS: {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER_URL],
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
        createPartitioner: Partitioners.LegacyPartitioner,
      },
      run: {
        autoCommitInterval: 1000,
      },
    },
  },
}));
