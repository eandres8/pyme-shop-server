import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateOrderDto } from '../../dtos';
import { Order } from 'src/features/orders/domain/entities';
import { OrderItem } from 'src/features/orders/domain/value-objects';
import { OrdersRepository } from 'src/features/orders/domain/ports';
import { ProductsRepository } from 'src/features/products/domain/ports';

@Injectable()
export class CreateOrder {
  constructor(
    private readonly orderRepo: OrdersRepository,
    private readonly productRepo: ProductsRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  async execute(data: CreateOrderDto, uid: string) {
    const order = Order.create(crypto.randomUUID(), uid);

    if (data.products.length === 0) {
      throw new BadRequestException('Debes seleccionar al menos un producto');
    }

    const productList = await this.productRepo.findByIdList(
      data.products.map(({ productId }) => productId),
    );

    if (!productList.isOk) {
      throw productList.getError();
    }

    const productMap = new Map<string, number>(
      productList.getData().map(({ id, price }) => [id, price]),
    );

    const listItems: OrderItem[] = data.products.map(
      ({ productId, quantity }) =>
        ({
          productId,
          quantity,
          price: productMap.get(productId),
        }) as OrderItem,
    );

    const newOrder = order.addItems(listItems);

    const result = await this.orderRepo.createOrder(newOrder);

    if (!result.isOk) {
      throw new BadRequestException(result.getError().message);
    }

    const orderData = result.getData();

    const eventData = {
      orderId: orderData.id,
      total: orderData.total,
    };

    this.eventEmitter.emit('order.created', eventData);

    return result.getData();
  }
}
