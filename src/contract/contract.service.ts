import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import HTTP_MESSAGES from 'src/common/httpMessages';
import VALIDATION_MESSAGES from 'src/common/validationMessages';
import { Contract } from 'src/interfaces/Contract';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidV4, validate as uuidValidate } from 'uuid';
import * as dayjs from 'dayjs';

@Injectable()
export class ContractService {
  constructor(
    private readonly logger: Logger,
    private readonly PrismaService: PrismaService,
  ) {}

  async generateContract(
    contractData: Contract,
  ): Promise<{ message: string; data: Contract }> {
    const id: string = uuidV4();
    try {
      const newContract: Contract = await this.PrismaService.contract.create({
        data: {
          id,
          contractUrl: contractData.contractUrl,
          clientId: contractData.clientId,
          eventId: contractData.eventId,
          isSigned: contractData.isSigned,
          package: contractData.package,
          value: contractData.value,
          status: contractData.status,
          date: dayjs(contractData.date).format('DD/MM/YYYY'),
          paymentMethod: contractData.paymentMethod,
          paymentDueDate: contractData.paymentDueDate,
          splitPayment: contractData.splitPayment,
          observations: contractData.observations,
        },
      });

      return {
        message: HTTP_MESSAGES.CONTRACT_CREATE_201_PT,
        data: newContract,
      };
    } catch (error) {
      if (error.code === 'P2003' && error.meta.field_name === 'eventId') {
        this.logger.error(HTTP_MESSAGES.EVENT_FETCH_404);
        throw new BadRequestException({
          message: HTTP_MESSAGES.EVENT_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.debug(error);
      this.logger.error(HTTP_MESSAGES.CONTRACT_CREATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.CONTRACT_CREATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async fetchContracts(): Promise<{ message: string; data: Contract[] }> {
    try {
      const contractList: Contract[] =
        await this.PrismaService.contract.findMany();

      if (contractList.length === 0) {
        throw new NotFoundException('NOT FOUND');
      }

      return {
        message: HTTP_MESSAGES.CONTRACTS_FETCH_200_PT,
        data: contractList,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.CONTRACTS_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.CONTRACTS_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.CONTRACTS_FETCH_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.CONTRACTS_FETCH_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async fetchContract(
    id: string,
  ): Promise<{ message: string; data: Contract }> {
    const validateId: boolean = uuidValidate(id);

    if (!validateId) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID_PT);
    }

    try {
      const contract: Contract = await this.PrismaService.contract.findFirst({
        where: {
          id,
        },
        include: {
          client: {
            select: {
              id: true,
              name: true,
              email: true,
              instagram: true,
              children: true,
            },
          },
          event: {
            select: {
              id: true,
              name: true,
              type: true,
              location: true,
              date: true,
              hour: true,
              duration: true,
              observations: true,
            },
          },
          contractService: {
            select: {
              id: true,
              extraService: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                },
              },
            },
          },
          records: true,
        },
      });

      if (contract === null) {
        throw new NotFoundException('NOT FOUND');
      }

      return {
        message: HTTP_MESSAGES.CONTRACT_FETCH_200_PT,
        data: contract,
      };
    } catch (error) {
      if (error.status === 404) {
        this.logger.error(HTTP_MESSAGES.CONTRACT_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.CONTRACT_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.CONTRACT_FETCH_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.CONTRACT_FETCH_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async updateContract(
    id: string,
    updatedData: Partial<Contract>,
  ): Promise<{ message: string; data: Contract }> {
    const validateId: boolean = uuidValidate(id);

    if (!validateId) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID_PT);
    }

    if (updatedData.date) {
      updatedData.date = dayjs(updatedData.date).format('DD/MM/YYYY');
    }

    try {
      const contract: Contract = await this.PrismaService.contract.update({
        where: {
          id,
        },
        data: updatedData,
      });

      if (contract === null) {
        throw new NotFoundException('NOT FOUND');
      }

      return {
        message: HTTP_MESSAGES.CONTRACT_UPDATE_200_PT,
        data: contract,
      };
    } catch (error) {
      if (error.status === 404 || error.code === 'P2025') {
        this.logger.error(HTTP_MESSAGES.CONTRACT_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.CONTRACT_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.CONTRACT_UPDATE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.CONTRACT_UPDATE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }

  async deleteContract(id: string): Promise<{ message: string }> {
    const validateId: boolean = uuidValidate(id);

    if (!validateId) {
      this.logger.error(VALIDATION_MESSAGES.ID_INVALID_PT);
    }

    try {
      const contract: Contract = await this.PrismaService.contract.delete({
        where: {
          id,
        },
      });

      if (contract === null) {
        throw new NotFoundException('NOT FOUND');
      }

      return {
        message: HTTP_MESSAGES.CONTRACT_DELETE_200_PT,
      };
    } catch (error) {
      if (error.status === 404 || error.code === 'P2025') {
        this.logger.error(HTTP_MESSAGES.CONTRACT_FETCH_404, { error });
        throw new NotFoundException({
          message: HTTP_MESSAGES.CONTRACT_FETCH_404_PT,
          timestamp: dayjs().format('DD/MM/YYYY'),
        });
      }

      this.logger.error(HTTP_MESSAGES.CONTRACT_DELETE_500, { error });
      throw new InternalServerErrorException({
        message: HTTP_MESSAGES.CONTRACT_DELETE_500_PT,
        PIDcode: process.pid,
        timestamp: dayjs().format('DD/MM/YYYY'),
      });
    }
  }
}
