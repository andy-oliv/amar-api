import { Test, TestingModule } from '@nestjs/testing';
import { RevenueCategoryController } from './revenue-category.controller';

describe('RevenueCategoryController', () => {
  let controller: RevenueCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevenueCategoryController],
    }).compile();

    controller = module.get<RevenueCategoryController>(RevenueCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
