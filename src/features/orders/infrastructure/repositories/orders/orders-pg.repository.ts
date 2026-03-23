import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrdersRepository } from '../../../domain/ports/orders.repository';
import { Result, to } from 'src/data/core';
import { Order } from 'src/features/orders/domain/entities';
import { OrderItemPgModel, OrderPgModel } from '../../models';
import { OrderMapper } from 'src/features/orders/application/mappers/order.mapper';
import { getErrorMessage } from 'src/data/helpers';

@Injectable()
export class OrdersPgRepository implements OrdersRepository {
  private readonly logger = new Logger('OrdersPgRepository');

  constructor(
    @InjectRepository(OrderPgModel)
    private readonly orderModel: Repository<OrderPgModel>,

    @InjectRepository(OrderItemPgModel)
    private readonly orderItemModel: Repository<OrderItemPgModel>,
  ) {}

  async createOrder(order: Order): Promise<Result<Order>> {
    const data = OrderMapper.toPersistence(order);

    const orderModel = this.orderModel.create({
      id: data.id,
      status: data.status,
      total: data.total,
      user: {
        id: data.user.id,
      },
      orderItems: data.items.map((item) => {
        return this.orderItemModel.create({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        });
      }),
    });

    const [newOrder, error] = await to(this.orderModel.save(orderModel));

    if (error) {
      const errMessage = getErrorMessage(error);
      this.logger.error(errMessage);
      return Result.failure(new Error(errMessage));
    }

    return Result.success(OrderMapper.toDomain(newOrder));
  }

  async listUserOrders(uid: string): Promise<Result<Order[]>> {
    const [orders, error] = await to(
      this.orderModel.find({
        where: { user: { id: uid } },
        relations: ['orderItems', 'user'],
      }),
    );

    if (error) {
      const errMessage = getErrorMessage(error);
      this.logger.error(errMessage);
      return Result.failure(error);
    }

    return Result.success(orders.map((order) => OrderMapper.toDomain(order)));
  }
}
