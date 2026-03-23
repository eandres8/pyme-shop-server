import { Test, TestingModule } from '@nestjs/testing';
import { SearchProducts } from './search-products.service';

describe('SearchProductsService', () => {
  let service: SearchProducts;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchProducts],
    }).compile();

    service = module.get<SearchProducts>(SearchProducts);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
