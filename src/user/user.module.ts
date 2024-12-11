import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserManagementModule } from 'src/user-management/user-management.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, UserManagementModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
