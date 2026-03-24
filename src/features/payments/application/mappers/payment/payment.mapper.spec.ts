import { Payment } from 'src/features/payments/domain/entities';
import { PaymentPgModel } from 'src/features/payments/infrastructure/models';
import { PaymentMapper } from './payment.mapper';
import { PaymentStatus } from 'src/features/payments/domain/types';

describe('PaymentMapper', () => {
  const payment = Payment.fromJson({
    id: 'pay1',
    amount: 200,
    orderId: 'o1',
    status: PaymentStatus.PENDING,
  });

  const paymentPgModel: PaymentPgModel = {
    id: 'pay1',
    amount: 200,
    order: { id: 'o1' } as any,
    status: PaymentStatus.PENDING,
  } as any;

  it('toPersistence should convert Payment to persistence format', () => {
    const result = PaymentMapper.toPersistence(payment);

    expect(result).toEqual({
      id: 'pay1',
      amount: 200,
      status: PaymentStatus.PENDING,
      order: { id: 'o1' },
    });
  });

  it('toDomain should convert PaymentPgModel to Payment', () => {
    const result = PaymentMapper.toDomain(paymentPgModel);

    expect(result.id).toBe('pay1');
    expect(result.amount).toBe(200);
    expect(result.orderId).toBe('o1');
    expect(result.status).toBe(PaymentStatus.PENDING);
  });
});
