import { Payment } from 'src/features/payments/domain/entities';
import { PaymentPgModel } from 'src/features/payments/infrastructure/models';

export class PaymentMapper {
  static toPersistence(payment: Payment) {
    return {
      id: payment.id,
      amount: payment.amount,
      status: payment.status,
      order: {
        id: payment.orderId,
      },
    };
  }

  static toDomain(data: PaymentPgModel): Payment {
    const payment = Payment.fromJson({
      id: data.id,
      amount: data.amount,
      orderId: data.order.id,
      status: data.status,
    });

    return payment;
  }
}
