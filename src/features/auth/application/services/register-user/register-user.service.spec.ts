import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUser } from './register-user.service';

describe('RegisterUserService', () => {
  let service: RegisterUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterUser],
    }).compile();

    service = module.get<RegisterUser>(RegisterUser);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
