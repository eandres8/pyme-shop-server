import { Test, TestingModule } from '@nestjs/testing';
import { CreateProduct } from './create-product.service';

describe('CreateProductService', () => {
  let service: CreateProduct;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateProduct],
    }).compile();

    service = module.get<CreateProduct>(CreateProduct);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
