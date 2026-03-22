import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

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
  create(@Body() sendPaymentDto: SendPaymentDto) {
    return this.sendPayment.execute(sendPaymentDto);
  }

  @Post('webhook')
  webhook(@Body() sendPaymentDto: WebhookResponseDto) {
    return this.webhookResponsePayment.execute(sendPaymentDto);
  }

  @Get()
  findAll() {
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return [id];
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: unknown) {
    return [id, updatePaymentDto];
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return [id];
  }
}
