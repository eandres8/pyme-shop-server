import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './infrastructure/controllers';
import { CreateOrder } from './application/services';
import {
  OrdersPgRepository,
  OrdersRepository,
} from './infrastructure/repositories';
import { OrderItemPgModel, OrderPgModel } from './infrastructure/models';
import {
  ProductsPgRepository,
  ProductsRepository,
} from '../products/infrastructure/repositories';
import {
  ProductImagePgModel,
  ProductPgModel,
} from '../products/infrastructure/models';
import { ListUserOrders } from './application/services/list-user-orders/list-user-orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderPgModel,
      OrderItemPgModel,
      ProductPgModel,
      ProductImagePgModel,
    ]),
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
