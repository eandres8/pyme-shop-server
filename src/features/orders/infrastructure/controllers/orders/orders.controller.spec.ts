import { Test, TestingModule } from '@nestjs/testing';

import { OrdersController } from './orders.controller';
import { User } from 'src/features/auth/domain/entities';
import { CreateOrderDto } from 'src/features/orders/application/dtos';
import {
  CreateOrder,
  ListUserOrders,
} from 'src/features/orders/application/use-cases';
import { Order } from 'src/features/orders/domain/entities';

describe('OrdersController', () => {
  let controller: OrdersController;
  let createOrderService: jest.Mocked<CreateOrder>;
  let listUserOrdersService: jest.Mocked<ListUserOrders>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: CreateOrder,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ListUserOrders,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    createOrderService = module.get(CreateOrder);
    listUserOrdersService = module.get(ListUserOrders);

    jest.clearAllMocks();
  });

  const mockUser = User.fromJson({ id: 'u1', email: 'test@test.com' });
  const mockCreateDto: CreateOrderDto = {
    products: [{ productId: 'p1', quantity: 2 }],
  };
  const mockOrderResult = Order.fromJson({});
  const mockOrdersList = [Order.fromJson({})];

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call CreateOrder service and return result', async () => {
      createOrderService.execute.mockResolvedValue(mockOrderResult);

      const result = await controller.create(mockCreateDto, mockUser);

      expect(createOrderService.execute).toHaveBeenCalledWith(
        mockCreateDto,
        mockUser.id,
      );
      expect(result).toBe(mockOrderResult);
    });
  });

  describe('findAll', () => {
    it('should call ListUserOrders service and return result', async () => {
      listUserOrdersService.execute.mockResolvedValue(mockOrdersList);

      const result = await controller.findAll(mockUser);

      expect(listUserOrdersService.execute).toHaveBeenCalledWith(mockUser.id);
      expect(result).toBe(mockOrdersList);
    });
  });
});
