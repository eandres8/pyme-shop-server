import { Test, TestingModule } from '@nestjs/testing';

import { PaymentsController } from './payments.controller';

import {
  SendPaymentDto,
  WebhookResponseDto,
} from 'src/features/payments/application/dtos';
import {
  SendPayment,
  WebhookResponsePayment,
} from 'src/features/payments/application/use-cases';
import { Payment } from 'src/features/payments/domain/entities';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let sendPaymentService: jest.Mocked<SendPayment>;
  let webhookService: jest.Mocked<WebhookResponsePayment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: SendPayment,
          useValue: { execute: jest.fn() },
        },
        {
          provide: WebhookResponsePayment,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    sendPaymentService = module.get(SendPayment);
    webhookService = module.get(WebhookResponsePayment);

    jest.clearAllMocks();
  });

  const mockSendPaymentDto: SendPaymentDto = {
    orderId: 'o1',
    total: 100,
  } as SendPaymentDto;

  const mockWebhookDto: WebhookResponseDto = {
    paymentId: 'o1',
    status: 'SUCCESS',
  };

  const mockSendResult: Payment = {
    id: 'pay-1',
    orderId: 'o1',
    amount: 100,
  } as Payment;

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call SendPayment service and return result', async () => {
      sendPaymentService.execute.mockResolvedValue(mockSendResult);

      const result = await controller.create(mockSendPaymentDto);

      expect(sendPaymentService.execute).toHaveBeenCalledWith(
        mockSendPaymentDto,
      );
      expect(result).toBe(mockSendResult);
    });
  });

  describe('webhook', () => {
    it('should call WebhookResponsePayment service and return result', async () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      webhookService.execute.mockImplementation(async () => null);

      controller.webhook(mockWebhookDto);

      expect(webhookService.execute).toHaveBeenCalledWith(mockWebhookDto);
    });
  });
});
