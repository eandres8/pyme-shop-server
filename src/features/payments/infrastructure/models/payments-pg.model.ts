import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderPgModel } from 'src/features/orders/infrastructure/models';
import { PaymentStatus } from '../../domain/types';

@Entity({ schema: 'billing', name: 'payments' })
export class PaymentPgModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  status: PaymentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => OrderPgModel, (order) => order.payments)
  order: OrderPgModel;
}
