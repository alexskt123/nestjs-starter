import { NestFactory } from '@nestjs/core';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ConfigType } from './common/type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService<ConfigType, true>>(ConfigService);
  const port = configService.get<string>('PORT');
  const isLocal = configService.get<boolean>('IS_LOCAL');

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, validateCustomDecorators: true }),
  );

  app.setGlobalPrefix('/api/v1', {
    exclude: [{ path: 'health(.*)', method: RequestMethod.GET }],
  });

  // Allow API documentation only for local environment
  if (isLocal) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Example Nestjs Starter Service API')
      .setDescription(`Swagger Doc for Nestjs Starter API implementations`)
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(port);
}
bootstrap();
