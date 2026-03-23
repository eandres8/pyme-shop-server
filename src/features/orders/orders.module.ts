import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './infrastructure/controllers';
import { CreateOrder } from './application/use-cases';
import { OrdersPgRepository } from './infrastructure/repositories';
import { OrderItemPgModel, OrderPgModel } from './infrastructure/models';
import { ProductsPgRepository } from '../products/infrastructure/repositories';
import {
  ProductImagePgModel,
  ProductPgModel,
} from '../products/infrastructure/models';
import { ListUserOrders } from './application/use-cases/list-user-orders/list-user-orders.service';
import { AuthModule } from '../auth/auth.module';
import { ProductsRepository } from '../products/domain/ports';
import { OrdersRepository } from './domain/ports';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderPgModel,
      OrderItemPgModel,
      ProductPgModel,
      ProductImagePgModel,
    ]),
    AuthModule,
  ],
  controllers: [OrdersController],
  providers: [
    CreateOrder,
    // Adapters
    { provide: OrdersRepository, useClass: OrdersPgRepository },
    {
      provide: ProductsRepository,
      useClass: ProductsPgRepository,
    },
    ListUserOrders,
  ],
})
export class OrdersModule {}
