import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

import { OrderStatus } from '../../domain/types';
import { OrderItemPgModel } from './order-item-pg.model';
import { PaymentPgModel } from 'src/features/payments/infrastructure/models';

@Entity({ schema: 'store', name: 'orders' })
export class OrderPgModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total: number;

  @OneToMany(() => OrderItemPgModel, (orderItem) => orderItem.order, {
    cascade: true,
  })
  orderItems: OrderItemPgModel[];

  @OneToMany(() => OrderItemPgModel, (orderItem) => orderItem.order, {
    cascade: true,
  })
  payments: PaymentPgModel[];
}
