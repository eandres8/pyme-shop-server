import { OrderStatus } from '../types';
import { TOrder, TOrderItem } from '../types/order.type';
import { OrderItem } from '../value-objects';

export class Order {
  private constructor(
    readonly id: string,
    readonly status: OrderStatus,
    readonly total: number,
    readonly userId: string,
    private readonly items: OrderItem[] = [],
  ) {}

  static fromJson(data: Partial<TOrder>): Order {
    return new Order(
      data?.id || '',
      data?.status ? OrderStatus[data.status] : OrderStatus.PENDING,
      Number(data.total),
      data?.userId || '',
    );
  }

  static create(id: string, uid: string): Order {
    return new Order(id, OrderStatus.PENDING, 0, uid);
  }

  copyWith(data: Partial<TOrder>) {
    return new Order(
      data?.id ?? this.id,
      data?.status ?? this.status,
      Number(data?.total ?? this.total),
      data?.userId || this.userId,
      data?.items?.map((item) => OrderItem.fromJson(item)) ?? this.getItems(),
    );
  }

  addItems(items: TOrderItem[]) {
    const listItems = items.map((item) => OrderItem.fromJson(item));

    return this.copyWith({
      items: [...this.items, ...listItems],
    }).recalculateTotal();
  }

  private recalculateTotal() {
    const total = this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);

    return this.copyWith({
      total,
    });
  }

  getItems() {
    return [...this.items];
  }
}
