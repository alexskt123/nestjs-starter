import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/kafka/kafka.module';
import { EventsController } from './events.controller';

@Module({
  imports: [KafkaModule],
  controllers: [EventsController],
})
export class EventsModule {}
