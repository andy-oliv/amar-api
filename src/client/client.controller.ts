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
import { ClientService } from './client.service';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { CreateClientDTO } from './dto/createClient-dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import HTTP_MESSAGES from 'src/common/httpMessages';
import VALIDATION_MESSAGES from 'src/common/validationMessages';
import { UpdateClientDTO } from './dto/updateClient-dto';

@ApiTags('Client')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UseGuards(AuthGuard)
  @HttpCode(201)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.CLIENT_CREATE_201_PT,
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
    description: HTTP_MESSAGES.CLIENT_CREATE_500_PT,
  })
  @Post()
  create(@Body() client: CreateClientDTO) {
    return this.clientService.createClient(client);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.CLIENTS_FETCH_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.CLIENTS_FETCH_404_PT,
  })
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.CLIENT_FETCH_200_PT,
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
    description: HTTP_MESSAGES.CLIENT_FETCH_404_PT,
  })
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Client id.',
    example: '4ee44827-98f9-4898-8e78-9487d89925b9',
  })
  findOne(@Param() { id }: { id: string }) {
    return this.clientService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.CLIENT_UPDATE_200_PT,
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
    description: HTTP_MESSAGES.CLIENT_FETCH_404_PT,
  })
  @ApiResponse({
    status: 409,
    description: HTTP_MESSAGES.EMAIL_409_PT,
  })
  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Client id.',
    example: '4ee44827-98f9-4898-8e78-9487d89925b9',
  })
  updateClient(
    @Param() { id }: { id: string },
    @Body() updatedData: UpdateClientDTO,
  ) {
    return this.clientService.updateClient(id, updatedData);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.CLIENT_DELETE_200_PT,
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
    description: HTTP_MESSAGES.CLIENT_FETCH_404_PT,
  })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Client id.',
    example: '4ee44827-98f9-4898-8e78-9487d89925b9',
  })
  deleteClient(@Param() { id }: { id: string }) {
    return this.clientService.deleteClient(id);
  }
}
