import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';

import { JwtStrategy } from './jwt.strategy';
import { User } from '../../domain/entities';
import { JwtPayloadDto } from '../../application/dtos';
import { UserRepository } from '../../domain/ports';

jest.mock('src/config/envs', () => ({
  envs: {
    JWT_SECRET: 'jwt.secret',
  },
}));

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let userRepo: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: UserRepository,
          useValue: {
            findUserByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    userRepo = module.get<UserRepository>(UserRepository);
    jest.clearAllMocks();
  });

  const mockPayload: JwtPayloadDto = { email: 'test@test.com' } as any;

  const mockUser = {
    id: '1',
    email: 'test@test.com',
    status: 'ACTIVE',
  } as User;

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return user if payload is valid', async () => {
      (<jest.Mock>userRepo.findUserByEmail).mockResolvedValue({
        isOk: true,
        getData: () => mockUser,
      } as any);

      const result = await strategy.validate(mockPayload);

      expect(userRepo.findUserByEmail).toHaveBeenCalledWith(mockPayload.email);
      expect(result).toBe(mockUser);
    });

    it('should throw error if findUserByEmail fails', async () => {
      const mockError = new Error('DB error');
      (<jest.Mock>userRepo.findUserByEmail).mockResolvedValue({
        isOk: false,
        getError: () => mockError,
      } as any);

      await expect(strategy.validate(mockPayload)).rejects.toThrow(mockError);
    });

    it('should throw UnauthorizedException if user has no id', async () => {
      const invalidUser = { ...mockUser, id: undefined };
      (<jest.Mock>userRepo.findUserByEmail).mockResolvedValue({
        isOk: true,
        getData: () => invalidUser,
      } as any);

      await expect(strategy.validate(mockPayload)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if user is not ACTIVE', async () => {
      const inactiveUser = { ...mockUser, status: 'INACTIVE' };
      (<jest.Mock>userRepo.findUserByEmail).mockResolvedValue({
        isOk: true,
        getData: () => inactiveUser,
      } as any);

      await expect(strategy.validate(mockPayload)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
