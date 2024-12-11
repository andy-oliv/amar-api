import { Test, TestingModule } from '@nestjs/testing';
import { RevenueCategoryService } from './revenue-category.service';

describe('RevenueCategoryService', () => {
  let service: RevenueCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevenueCategoryService],
    }).compile();

    service = module.get<RevenueCategoryService>(RevenueCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
