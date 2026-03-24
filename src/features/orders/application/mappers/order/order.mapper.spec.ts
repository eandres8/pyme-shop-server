import { OrderMapper } from 'src/features/orders/application/mappers';
import { Order } from 'src/features/orders/domain/entities';
import { OrderStatus } from 'src/features/orders/domain/types';
import { OrderItem } from 'src/features/orders/domain/value-objects';
import { OrderPgModel } from 'src/features/orders/infrastructure/models';

describe('OrderMapper', () => {
  const orderItem = OrderItem.fromJson({
    productId: 'p1',
    quantity: 2,
    price: 50,
  });
  const order = Order.fromJson({
    id: 'o1',
    total: 100,
    status: OrderStatus.PENDING,
    userId: 'u1',
  }).addItems([orderItem]);

  const orderPgModel: OrderPgModel = {
    id: 'o1',
    total: 100,
    status: OrderStatus.PENDING,
    user: { id: 'u1' } as any,
    orderItems: [{ productId: 'p1', quantity: 2, price: 50 } as any],
  } as any;

  it('toPersistence should convert Order to persistence format', () => {
    const result = OrderMapper.toPersistence(order);

    expect(result).toEqual({
      id: 'o1',
      total: 100,
      status: OrderStatus.PENDING,
      items: [{ productId: 'p1', quantity: 2, price: 50 }],
      user: { id: 'u1' },
    });
  });

  it('toDomain should convert OrderPgModel to Order', () => {
    const result = OrderMapper.toDomain(orderPgModel);

    expect(result.id).toBe('o1');
    expect(result.total).toBe(100);
    expect(result.status).toBe(OrderStatus.PENDING);
    expect(result.userId).toBe('u1');
    expect(result.getItems()).toHaveLength(1);
    expect(result.getItems()[0].productId).toBe('p1');
  });
});
