import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

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

  @OnEvent('order.created')
  execute(sendPaymentDto: SendPaymentDto) {
    const data = SendPaymentDto.toInstance(sendPaymentDto);
    console.log({ data });
  }
}
