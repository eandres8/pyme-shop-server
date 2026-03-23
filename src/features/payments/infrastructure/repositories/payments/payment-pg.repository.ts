import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Result, to } from 'src/data/core';
import { OrderPgModel } from 'src/features/orders/infrastructure/models';
import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentPgModel } from '../../models';
import { getErrorMessage } from 'src/data/helpers';
import { PaymentMapper } from '../../../application/mappers/payment.mapper';
import { PaymentRepository } from 'src/features/payments/domain/ports';

@Injectable()
export class PaymentPgRepository implements PaymentRepository {
  private readonly logger = new Logger('PaymentPgRepository');

  constructor(
    @InjectRepository(OrderPgModel)
    private readonly paymentModel: Repository<PaymentPgModel>,
  ) {}

  async createPayment(params: Payment): Promise<Result<Payment>> {
    const data = PaymentMapper.toPersistence(params);

    const paymentModel = this.paymentModel.create({
      amount: data.amount,
      status: data.status,
      order: { id: data.orderId },
    });

    const [newPayment, error] = await to(this.paymentModel.save(paymentModel));

    if (error) {
      const errMessage = getErrorMessage(error);
      this.logger.error(errMessage);
      return Result.failure(new Error(errMessage));
    }

    return Result.success(PaymentMapper.toDomain(newPayment));
  }
}
