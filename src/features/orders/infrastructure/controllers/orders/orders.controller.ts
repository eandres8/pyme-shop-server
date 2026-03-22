import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateOrderDto } from 'src/features/orders/application/dtos';
import {
  CreateOrder,
  ListUserOrders,
} from 'src/features/orders/application/services';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrder: CreateOrder,
    private readonly listUserOrders: ListUserOrders,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.createOrder.execute(createOrderDto);
  }

  @Get()
  findAll() {
    return this.listUserOrders.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return [id];
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: unknown) {
    return [id, updateOrderDto];
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return [id];
  }
}
