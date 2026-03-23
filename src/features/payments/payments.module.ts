import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentsController } from './infrastructure/controllers';
import { PaymentPgModel } from './infrastructure/models';
import { SendPayment } from './application/services/send-payment/send-payment.service';
import { PaymentPgRepository } from './infrastructure/repositories/payment-pg.repository';
import { PaymentRepository } from './infrastructure/repositories/payment.repository';
import { OrderPgModel } from '../orders/infrastructure/models';
import { PaymentGateway, WompiGateway } from './infrastructure/gateways';
import { WebhookResponsePayment } from './application/services/webhook-response-payment/webhook-response-payment.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentPgModel, OrderPgModel]),
    AuthModule,
  ],
  controllers: [PaymentsController],
  providers: [
    SendPayment,
    WebhookResponsePayment,
    // Adapters
    {
      provide: PaymentRepository,
      useClass: PaymentPgRepository,
    },
    {
      provide: PaymentGateway,
      useClass: WompiGateway,
    },
  ],
})
export class PaymentsModule {}
