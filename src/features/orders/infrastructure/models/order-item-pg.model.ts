import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrderPgModel } from './order-pg.model';

@Entity({ schema: 'store', name: 'order_items' })
export class OrderItemPgModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  orderId: string;

  @Column()
  productId: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ManyToOne(() => OrderPgModel, (order) => order.orderItems)
  order: OrderPgModel;
}
