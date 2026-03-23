import { Test, TestingModule } from '@nestjs/testing';

import { PaymentPgRepository } from './payment-pg.repository';

describe('PaymentPgRepository', () => {
  let service: PaymentPgRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentPgRepository],
    }).compile();

    service = module.get<PaymentPgRepository>(PaymentPgRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
