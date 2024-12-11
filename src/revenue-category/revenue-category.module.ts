import { Module } from '@nestjs/common';
import { RevenueCategoryController } from './revenue-category.controller';
import { RevenueCategoryService } from './revenue-category.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [RevenueCategoryController],
  providers: [RevenueCategoryService],
})
export class RevenueCategoryModule {}
