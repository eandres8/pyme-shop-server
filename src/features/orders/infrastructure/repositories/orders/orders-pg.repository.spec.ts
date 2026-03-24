import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrdersPgRepository } from './orders-pg.repository';
import { OrderMapper } from 'src/features/orders/application/mappers';
import { Order } from 'src/features/orders/domain/entities';
import { OrderPgModel, OrderItemPgModel } from '../../models';
import { OrderItem } from 'src/features/orders/domain/value-objects';

describe('OrdersPgRepository', () => {
  let repository: OrdersPgRepository;
  let orderRepo: jest.Mocked<Repository<OrderPgModel>>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let orderItemRepo: jest.Mocked<Repository<OrderItemPgModel>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersPgRepository,
        {
          provide: getRepositoryToken(OrderPgModel),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(OrderItemPgModel),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<OrdersPgRepository>(OrdersPgRepository);
    orderRepo = module.get(getRepositoryToken(OrderPgModel));
    orderItemRepo = module.get(getRepositoryToken(OrderItemPgModel));

    jest.clearAllMocks();
  });

  const mockOrder = Order.fromJson({
    id: 'o1',
    userId: 'uid-1',
    items: [OrderItem.fromJson({ productId: 'p1', quantity: 1, price: 100 })],
  });
  const mockPersistence: OrderPgModel = {
    id: 'o1',
    status: 'PENDING',
    total: 100,
    user: { id: 'u1' },
    items: [OrderItem.fromJson({ productId: 'p1', quantity: 1, price: 100 })],
  } as unknown as OrderPgModel;
  const mockDomain = Order.fromJson({ id: 'o1' });

  describe('createOrder', () => {
    it('should create order successfully', async () => {
      jest
        .spyOn(OrderMapper, 'toPersistence')
        .mockReturnValue(mockPersistence as any);
      jest.spyOn(OrderMapper, 'toDomain').mockReturnValue(mockDomain as any);

      orderRepo.create.mockReturnValue(mockPersistence as any);
      orderRepo.save.mockResolvedValue(mockPersistence);

      const result = await repository.createOrder(mockOrder);

      expect(OrderMapper.toPersistence).toHaveBeenCalledWith(mockOrder);
      expect(orderRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: mockPersistence.id,
          user: { id: mockPersistence.user.id },
        }),
      );
      expect(orderRepo.save).toHaveBeenCalledWith(mockPersistence);
      expect(result.isOk).toBe(true);
      expect(result.getData()).toBe(mockDomain);
    });

    it('should return failure if save throws', async () => {
      jest
        .spyOn(OrderMapper, 'toPersistence')
        .mockReturnValue(mockPersistence as any);

      orderRepo.create.mockReturnValue(mockPersistence as any);
      orderRepo.save.mockRejectedValue(new Error('DB error'));

      const result = await repository.createOrder(mockOrder);

      expect(result.isOk).toBe(false);
      expect(result.getError()).toBeInstanceOf(Error);
    });
  });

  describe('listUserOrders', () => {
    it('should return user orders successfully', async () => {
      const mockOrders = [mockPersistence];
      jest.spyOn(OrderMapper, 'toDomain').mockReturnValue(mockDomain as any);

      orderRepo.find.mockResolvedValue(mockOrders as any);

      const result = await repository.listUserOrders('u1');

      expect(orderRepo.find).toHaveBeenCalledWith({
        where: { user: { id: 'u1' } },
        relations: ['orderItems', 'user'],
      });

      expect(result.isOk).toBe(true);
      expect(result.getData()).toEqual([mockDomain]);
    });

    it('should return failure if find throws', async () => {
      orderRepo.find.mockRejectedValue(new Error('DB error'));

      const result = await repository.listUserOrders('u1');

      expect(result.isOk).toBe(false);
      expect(result.getError()).toBeInstanceOf(Error);
    });
  });
});
