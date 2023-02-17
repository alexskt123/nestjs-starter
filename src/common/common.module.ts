import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Agent } from 'https';
import * as path from 'path';
import commonConfig from 'src/common/common.config';
import { DatabaseModule } from 'src/database/database.module';
import Joi from 'joi';
import { KafkaModule } from 'src/kafka/kafka.module';
import kafkaConfig from 'src/kafka/kafka.config';

@Global()
@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new Agent({ rejectUnauthorized: false }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [commonConfig, kafkaConfig],
      expandVariables: true,
      validationSchema: Joi.object({
        IS_LOCAL: Joi.boolean(),
        PORT: Joi.number().required(),
        SEED: Joi.boolean().optional(),
        KAFKA_BROKER_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      buildSchemaOptions: {
        dateScalarMode: 'isoDate',
      },
    }),
    KafkaModule,
  ],
})
export class CommonModule {}
