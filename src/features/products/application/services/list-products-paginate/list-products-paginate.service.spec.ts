import { Test, TestingModule } from '@nestjs/testing';

import { ListProductsPaginate } from './list-products-paginate.service';

describe('ListProductsPaginate', () => {
  let service: ListProductsPaginate;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListProductsPaginate],
    }).compile();

    service = module.get<ListProductsPaginate>(ListProductsPaginate);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
