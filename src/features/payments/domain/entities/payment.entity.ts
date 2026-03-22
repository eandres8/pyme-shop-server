/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { PaymentStatus, TPayment } from '../types';

export class Payment {
  private constructor(
    readonly id: string,
    readonly orderId: string,
    readonly amount: number,
    readonly status: PaymentStatus,
  ) {}

  static fromJson(data: TPayment) {
    return new Payment(
      data.id,
      data.orderId,
      Number(data.amount),
      PaymentStatus[data.status] || PaymentStatus.PENDING,
    );
  }

  copyWith(data: Partial<TPayment>) {
    return new Payment(
      data.id || this.id,
      data.orderId || this.orderId,
      data?.amount ? Number(data?.amount) : this.amount,
      data.status ? PaymentStatus[data.status] : this.status,
    );
  }

  failed() {
    return this.copyWith({ status: PaymentStatus.FAILED });
  }

  complete() {
    return this.copyWith({ status: PaymentStatus.PAID });
  }
}
