import { Test, TestingModule } from '@nestjs/testing';
import { ContractServiceService } from './contract-service.service';

describe('ContractServiceService', () => {
  let service: ContractServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractServiceService],
    }).compile();

    service = module.get<ContractServiceService>(ContractServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
