import { Result } from 'src/data/core';
import { Payment } from '../../domain/entities/payment.entity';

export abstract class PaymentRepository {
  abstract createPayment(params: Payment): Promise<Result<Payment>>;
}
