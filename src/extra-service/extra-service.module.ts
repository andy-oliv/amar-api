import { Module } from '@nestjs/common';
import { ExtraServiceController } from './extra-service.controller';
import { ExtraServiceService } from './extra-service.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ExtraServiceController],
  providers: [ExtraServiceService],
})
export class ExtraServiceModule {}
