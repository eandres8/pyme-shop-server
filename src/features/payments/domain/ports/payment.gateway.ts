import { Result } from 'src/data/core';
import { TPaymentMerchantResponse, TPaymentParams } from '../../domain/types';
import { CreateTransactionDto } from '../../application/dtos';

export abstract class PaymentGateway {
  abstract sendPayment(
    params: TPaymentParams,
  ): Promise<Result<TPaymentMerchantResponse>>;

  abstract createPaymentTransaction(
    data: CreateTransactionDto,
  ): Promise<Result<TPaymentParams>>;
}
