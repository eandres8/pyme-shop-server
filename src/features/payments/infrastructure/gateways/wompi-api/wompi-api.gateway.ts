import { Injectable, Logger } from '@nestjs/common';

import { Result } from 'src/data/core';
import { TPaymentParams, TPaymentResponse } from '../../../domain/types';
import { PaymentGateway } from '../../../domain/ports/payment.gateway';

@Injectable()
export class WompiGateway implements PaymentGateway {
  private readonly logger = new Logger('WompiGateway');

  // eslint-disable-next-line @typescript-eslint/require-await
  async sendPayment(params: TPaymentParams): Promise<Result<TPaymentResponse>> {
    // Wompi normalmente requiere crear transacción con token
    console.log(params);

    return Result.success({
      paymentId: 'wompi_tx_id',
      checkoutUrl: 'https://checkout.wompi.co/...',
    });
  }
}
