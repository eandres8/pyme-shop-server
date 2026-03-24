import { Test, TestingModule } from '@nestjs/testing';

import { SigninUser } from './signin-user.service';
import { UserRepository } from 'src/features/auth/domain/ports';
import { JwtPayloadDto } from '../../dtos';
import { JwtFacade } from '../../facades';

describe('SigninUserService', () => {
  let service: SigninUser;
  let userRepository: jest.Mocked<UserRepository>;
  let jwtFacade: jest.Mocked<JwtFacade>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SigninUser,
        {
          provide: UserRepository,
          useValue: {
            signinUser: jest.fn(),
            findUserByEmail: jest.fn(),
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

    service = module.get<SigninUser>(SigninUser);
    userRepository = module.get(UserRepository);
    jwtFacade = module.get(JwtFacade);

    jest.clearAllMocks();
  });

  const mockLoginDto = {
    email: 'test@test.com',
    password: '123456',
  };

  const mockUserEntity = {
    email: mockLoginDto.email,
    toPublic: jest.fn().mockReturnValue({
      email: mockLoginDto.email,
    }),
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should login successfully and return user + token', async () => {
      userRepository.signinUser.mockResolvedValue({
        isOk: true,
      } as any);

      userRepository.findUserByEmail.mockResolvedValue({
        isOk: true,
        getData: () => mockUserEntity,
      } as any);

      jest.spyOn(JwtPayloadDto, 'toInstance').mockReturnValue({
        email: mockUserEntity.email,
      } as any);

      jwtFacade.getJwtToken.mockReturnValue('mock-token');

      const result = await service.execute(mockLoginDto as any);

      expect(userRepository.signinUser).toHaveBeenCalledWith(mockLoginDto);

      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(
        mockLoginDto.email,
      );

      expect(JwtPayloadDto.toInstance).toHaveBeenCalledWith({
        email: mockUserEntity.email,
      });

      expect(jwtFacade.getJwtToken).toHaveBeenCalled();

      expect(result).toEqual({
        user: mockUserEntity.toPublic(),
        token: 'mock-token',
      });
    });

    it('should throw error if signinUser fails', async () => {
      const mockError = new Error('Invalid credentials');

      userRepository.signinUser.mockResolvedValue({
        isOk: false,
        getError: () => mockError,
      } as any);

      await expect(service.execute(mockLoginDto as any)).rejects.toThrow(
        mockError,
      );

      expect(userRepository.findUserByEmail).not.toHaveBeenCalled();
      expect(jwtFacade.getJwtToken).not.toHaveBeenCalled();
    });

    it('should throw error if findUserByEmail fails', async () => {
      userRepository.signinUser.mockResolvedValue({
        isOk: true,
      } as any);

      const mockError = new Error('User not found');

      userRepository.findUserByEmail.mockResolvedValue({
        isOk: false,
        getError: () => mockError,
      } as any);

      await expect(service.execute(mockLoginDto as any)).rejects.toThrow(
        mockError,
      );

      expect(jwtFacade.getJwtToken).not.toHaveBeenCalled();
    });
  });
});
