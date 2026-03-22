import { OrderStatus } from './order-status.type';

export type TOrder = {
  readonly id: string;
  readonly status: OrderStatus;
  readonly total: number;
  readonly items: TOrderItem[];
};

export type TOrderItem = {
  readonly productId: string;
  readonly quantity: number;
  readonly price: number;
};
