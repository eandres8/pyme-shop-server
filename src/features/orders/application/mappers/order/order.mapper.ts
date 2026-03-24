import { Order } from 'src/features/orders/domain/entities';
import { OrderStatus } from 'src/features/orders/domain/types';
import { OrderItem } from 'src/features/orders/domain/value-objects';
import { OrderPgModel } from 'src/features/orders/infrastructure/models';

export class OrderMapper {
  static toPersistence(order: Order) {
    return {
      id: order.id,
      total: order.total,
      status: OrderStatus[order.status],
      items: order.getItems().map((item) => item.toPrimitives()),
      user: {
        id: order.userId,
      },
    };
  }

  static toDomain(data: OrderPgModel): Order {
    const items = data.orderItems.map((item) => OrderItem.fromJson(item));

    const order = Order.fromJson({
      id: data.id,
      total: data.total,
      status: data.status,
      userId: data.user.id,
    }).addItems(items);

    return order;
  }
}
