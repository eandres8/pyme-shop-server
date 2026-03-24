import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import {
  RegisterUser,
  SigninUser,
} from 'src/features/auth/application/use-cases';
import {
  AuthResponseDto,
  LoginUserDto,
  PublicUserDto,
  RegisterUserDto,
} from 'src/features/auth/application/dtos';
import { plainToInstance } from 'class-transformer';

describe('AuthController', () => {
  let controller: AuthController;
  let signinSpy: SigninUser;
  let registerSpy: RegisterUser;

  const mockUser: PublicUserDto = {
    id: 'uuid-v4-string',
    first_name: 'Rick',
    last_name: 'Sanchez',
    email: 'rick.sanchez@rick.com',
  };

  const mockResponse: AuthResponseDto = {
    user: mockUser,
    token: 'jwt.v4.string',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: RegisterUser,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: SigninUser,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    signinSpy = module.get<SigninUser>(SigninUser);
    registerSpy = module.get<RegisterUser>(RegisterUser);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user and token on signin', async () => {
    const mockLogin: LoginUserDto = {
      email: 'rick.sanchez@rick.com',
      password: 'password*112233',
    };
    (<jest.Mock>signinSpy.execute).mockImplementation(async () => mockResponse);

    const result = await controller.login(mockLogin);

    expect(result).toEqual(mockResponse);
    expect(signinSpy.execute).toHaveBeenCalledWith(mockLogin);
  });

  it('should return user and token on register', async () => {
    const mockRegister: RegisterUserDto = plainToInstance(RegisterUserDto, {
      email: 'rick.sanchez@rick.com',
      password: 'password*112233',
      first_name: 'Rick',
      last_name: 'Sanchez',
    });
    (<jest.Mock>registerSpy.execute).mockImplementation(
      async () => mockResponse,
    );

    const result = await controller.register(mockRegister);

    expect(result).toEqual(mockResponse);
    expect(registerSpy.execute).toHaveBeenCalledWith(mockRegister);
  });
});
