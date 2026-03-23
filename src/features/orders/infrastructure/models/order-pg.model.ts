import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderStatus } from '../../domain/types';
import { OrderItemPgModel } from './order-item-pg.model';
import { PaymentPgModel } from 'src/features/payments/infrastructure/models';
import { UserPgModel } from 'src/features/auth/infrastructure/models';

@Entity({ schema: 'store', name: 'orders' })
export class OrderPgModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // =============
  // Relations
  // =============

  @ManyToOne(() => UserPgModel, (user) => user.orders)
  user: UserPgModel;

  @OneToMany(() => OrderItemPgModel, (orderItem) => orderItem.order, {
    cascade: true,
  })
  orderItems: OrderItemPgModel[];

  @OneToMany(() => PaymentPgModel, (payment) => payment.order, {
    cascade: true,
  })
  payments: PaymentPgModel[];
}
