import { TOrderItem } from '../types/order.type';

export class OrderItem {
  private constructor(
    readonly productId: string,
    readonly quantity: number,
    readonly price: number,
  ) {}

  static fromJson(data: TOrderItem): OrderItem {
    return new OrderItem(
      data.productId,
      Number(data.quantity),
      Number(data.price),
    );
  }

  getSubtotal(): number {
    return this.quantity * this.price;
  }

  toPrimitives() {
    return {
      productId: this.productId,
      quantity: this.quantity,
      price: this.price,
    };
  }
}
