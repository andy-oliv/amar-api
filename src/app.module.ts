import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserManagementModule } from './user-management/user-management.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClientModule } from './client/client.module';
import { ContractModule } from './contract/contract.module';
import { EventModule } from './event/event.module';
import { ChildModule } from './child/child.module';
import { ExtraServiceModule } from './extra-service/extra-service.module';
import { ContractServiceModule } from './contract-service/contract-service.module';
import { ExpenseCategoryModule } from './expense-category/expense-category.module';
import { RevenueCategoryModule } from './revenue-category/revenue-category.module';
import { FinancialRecordModule } from './financial-record/financial-record.module';
import { FiltersModule } from './filters/filters.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //global env variables
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]), // max 10 request per endpoint. ttl in miliseconds
    //Pino as a global logger
    LoggerModule.forRoot({
      pinoHttp: {
        redact: ['id', 'password'], //redacted information in logs
        level: 'debug',
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              level: 'debug',
              options: { colorize: true },
            },
            {
              target: '@logtail/pino',
              level: 'debug',
              options: { sourceToken: process.env.BETTERSTACK_TOKEN },
            },
          ],
          options: {
            colorize: true,
          },
        },
      },
    }),
    UserModule,
    AuthModule,
    UserManagementModule,
    AuthModule,
    PrismaModule,
    ClientModule,
    ContractModule,
    EventModule,
    ChildModule,
    ExtraServiceModule,
    ContractServiceModule,
    ExpenseCategoryModule,
    RevenueCategoryModule,
    FinancialRecordModule,
    FiltersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD, //ThrottlerGuard as global guard for rate limiting
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
