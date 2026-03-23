import { Test, TestingModule } from '@nestjs/testing';

import { ListUserOrders } from './list-user-orders.service';

describe('ListUserOrders', () => {
  let service: ListUserOrders;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListUserOrders],
    }).compile();

    service = module.get<ListUserOrders>(ListUserOrders);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
