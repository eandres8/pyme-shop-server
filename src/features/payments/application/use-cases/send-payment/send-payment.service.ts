import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { SendPaymentDto } from '../../dtos';
import { PaymentRepository } from 'src/features/payments/domain/ports';
import { Payment } from 'src/features/payments/domain/entities';

@Injectable()
export class SendPayment {
  private readonly logger = new Logger(SendPayment.name);

  constructor(private readonly paymentRepository: PaymentRepository) {}

  @OnEvent('order.created')
  async execute(sendPaymentDto: SendPaymentDto) {
    const data = SendPaymentDto.toInstance(sendPaymentDto);

    const payment = Payment.fromJson({
      id: crypto.randomUUID(),
      orderId: data.orderId,
      amount: data.total,
    });

    const result = await this.paymentRepository.createPayment(payment);

    if (!result.isOk) {
      this.logger.error(result.getError());
      return;
    }

    return result.getData();
  }
}
