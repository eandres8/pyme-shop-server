import { Test, TestingModule } from '@nestjs/testing';

import { ProductsPgRepository } from './products-pg.repository';

describe('ProductsPgRepository', () => {
  let service: ProductsPgRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsPgRepository],
    }).compile();

    service = module.get<ProductsPgRepository>(ProductsPgRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
