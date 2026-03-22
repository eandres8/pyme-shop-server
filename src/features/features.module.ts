import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [ProductsModule, OrdersModule, PaymentsModule],
  exports: [ProductsModule, OrdersModule, PaymentsModule],
})
export class FeaturesModule {}
