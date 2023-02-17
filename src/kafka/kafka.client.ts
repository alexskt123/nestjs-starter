import { ClientKafka } from '@nestjs/microservices';
import type { KafkaOptions } from '@nestjs/microservices';
import type { Producer } from '@nestjs/microservices/external/kafka.interface';

export class KafkaClient extends ClientKafka {
  private consumerLastHeartbeat: number;

  private isHeartbeatListenerAttached: boolean;

  constructor(protected readonly options: KafkaOptions['options']) {
    super(options);

    this.consumerLastHeartbeat = 0;
    this.isHeartbeatListenerAttached = false;
  }

  public async connect(): Promise<Producer> {
    await super.connect();

    if (!this.producerOnlyMode && !this.isHeartbeatListenerAttached) {
      this.consumer.on(
        this.consumer.events.HEARTBEAT,
        ({ timestamp }: { timestamp: number }) => {
          this.consumerLastHeartbeat = timestamp;
        },
      );
      this.isHeartbeatListenerAttached = true;
    }

    return this.producer;
  }

  async isAlive(): Promise<boolean> {
    // Consumer has heartbeat within the session timeout, so return true
    if (
      this.options?.consumer?.sessionTimeout &&
      Date.now() - this.consumerLastHeartbeat <
        this.options.consumer.sessionTimeout
    ) {
      return true;
    }
    // Consumer has no heartbeat but maybe the group is currently balancing
    return this.isBalancing();
  }

  private async isBalancing(): Promise<boolean> {
    try {
      const groupDescription = await this.consumer.describeGroup();
      return ['CompletingRebalance', 'PreparingRebalance'].includes(
        groupDescription.state,
      );
    } catch (e) {
      return false;
    }
  }
}
