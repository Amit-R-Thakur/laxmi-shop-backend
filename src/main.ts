import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle(process.env.PROJECT_NAME)
    .setDescription(`The ${process.env.PROJECT_NAME} API description`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Important: This *only* sets up validation pipes for HTTP handlers, NOT Websockets. See the notice here: https://docs.nestjs.com/pipes#global-scoped-pipes

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException(Object.values(errors[0].constraints)[0]),
      transform: true,
      whitelist: true, // Do NOT remove whitelist: true. This is a big security risk if it's not there since we pass dtos from the controllers directly into Mongo
      enableDebugMessages: true,
    }),
  );

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
