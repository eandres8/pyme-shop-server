import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentsController } from './infrastructure/controllers';
import { PaymentPgModel } from './infrastructure/models';
import { PaymentPgRepository } from './infrastructure/repositories/payments/payment-pg.repository';
import { OrderPgModel } from '../orders/infrastructure/models';
import { WompiGateway } from './infrastructure/gateways';
import { AuthModule } from '../auth/auth.module';
import { PaymentGateway, PaymentRepository } from './domain/ports';
import { SendPayment, WebhookResponsePayment } from './application/use-cases';

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
