import { Test, TestingModule } from '@nestjs/testing';
import { ExtraServiceController } from './extra-service.controller';

describe('ExtraServiceController', () => {
  let controller: ExtraServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtraServiceController],
    }).compile();

    controller = module.get<ExtraServiceController>(ExtraServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
