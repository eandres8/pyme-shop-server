import { Injectable, NotFoundException } from '@nestjs/common';

import { OrdersRepository } from 'src/features/orders/infrastructure/repositories';

@Injectable()
export class ListUserOrders {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute(uid: string) {
    const result = await this.ordersRepository.listUserOrders(uid);

    if (!result.isOk) {
      throw new NotFoundException(result.getError().message);
    }

    return result.getData();
  }
}
