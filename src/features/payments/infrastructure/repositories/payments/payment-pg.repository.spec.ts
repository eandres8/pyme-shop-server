import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

import { PaymentPgRepository } from './payment-pg.repository';
import { Payment } from 'src/features/payments/domain/entities';
import { PaymentPgModel } from '../../models';
import { PaymentStatus } from 'src/features/payments/domain/types';
import { PaymentMapper } from 'src/features/payments/application/mappers';

describe('PaymentPgRepository', () => {
  let repository: PaymentPgRepository;
  let paymentRepo: jest.Mocked<Repository<PaymentPgModel>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentPgRepository,
        {
          provide: getRepositoryToken(PaymentPgModel),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<PaymentPgRepository>(PaymentPgRepository);
    paymentRepo = module.get(getRepositoryToken(PaymentPgModel));

    jest.clearAllMocks();
  });

  const mockPayment = { id: 'pay-1', orderId: 'o1', amount: 500 } as Payment;
  const mockPersistence: PaymentPgModel = {
    id: 'pay-1',
    order: {
      id: 'o1',
    } as any,
    amount: 500,
    status: PaymentStatus.PENDING,
  } as PaymentPgModel;
  const mockDomain = { id: 'pay-1', orderId: 'o1', amount: 500 } as Payment;

  describe('createPayment', () => {
    it('should create payment successfully', async () => {
      jest
        .spyOn(PaymentMapper, 'toPersistence')
        .mockReturnValue(mockPersistence as any);
      jest.spyOn(PaymentMapper, 'toDomain').mockReturnValue(mockDomain as any);

      paymentRepo.create.mockReturnValue(mockPersistence as any);
      paymentRepo.save.mockResolvedValue(mockPersistence);

      const result = await repository.createPayment(mockPayment);

      expect(PaymentMapper.toPersistence).toHaveBeenCalledWith(mockPayment);
      expect(paymentRepo.create).toHaveBeenCalledWith(mockPersistence);
      expect(paymentRepo.save).toHaveBeenCalledWith(mockPersistence);

      expect(result.isOk).toBe(true);
      expect(result.getData()).toBe(mockDomain);
    });

    it('should return failure if save throws', async () => {
      jest
        .spyOn(PaymentMapper, 'toPersistence')
        .mockReturnValue(mockPersistence as any);

      paymentRepo.create.mockReturnValue(mockPersistence as any);
      paymentRepo.save.mockRejectedValue(new Error('DB error'));

      const loggerSpy = jest
        .spyOn(Logger.prototype, 'error')
        .mockImplementation();

      const result = await repository.createPayment(mockPayment);

      expect(result.isOk).toBe(false);
      expect(result.getError()).toBeInstanceOf(Error);
      expect(loggerSpy).toHaveBeenCalledWith(expect.any(String));
    });
  });
});
