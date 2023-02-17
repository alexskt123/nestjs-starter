import { Kafka } from 'kafkajs';
import { KafkaClient } from './kafka.client';
import { KAFKA_CLIENT_TOKEN } from './kafka.constant';

jest.mock('kafkajs');

describe('KafkaClient', () => {
  jest.spyOn(Kafka.prototype, 'producer').mockReturnValue({
    connect: jest.fn(),
    disconnect: jest.fn(),
    send: jest.fn(),
    sendBatch: jest.fn(),
    isIdempotent: jest.fn(),
    on: jest.fn(),
    transaction: jest.fn(),
    logger: jest.fn(),
    events: {
      CONNECT: 'producer.connect',
      DISCONNECT: 'producer.disconnect',
      REQUEST: 'producer.network.request',
      REQUEST_TIMEOUT: 'producer.network.request_timeout',
      REQUEST_QUEUE_SIZE: 'producer.network.request_queue_size',
    },
  });

  const spyKafkaConsumerOn = jest.fn();
  const mockKafkaConsumer = {
    connect: jest.fn(),
    disconnect: jest.fn(),
    subscribe: jest.fn(),
    stop: jest.fn(),
    run: jest.fn(),
    commitOffsets: jest.fn(),
    seek: jest.fn(),
    describeGroup: jest.fn(),
    pause: jest.fn(),
    paused: jest.fn(),
    resume: jest.fn(),
    logger: jest.fn(),
    on: spyKafkaConsumerOn,
    events: {
      HEARTBEAT: 'consumer.heartbeat' as const,
      COMMIT_OFFSETS: 'consumer.commit_offsets' as const,
      GROUP_JOIN: 'consumer.group_join' as const,
      FETCH_START: 'consumer.fetch_start' as const,
      FETCH: 'consumer.fetch' as const,
      START_BATCH_PROCESS: 'consumer.start_batch_process' as const,
      END_BATCH_PROCESS: 'consumer.end_batch_process' as const,
      CONNECT: 'consumer.connect' as const,
      DISCONNECT: 'consumer.disconnect' as const,
      STOP: 'consumer.stop' as const,
      CRASH: 'consumer.crash' as const,
      REBALANCING: 'consumer.rebalancing' as const,
      RECEIVED_UNSUBSCRIBED_TOPICS:
        'consumer.received_unsubscribed_topics' as const,
      REQUEST: 'consumer.network.request' as const,
      REQUEST_TIMEOUT: 'consumer.network.request_timeout' as const,
      REQUEST_QUEUE_SIZE: 'consumer.network.request_queue_size' as const,
    },
  };
  jest.spyOn(Kafka.prototype, 'consumer').mockReturnValue(mockKafkaConsumer);

  const clientOptions = {
    client: {
      brokers: ['kafka-broker-url'],
    },
    consumer: {
      groupId: KAFKA_CLIENT_TOKEN,
      sessionTimeout: 9999999999999,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should connect and attach heartbeat listener', async () => {
    const kafkaClient = new KafkaClient(clientOptions);

    await kafkaClient.connect();

    expect(spyKafkaConsumerOn).toHaveBeenCalledTimes(2);
    expect(spyKafkaConsumerOn).toHaveBeenLastCalledWith(
      mockKafkaConsumer.events.HEARTBEAT,
      expect.any(Function),
    );

    await kafkaClient.connect();
    // On subsequent connections event listeners should not be attached again
    expect(spyKafkaConsumerOn).toHaveBeenCalledTimes(2);
  });

  it('should connect in producer only mode', async () => {
    const kafkaClient = new KafkaClient({
      ...clientOptions,
      producerOnlyMode: true,
    });

    await kafkaClient.connect();

    expect(spyKafkaConsumerOn).not.toHaveBeenCalled();
  });

  it('should have a healthy consumer', async () => {
    mockKafkaConsumer.describeGroup = jest.fn().mockReturnValue({
      state: 'CompletingRebalance',
    });
    jest.spyOn(Kafka.prototype, 'consumer').mockReturnValue(mockKafkaConsumer);

    // Check consumer has heartbeat within the session timeout
    const kafkaClient = new KafkaClient(clientOptions);
    await kafkaClient.connect();
    const isAlive = await kafkaClient.isAlive();
    expect(isAlive).toBeTruthy();

    // Check wether it's balancing
    const kafkaClient2 = new KafkaClient({
      ...clientOptions,
      consumer: {
        ...clientOptions.consumer,
        sessionTimeout: 1,
      },
    });

    await kafkaClient2.connect();
    const isAlive2 = await kafkaClient2.isAlive();
    expect(isAlive2).toBeTruthy();
  });

  it('should have a unhealthy consumer', async () => {
    mockKafkaConsumer.describeGroup = jest.fn().mockReturnValue({
      state: 'Dead',
    });
    jest.spyOn(Kafka.prototype, 'consumer').mockReturnValue(mockKafkaConsumer);

    const kafkaClient = new KafkaClient({
      ...clientOptions,
      consumer: {
        ...clientOptions.consumer,
        sessionTimeout: 1,
      },
    });

    await kafkaClient.connect();
    const isAlive = await kafkaClient.isAlive();
    expect(isAlive).toBeFalsy();
  });
});
