import { Test, TestingModule } from '@nestjs/testing';
import { ContractServiceController } from './contract-service.controller';

describe('ContractServiceController', () => {
  let controller: ContractServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractServiceController],
    }).compile();

    controller = module.get<ContractServiceController>(ContractServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
