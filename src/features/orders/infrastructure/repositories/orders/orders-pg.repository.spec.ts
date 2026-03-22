import { Test, TestingModule } from '@nestjs/testing';
import { OrderPgRepositoryService } from './orders-pg.repository';

describe('OrderPgRepositoryService', () => {
  let service: OrderPgRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderPgRepositoryService],
    }).compile();

    service = module.get<OrderPgRepositoryService>(OrderPgRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
