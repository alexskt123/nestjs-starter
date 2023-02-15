import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import databaseConfig from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useFactory: async (dbConfig: ConfigType<typeof databaseConfig>) => ({
        type: 'postgres',
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.name,
        synchronize: dbConfig.sync, // DO NOT enable this outside of local env
        ssl: dbConfig.isSsl,
        extra: dbConfig.sslExtra,
        autoLoadEntities: true,
        migrationsRun: true,
        migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
        migrationsTableName: 'starter.migrations',
        logging: true,
        cli: {
          // Location of migration should be inside src folder
          // to be compiled into dist/ folder.
          migrationsDir: 'src/migrations',
        },
      }),
      inject: [databaseConfig.KEY],
    }),
  ],
})
export class DatabaseModule {}
