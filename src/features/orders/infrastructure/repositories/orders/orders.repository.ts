import { Result } from 'src/data/core';
import { Order } from 'src/features/orders/domain/entities';

export abstract class OrdersRepository {
  abstract createOrder(order: Order): Promise<Result<Order>>;

  abstract listUserOrders(): Promise<Result<Order[]>>;
}
