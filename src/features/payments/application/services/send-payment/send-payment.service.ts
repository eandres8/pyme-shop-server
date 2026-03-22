import { Injectable } from '@nestjs/common';

import { PaymentRepository } from 'src/features/payments/infrastructure/repositories';
import { SendPaymentDto } from '../../dtos';
import { PaymentGateway } from 'src/features/payments/infrastructure/gateways';

@Injectable()
export class SendPayment {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentGateway: PaymentGateway,
  ) {}

  execute(sendPaymentDto: SendPaymentDto) {
    console.log({ sendPaymentDto });
  }
}
