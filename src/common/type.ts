import type { KafkaOptions } from '@nestjs/microservices';

export interface ConfigType {
  IS_LOCAL: boolean;
  PORT: number;
  SEED: boolean;
  KAFKA_BROKER_URL: string;
  'KAFKA.MS_OPTIONS': Partial<KafkaOptions>;
}
