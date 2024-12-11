import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ContractServiceService } from './contract-service.service';
import VALIDATION_MESSAGES from 'src/common/validationMessages';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { addExtraServiceDTO } from './dto/add-extraService.dto';
import * as dayjs from 'dayjs';

@Controller('contract-service')
export class ContractServiceController {
  constructor(
    private readonly logger: Logger,
    private readonly contractServiceService: ContractServiceService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  addExtraService(@Body() data: addExtraServiceDTO) {
    return this.contractServiceService.addExtraService(data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteExtraService(@Param() { id }: { id: string }) {
    const parsedId: number = parseInt(id);
    if (Number.isNaN(parsedId)) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID, { error: parsedId });
      throw new BadRequestException({
        message: VALIDATION_MESSAGES.ID_INVALID_PT,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }

    return this.contractServiceService.removeExtraService(parsedId);
  }
}
