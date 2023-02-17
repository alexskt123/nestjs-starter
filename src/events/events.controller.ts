import { Body, Controller, HttpStatus, Logger, Post } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MqttContext,
  Payload,
  Transport,
} from '@nestjs/microservices';

import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { KafkaService } from 'src/kafka/kafka.service';
import { EventsDto } from './events.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('publish')
  @ApiResponse({
    description: 'Emit a message to a Kafka Topic',
    status: HttpStatus.CREATED,
  })
  @ApiBody({ type: EventsDto })
  producer(@Body() event: EventsDto): EventsDto {
    this.kafkaService.client.emit('events', event.message);
    return event;
  }

  @EventPattern('events', Transport.KAFKA)
  static subscriber(@Payload() data: string, @Ctx() context: MqttContext) {
    Logger.log(`Received message! - ${data} | ${JSON.stringify(context)}`);
  }
}
