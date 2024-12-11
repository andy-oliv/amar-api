import { Module } from '@nestjs/common';
import { FinancialRecordController } from './financial-record.controller';
import { FinancialRecordService } from './financial-record.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [FinancialRecordController],
  providers: [FinancialRecordService],
})
export class FinancialRecordModule {}
