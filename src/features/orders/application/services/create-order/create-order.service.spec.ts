import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrder } from './create-order.service';

describe('CreateOrderService', () => {
  let service: CreateOrder;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateOrder],
    }).compile();

    service = module.get<CreateOrder>(CreateOrder);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
