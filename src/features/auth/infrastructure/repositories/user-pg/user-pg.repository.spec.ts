import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UserPgRepository } from './user-pg.repository';
import { CryptoAdapter } from 'src/data/adapters';
import { UserMapper } from 'src/features/auth/application/mappers';
import { User } from 'src/features/auth/domain/entities';
import { UserPgModel } from '../../models';

describe('UserPgRepository', () => {
  let repository: UserPgRepository;
  let ormRepo: jest.Mocked<Repository<UserPgModel>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPgRepository,
        {
          provide: getRepositoryToken(UserPgModel),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get(UserPgRepository);
    ormRepo = module.get(getRepositoryToken(UserPgModel));

    jest.clearAllMocks();
  });

  describe('createUser', () => {
    const mockNewUser = {
      email: 'test@test.com',
      password: '123456',
    };

    const mappedData = { email: 'test@test.com', password: 'hashed' };
    const savedEntity = { id: '1', email: 'test@test.com' } as UserPgModel;
    const domainUser = { id: '1' };

    it('should create user successfully', async () => {
      jest.spyOn(CryptoAdapter, 'hashSync').mockReturnValue('hashed');
      jest
        .spyOn(UserMapper, 'toNewPersiste')
        .mockReturnValue(mappedData as any);
      jest.spyOn(UserMapper, 'toDomain').mockReturnValue(domainUser as any);

      ormRepo.create.mockReturnValue(mappedData as any);
      ormRepo.save.mockResolvedValue(savedEntity);

      const result = await repository.createUser(mockNewUser as any);

      expect(CryptoAdapter.hashSync).toHaveBeenCalledWith(mockNewUser.password);
      expect(ormRepo.create).toHaveBeenCalledWith(mappedData);
      expect(ormRepo.save).toHaveBeenCalled();

      expect(result.isOk).toBe(true);
      expect(result.getData()).toBe(domainUser);
    });

    it('should return failure if save throws', async () => {
      jest.spyOn(CryptoAdapter, 'hashSync').mockReturnValue('hashed');
      jest
        .spyOn(UserMapper, 'toNewPersiste')
        .mockReturnValue(mappedData as any);

      ormRepo.create.mockReturnValue(mappedData as any);
      ormRepo.save.mockRejectedValue(new Error('DB error'));

      const result = await repository.createUser(mockNewUser as any);

      expect(result.isOk).toBe(false);
      expect(result.getError()).toBeInstanceOf(Error);
    });
  });

  describe('signinUser', () => {
    const login = { email: 'test@test.com', password: '123456' };

    it('should login successfully', async () => {
      const dbUser = { email: login.email, password: 'hashed' };

      ormRepo.findOne.mockResolvedValue(dbUser as any);
      jest.spyOn(CryptoAdapter, 'compareSync').mockReturnValue(true);

      const result = await repository.signinUser(login as any);

      expect(result.isOk).toBe(true);
      expect(result.getData()).toBe(true);
    });

    it('should fail if findOne throws', async () => {
      ormRepo.findOne.mockRejectedValue(new Error('DB error'));

      const result = await repository.signinUser(login as any);

      expect(result.isOk).toBe(false);
      expect(result.getError()).toBeInstanceOf(BadRequestException);
    });

    it('should fail if user not found', async () => {
      ormRepo.findOne.mockResolvedValue(null);

      const result = await repository.signinUser(login as any);

      expect(result.isOk).toBe(false);
      expect(result.getError()).toBeInstanceOf(UnauthorizedException);
    });

    it('should fail if password does not match', async () => {
      const dbUser = { email: login.email, password: 'hashed' };
      ormRepo.findOne.mockResolvedValue(dbUser as any);
      jest.spyOn(CryptoAdapter, 'compareSync').mockReturnValue(false);

      const result = await repository.signinUser(login as any);

      expect(result.isOk).toBe(false);
      expect(result.getError()).toBeInstanceOf(UnauthorizedException);
    });
  });

  describe('findUserByEmail', () => {
    it('should return user when found', async () => {
      const dbUser = { email: 'test@test.com' };
      const domainUser = { email: 'test@test.com' };

      ormRepo.findOneBy.mockResolvedValue(dbUser as any);
      jest.spyOn(UserMapper, 'toDomain').mockReturnValue(domainUser as any);

      const result = await repository.findUserByEmail('test@test.com');

      expect(result.isOk).toBe(true);
      expect(UserMapper.toDomain).toHaveBeenCalledWith(dbUser);
      expect(result.getData()).toBe(domainUser);
    });

    it('should return empty user when not found', async () => {
      ormRepo.findOneBy.mockResolvedValue(null);
      jest.spyOn(User, 'fromJson').mockReturnValue({} as any);

      const result = await repository.findUserByEmail('test@test.com');

      expect(result.isOk).toBe(true);
      expect(User.fromJson).toHaveBeenCalledWith({});
    });

    it('should fail if findOneBy throws', async () => {
      ormRepo.findOneBy.mockRejectedValue(new Error('DB error'));

      const result = await repository.findUserByEmail('test@test.com');

      expect(result.isOk).toBe(false);
      expect(result.getError()).toBeInstanceOf(UnauthorizedException);
    });
  });
});
