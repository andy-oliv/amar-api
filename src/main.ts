import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger)); //Pino configuration
  app.useGlobalPipes(new ValidationPipe()); //class-validator and class-transformer configuration
  app.use(cookieParser(process.env.COOKIE_SECRET));

  const config = new DocumentBuilder()
    .setTitle('Amar Infâncias API')
    .setDescription("API for Amar Infâncias' admin panel web app.")
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
