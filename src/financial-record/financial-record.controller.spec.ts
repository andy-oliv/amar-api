import { Test, TestingModule } from '@nestjs/testing';
import { FinancialRecordController } from './financial-record.controller';

describe('FinancialRecordController', () => {
  let controller: FinancialRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialRecordController],
    }).compile();

    controller = module.get<FinancialRecordController>(FinancialRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
