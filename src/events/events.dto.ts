import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EventsDto {
  @ApiProperty({
    description: 'message to be published',
  })
  @IsString()
  message: string;
}
