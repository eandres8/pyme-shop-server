import { Test, TestingModule } from '@nestjs/testing';

import { WebhookResponsePayment } from './webhook-response-payment.service';

describe('WebhookResponsePaymentService', () => {
  let service: WebhookResponsePayment;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebhookResponsePayment],
    }).compile();

    service = module.get<WebhookResponsePayment>(WebhookResponsePayment);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
