import { Injectable } from '@nestjs/common';

import { SendPaymentDto } from '../../dtos';
import {
  PaymentRepository,
  PaymentGateway,
} from 'src/features/payments/domain/ports';

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
