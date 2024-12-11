import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger)); //Pino configuration
  app.useGlobalPipes(new ValidationPipe()); //class-validator and class-transformer configuration
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    '/logo.png',
    express.static(join(__dirname, '..', 'src', 'assets', 'logo.png')),
  );
  app.use(
    '/favicon.ico',
    express.static(join(__dirname, '..', 'src', 'assets', 'favicon.ico')),
  );

  const config = new DocumentBuilder()
    .setTitle('Amar Infâncias API')
    .setDescription(
      "RESTful API for managing Amar Infâncias' data and processes.",
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  const swaggerOptions = {
    customSiteTitle: 'Amar Infâncias API Docs',
    customfavIcon: '/favicon.ico',
    customCss: `
      .swagger-ui .topbar { background-color: #5951a2; }
      .swagger-ui .topbar .topbar-wrapper::before {
        content: '';
        background-image: url('/logo.png'); 
        background-repeat: no-repeat;
        background-size: contain;
        height: 50px; 
        width: 150px;
        display: inline-block;
        margin-right: 10px;
      }
    `,
  };

  SwaggerModule.setup('api', app, documentFactory, swaggerOptions);

  await app.listen(3000);
}
bootstrap();
