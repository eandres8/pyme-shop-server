import { Controller, Get, Post, Body, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from 'src/features/auth/application/decotarors';
import { User } from 'src/features/auth/domain/entities';
import { CreateOrderDto } from 'src/features/orders/application/dtos';
import {
  CreateOrder,
  ListUserOrders,
} from 'src/features/orders/application/use-cases';

@Controller('orders')
export class OrdersController {
  private readonly logger = new Logger('OrdersController');

  constructor(
    private readonly createOrder: CreateOrder,
    private readonly listUserOrders: ListUserOrders,
  ) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createOrderDto: CreateOrderDto, @GetUser('id') user: User) {
    this.logger.log('[POST] /api/orders', createOrderDto);
    return this.createOrder.execute(createOrderDto, user.id);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: User) {
    this.logger.log('[GET] /api/orders');
    return this.listUserOrders.execute(user.id);
  }
}
