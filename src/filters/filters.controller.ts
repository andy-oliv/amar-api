import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { FiltersService } from './filters.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { QueryDTO } from './dto/query.dto';
import HTTP_MESSAGES from 'src/common/httpMessages';

@ApiTags('Filters')
@Controller('filters')
export class FiltersController {
  constructor(
    private readonly logger: Logger,
    private readonly filterService: FiltersService,
  ) {}

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.FILTERS_CONTRACTS_200_PT,
  })
  @ApiResponse({
    status: 400,
    description: HTTP_MESSAGES.FILTERS_CONTRACTS_PACKAGE_400_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.FILTERS_500_PT,
  })
  @ApiQuery({
    type: 'string',
    name: 'servicePackage',
    required: false,
    description:
      "Query representing one of the packages that are sold: 'NUVEM', 'CÉU', 'SOL', 'LUA', 'COMETA'.",
  })
  @ApiQuery({
    type: 'string',
    name: 'year',
    required: false,
    description: 'Year in string format with 4 digits.',
  })
  @Get('contracts')
  getContracts(
    @Query()
    { servicePackage, year }: QueryDTO,
  ) {
    if (servicePackage) {
      return this.filterService.getContractsByPackage(servicePackage);
    } else if (year) {
      return this.filterService.getContractsByMonth(year);
    }
    return this.filterService.getAllContracts();
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.FILTERS_CLIENTS_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.FILTERS_500_PT,
  })
  @ApiQuery({
    type: 'boolean',
    name: 'getByCity',
    required: false,
    description:
      'Boolean that informs if the endpoint should direct to the function that fetches clients and filters them.',
  })
  @Get('clients')
  getClients(@Query() { getByCity }: QueryDTO) {
    if (getByCity) {
      return this.filterService.getClientsByCity();
    }
    return this.filterService.countAllClients();
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.FILTERS_FINANCES_200_PT,
  })
  @ApiResponse({
    status: 400,
    description: HTTP_MESSAGES.FILTERS_FINANCES_TYPE_400_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.FILTERS_FINANCES_TYPE_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.FILTERS_500_PT,
  })
  @ApiQuery({
    type: 'string',
    name: 'type',
    required: false,
    description: 'Type of financial record (revenue or expense).',
  })
  @Get('finances')
  getFinancialRecords(@Query() { type }: QueryDTO) {
    return this.filterService.sumAllFinancialRecords(type);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: HTTP_MESSAGES.FILTERS_FINANCES_200_PT,
  })
  @ApiResponse({
    status: 403,
    description: HTTP_MESSAGES.LOGIN_SESSION_403_PT,
  })
  @ApiResponse({
    status: 404,
    description: HTTP_MESSAGES.FILTERS_FINANCES_YEAR_404_PT,
  })
  @ApiResponse({
    status: 500,
    description: HTTP_MESSAGES.FILTERS_500_PT,
  })
  @ApiQuery({
    type: 'number',
    name: 'year',
    required: false,
    description: 'Year from which the API will fetch the data.',
  })
  @Get('finances/revenue')
  getRevenue(@Query() { year }: QueryDTO) {
    if (year) {
      const parsedYear: number = parseInt(year);
      return this.filterService.sumFinancialRecordsMonthly(parsedYear);
    }
    return this.filterService.sumFinancialRecordsYearly();
  }
}
