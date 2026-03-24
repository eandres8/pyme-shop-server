import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateOrder } from './create-order.service';
import { Order } from 'src/features/orders/domain/entities';
import { OrdersRepository } from 'src/features/orders/domain/ports';
import { ProductsRepository } from 'src/features/products/domain/ports';
import { CreateOrderDto } from '../../dtos';

describe('CreateOrder', () => {
  let service: CreateOrder;
  let orderRepo: jest.Mocked<OrdersRepository>;
  let productRepo: jest.Mocked<ProductsRepository>;
  let eventEmitter: jest.Mocked<EventEmitter2>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrder,
        {
          provide: OrdersRepository,
          useValue: {
            createOrder: jest.fn(),
          },
        },
        {
          provide: ProductsRepository,
          useValue: {
            findByIdList: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateOrder>(CreateOrder);
    orderRepo = module.get(OrdersRepository);
    productRepo = module.get(ProductsRepository);
    eventEmitter = module.get(EventEmitter2);

    jest.clearAllMocks();
  });

  const mockUid = 'user-1';
  const mockProductsDto: CreateOrderDto = {
    products: [
      { productId: 'p1', quantity: 2 },
      { productId: 'p2', quantity: 1 },
    ],
  };

  const mockProductList = [
    { id: 'p1', price: 100 },
    { id: 'p2', price: 200 },
  ];

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw BadRequestException if no products are provided', async () => {
    const dto = { products: [] };
    await expect(service.execute(dto as any, mockUid)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw error if findByIdList fails', async () => {
    productRepo.findByIdList.mockResolvedValue({
      isOk: false,
      getError: () => new Error('DB error'),
    } as any);

    await expect(service.execute(mockProductsDto, mockUid)).rejects.toThrow(
      'DB error',
    );
  });

  it('should throw BadRequestException if createOrder fails', async () => {
    productRepo.findByIdList.mockResolvedValue({
      isOk: true,
      getData: () => mockProductList,
    } as any);

    const orderInstance = {
      addItems: jest.fn().mockReturnValue({ id: 'order-1', total: 400 } as any),
    } as any;

    // Mock Order.create
    jest.spyOn(Order, 'create').mockReturnValue(orderInstance);

    orderRepo.createOrder.mockResolvedValue({
      isOk: false,
      getError: () => new Error('Create order failed'),
    } as any);

    await expect(service.execute(mockProductsDto, mockUid)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should create order successfully and emit event', async () => {
    productRepo.findByIdList.mockResolvedValue({
      isOk: true,
      getData: () => mockProductList,
    } as any);

    const orderInstance = {
      addItems: jest.fn().mockReturnValue({ id: 'order-1', total: 400 } as any),
    } as any;

    jest.spyOn(Order, 'create').mockReturnValue(orderInstance);

    orderRepo.createOrder.mockResolvedValue({
      isOk: true,
      getData: () => ({ id: 'order-1', total: 400 }),
    } as any);

    const result = await service.execute(mockProductsDto, mockUid);

    expect(Order.create).toHaveBeenCalled();
    expect(orderInstance.addItems).toHaveBeenCalled();

    expect(orderRepo.createOrder).toHaveBeenCalledWith(
      orderInstance.addItems.mock.results[0].value,
    );
    expect(eventEmitter.emit).toHaveBeenCalledWith('order.created', {
      orderId: 'order-1',
      total: 400,
    });

    expect(result).toEqual({ id: 'order-1', total: 400 });
  });
});
