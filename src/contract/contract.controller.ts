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
import { ContractService } from './contract.service';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { CreateContractDTO } from './dto/create-contract.dto';
import { UpdateContractDTO } from './dto/update-contract.dto';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import HTTP_MESSAGES from 'src/common/httpMessages';

@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: HTTP_MESSAGES.CONTRACT_CREATE_201_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.CONTRACT_CREATE_500_PT,
  })
  generateContract(@Body() contractData: CreateContractDTO) {
    return this.contractService.generateContract(contractData);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.CONTRACTS_FETCH_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.CONTRACTS_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.CONTRACTS_FETCH_500_PT,
  })
  fetchContracts() {
    return this.contractService.fetchContracts();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.CONTRACT_FETCH_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.CONTRACT_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.CONTRACT_FETCH_500_PT,
  })
  @ApiParam({
    type: 'string',
    name: 'id',
    description: 'Contract ID.',
    required: true,
    example: 'f3428b82-1c91-40b4-99b0-ce44a349360b',
  })
  fetchContract(@Param() { id }: { id: string }) {
    return this.contractService.fetchContract(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.CONTRACT_UPDATE_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.CONTRACT_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.CONTRACT_UPDATE_500_PT,
  })
  @ApiParam({
    type: 'string',
    name: 'id',
    description: 'Contract ID.',
    required: true,
    example: 'f3428b82-1c91-40b4-99b0-ce44a349360b',
  })
  updateContract(
    @Param() { id }: { id: string },
    @Body() updatedData: UpdateContractDTO,
  ) {
    return this.contractService.updateContract(id, updatedData);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.CONTRACT_DELETE_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.CONTRACT_FETCH_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.CONTRACT_DELETE_500_PT,
  })
  @ApiParam({
    type: 'string',
    name: 'id',
    description: 'Contract ID.',
    required: true,
    example: 'f3428b82-1c91-40b4-99b0-ce44a349360b',
  })
  deleteContract(@Param() { id }: { id: string }) {
    return this.contractService.deleteContract(id);
  }
}
