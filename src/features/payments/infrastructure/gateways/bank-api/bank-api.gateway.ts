import { Injectable, Logger } from '@nestjs/common';

import { Result } from 'src/data/core';
import { TPaymentParams, TPaymentResponse } from '../../../domain/types';
import { PaymentGateway } from '../../../domain/ports/payment.gateway';

@Injectable()
export class BankGateway implements PaymentGateway {
  private readonly logger = new Logger('BankGateway');

  async sendPayment(params: TPaymentParams): Promise<Result<TPaymentResponse>> {
    // Bank normalmente requiere crear transacción con token
    console.log(params);

    return Result.success({
      paymentId: 'bank_tx_id',
      checkoutUrl: 'https://checkout.bank.co/...',
    });
  }
}
