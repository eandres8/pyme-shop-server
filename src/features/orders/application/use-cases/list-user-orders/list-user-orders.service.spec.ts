import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { ListUserOrders } from './list-user-orders.service';
import { OrdersRepository } from 'src/features/orders/domain/ports';
import { Order } from 'src/features/orders/domain/entities';
import { Result } from 'src/data/core';

describe('ListUserOrders', () => {
  let service: ListUserOrders;
  let repoSpy: OrdersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListUserOrders,
        {
          provide: OrdersRepository,
          useValue: {
            listUserOrders: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ListUserOrders>(ListUserOrders);
    repoSpy = module.get<OrdersRepository>(OrdersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list of orders by user', async () => {
    const mockListOrders: Order[] = [Order.fromJson({})];

    (<jest.Mock>repoSpy.listUserOrders).mockImplementation(async () =>
      Result.success(mockListOrders),
    );

    const result = await service.execute('uid');

    expect(result).toEqual(mockListOrders);
    expect(repoSpy.listUserOrders).toHaveBeenCalledWith('uid');
  });

  it('should throw a error on request list of orders by user', async () => {
    (<jest.Mock>repoSpy.listUserOrders).mockImplementation(async () =>
      Result.failure(new Error('Somethig went wrong')),
    );

    await expect(service.execute('uid')).rejects.toThrow(NotFoundException);
    expect(repoSpy.listUserOrders).toHaveBeenCalledWith('uid');
  });
});
