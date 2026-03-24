import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';

import { SendPayment } from './send-payment.service';
import { Payment } from 'src/features/payments/domain/entities';
import { PaymentRepository } from 'src/features/payments/domain/ports';
import { SendPaymentDto } from '../../dtos';

describe('SendPayment', () => {
  let service: SendPayment;
  let paymentRepo: jest.Mocked<PaymentRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendPayment,
        {
          provide: PaymentRepository,
          useValue: {
            createPayment: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SendPayment>(SendPayment);
    paymentRepo = module.get(PaymentRepository);

    jest.clearAllMocks();
  });

  const mockDto = SendPaymentDto.toInstance({ orderId: 'order-1', total: 500 });
  const mockPaymentData = Payment.fromJson({
    id: 'pay-1',
    orderId: 'order-1',
    amount: 500,
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create payment successfully', async () => {
    paymentRepo.createPayment.mockResolvedValue({
      isOk: true,
      getData: () => mockPaymentData,
    } as any);

    const result = await service.execute(mockDto as any);

    expect(SendPaymentDto.toInstance).toHaveBeenCalledWith(mockDto);

    expect(paymentRepo.createPayment).toHaveBeenCalled();
    expect(result).toBe(mockPaymentData);
  });

  it('should return undefined and log error if createPayment fails', async () => {
    const loggerSpy = jest
      .spyOn(Logger.prototype, 'error')
      .mockImplementation();

    paymentRepo.createPayment.mockResolvedValue({
      isOk: false,
      getError: () => new Error('Payment failed'),
    } as any);

    const result = await service.execute(mockDto as any);

    expect(result).toBeUndefined();
    expect(loggerSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});
