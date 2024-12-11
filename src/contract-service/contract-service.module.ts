import { Module } from '@nestjs/common';
import { ContractServiceController } from './contract-service.controller';
import { ContractServiceService } from './contract-service.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ContractServiceController],
  providers: [ContractServiceService],
})
export class ContractServiceModule {}
