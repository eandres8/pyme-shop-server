import { Result } from 'src/data/core';
import { TPaymentParams, TPaymentResponse } from '../../domain/types';

export abstract class PaymentGateway {
  abstract sendPayment(
    params: TPaymentParams,
  ): Promise<Result<TPaymentResponse>>;
}
