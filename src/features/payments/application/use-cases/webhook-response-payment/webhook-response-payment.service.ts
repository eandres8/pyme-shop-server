import { Injectable } from '@nestjs/common';

import { WebhookResponseDto } from '../../dtos';

@Injectable()
export class WebhookResponsePayment {
  execute(sendPaymentDto: WebhookResponseDto) {
    // TODO: update paymentId
    // TODO: notify update orderId
    console.log({ sendPaymentDto });
  }
}
