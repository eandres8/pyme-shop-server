import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, OrdersModule, PaymentsModule, AuthModule],
  exports: [ProductsModule, OrdersModule, PaymentsModule, AuthModule],
})
export class FeaturesModule {}
