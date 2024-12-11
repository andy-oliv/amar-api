import { Module } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [UserManagementService],
  exports: [UserManagementService],
})
export class UserManagementModule {}
