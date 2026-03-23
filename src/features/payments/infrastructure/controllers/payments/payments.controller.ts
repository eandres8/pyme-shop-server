import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {
  SendPayment,
  WebhookResponsePayment,
} from 'src/features/payments/application/services';
import {
  SendPaymentDto,
  WebhookResponseDto,
} from 'src/features/payments/application/dtos';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly sendPayment: SendPayment,
    private readonly webhookResponsePayment: WebhookResponsePayment,
  ) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() sendPaymentDto: SendPaymentDto) {
    return this.sendPayment.execute(sendPaymentDto);
  }

  @Post('webhook')
  webhook(@Body() sendPaymentDto: WebhookResponseDto) {
    return this.webhookResponsePayment.execute(sendPaymentDto);
  }
}
