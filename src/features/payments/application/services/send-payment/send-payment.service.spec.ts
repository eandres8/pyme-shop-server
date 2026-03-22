import { Test, TestingModule } from '@nestjs/testing';
import { SendPayment } from './send-payment.service';

describe('SendPaymentService', () => {
  let service: SendPayment;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendPayment],
    }).compile();

    service = module.get<SendPayment>(SendPayment);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
