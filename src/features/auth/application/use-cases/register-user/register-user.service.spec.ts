/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { RegisterUser } from './register-user.service';
import { UserRepository } from 'src/features/auth/domain/ports';
import { JwtPayloadDto } from '../../dtos';
import { JwtFacade } from '../../facades';
import { UserMapper } from '../../mappers';

describe('RegisterUserService', () => {
  let service: RegisterUser;
  let userRepository: jest.Mocked<UserRepository>;
  let jwtFacade: jest.Mocked<JwtFacade>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUser,
        {
          provide: UserRepository,
          useValue: {
            findUserByEmail: jest.fn(),
            createUser: jest.fn(),
          },
        },
        {
          provide: JwtFacade,
          useValue: {
            getJwtToken: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RegisterUser>(RegisterUser);
    userRepository = module.get(UserRepository);
    jwtFacade = module.get(JwtFacade);

    jest.clearAllMocks();
  });

  const mockRegisterDto = {
    email: 'test@test.com',
    first_name: 'John',
    last_name: 'Doe',
    password: '123456',
  };

  const mockNewUser = {
    email: mockRegisterDto.email,
  };

  const mockUserEntity = {
    id: '1',
    email: mockRegisterDto.email,
    toPublic: jest.fn().mockReturnValue({
      id: '1',
      email: mockRegisterDto.email,
    }),
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should register a new user successfully', async () => {
      jest.spyOn(UserMapper, 'toNewUser').mockReturnValue(mockNewUser as any);

      userRepository.findUserByEmail.mockResolvedValue({
        isOk: false,
      } as any);

      userRepository.createUser.mockResolvedValue({
        isOk: true,
        getData: () => mockUserEntity,
      } as any);

      jest.spyOn(JwtPayloadDto, 'toInstance').mockReturnValue({
        email: mockUserEntity.email,
      } as any);

      jwtFacade.getJwtToken.mockReturnValue('mock-token');

      const result = await service.execute(mockRegisterDto as any);

      expect(UserMapper.toNewUser).toHaveBeenCalledWith(mockRegisterDto);

      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(
        mockNewUser.email,
      );

      expect(userRepository.createUser).toHaveBeenCalledWith(mockNewUser);

      expect(jwtFacade.getJwtToken).toHaveBeenCalled();

      expect(result).toEqual({
        user: mockUserEntity.toPublic(),
        token: 'mock-token',
      });
    });

    it('should throw BadRequestException if user already exists', async () => {
      jest.spyOn(UserMapper, 'toNewUser').mockReturnValue(mockNewUser as any);

      userRepository.findUserByEmail.mockResolvedValue({
        isOk: true,
        getData: () => ({ id: '1' }),
      } as any);

      await expect(service.execute(mockRegisterDto as any)).rejects.toThrow(
        BadRequestException,
      );

      expect(userRepository.createUser).not.toHaveBeenCalled();
    });

    it('should throw error if createUser fails', async () => {
      jest.spyOn(UserMapper, 'toNewUser').mockReturnValue(mockNewUser as any);

      userRepository.findUserByEmail.mockResolvedValue({
        isOk: false,
      } as any);

      const mockError = new Error('DB error');

      userRepository.createUser.mockResolvedValue({
        isOk: false,
        getError: () => mockError,
      } as any);

      await expect(service.execute(mockRegisterDto as any)).rejects.toThrow(
        mockError,
      );

      expect(jwtFacade.getJwtToken).not.toHaveBeenCalled();
    });
  });
});
