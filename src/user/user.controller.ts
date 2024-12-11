import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user-dto';
import VALIDATION_MESSAGES from 'src/common/validationMessages';
import HTTP_MESSAGES from 'src/common/httpMessages';
import { UpdateUserDTO } from './dto/update-user-dto';
import { UserManagementService } from 'src/user-management/user-management.service';
import { UpdatePasswordDTO } from './dto/update-password';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userManagementService: UserManagementService,
  ) {}

  @Post('register')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: `{ message: ${HTTP_MESSAGES.USER_201_PT}, data: userData }`,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 409,
    description: HTTP_MESSAGES.EMAIL_409_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.USER_CREATE_500_PT,
  })
  @ApiResponse({
    status: 503,
    description: HTTP_MESSAGES.ENVIRONMENT_VARIABLES_500_PT,
  })
  createUser(@Body() userInfo: CreateUserDTO) {
    return this.userService.createUser(userInfo);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description:
      '{ message: lista de usuários encontrados no sistema, data: userList }',
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.USERS_404_PT,
  })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':userId')
  @ApiResponse({
    status: 200,
    description: `{ message: ${HTTP_MESSAGES.USER_FETCH_200_PT}, data: userData }`,
  })
  @ApiResponse({
    status: 400,
    description: VALIDATION_MESSAGES.ID_INVALID_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.USER_404_PT,
  })
  @ApiParam({
    name: 'userId',
    description: 'ID of the user that is going to be fetched.',
    example: '513bee91-a283-4674-a71c-ce74bb5e2daf',
  })
  findOne(@Param() { userId }: { userId: string }) {
    return this.userService.findOne(userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: `{ message: ${HTTP_MESSAGES.USER_UPDATE_200_PT}, data: updatedUserData }`,
  })
  @ApiResponse({
    status: 400,
    description: VALIDATION_MESSAGES.ID_INVALID_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.USER_404_PT,
  })
  @ApiResponse({
    status: 409,
    description: HTTP_MESSAGES.EMAIL_409_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.USER_UPDATE_500_PT,
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the user that is going to be updated.',
    example: '513bee91-a283-4674-a71c-ce74bb5e2daf',
  })
  updateUser(@Param() { id }: { id: string }, @Body() user: UpdateUserDTO) {
    return this.userService.updateUser({
      id: id,
      name: user.name,
      email: user.email,
      pictureUrl: user.pictureUrl,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':userId')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.USER_DELETE_200_PT,
  })
  @ApiResponse({
    status: 400,
    description: VALIDATION_MESSAGES.ID_INVALID_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.USER_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.USER_DELETE_500_PT,
  })
  @ApiParam({
    name: 'userId',
    description: 'ID of the user that is going to be deleted.',
    example: '513bee91-a283-4674-a71c-ce74bb5e2daf',
  })
  deleteUser(@Param() { userId }: { userId: string }) {
    return this.userService.deleteUser(userId);
  }

  @ApiResponse({
    status: 200,
    description:
      'Se o endereço de email enviado fizer parte do nosso sistema, um email com mais informações chegará. Verifique a caixa de entrada e a caixa de spam.',
  })
  @ApiResponse({
    status: 400,
    description: VALIDATION_MESSAGES.ID_INVALID_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.USER_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.SENDGRID_500_PT,
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the user whose password is going to be updated.',
    example: '513bee91-a283-4674-a71c-ce74bb5e2daf',
  })
  @Post('forgot')
  async passwordReset(@Body() { email }: { email: string }) {
    return await this.userManagementService.sendEmailToken(email);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/password')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.PASSWORD_UPDATE_200_PT,
  })
  @ApiResponse({
    status: 400,
    description: VALIDATION_MESSAGES.ID_INVALID_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.USER_404_PT,
  })
  @ApiResponse({
    status: 409,
    description: HTTP_MESSAGES.PASSWORD_UPDATE_409_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.USER_UPDATE_500_PT,
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the user whose password is going to be updated.',
    example: '513bee91-a283-4674-a71c-ce74bb5e2daf',
  })
  updatePassword(
    @Param() { id }: { id: string },
    @Body() { password }: UpdatePasswordDTO,
  ) {
    return this.userService.updatePassword(id, password);
  }
}
