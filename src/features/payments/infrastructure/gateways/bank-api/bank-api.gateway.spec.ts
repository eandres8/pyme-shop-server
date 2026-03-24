import { Test, TestingModule } from '@nestjs/testing';

import { BankGateway } from './bank-api.gateway';
import { TPaymentParams } from 'src/features/payments/domain/types';
import { Result } from 'src/data/core';

describe('BankGateway', () => {
  let service: BankGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankGateway],
    }).compile();

    service = module.get<BankGateway>(BankGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should mock response from bank', async () => {
    const mockParams: TPaymentParams = {
      orderId: '',
      amount: 0,
      currency: '',
    };

    const sut = await service.sendPayment(mockParams);

    expect(sut).toBeInstanceOf(Result);
    expect(sut.isOk).toBe(true);
    expect(sut.getData().paymentId).toBe('bank_tx_id');
  });
});
