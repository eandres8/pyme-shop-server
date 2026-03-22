import { Test, TestingModule } from '@nestjs/testing';
import { SigninUser } from './signin-user.service';

describe('SigninUserService', () => {
  let service: SigninUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SigninUser],
    }).compile();

    service = module.get<SigninUser>(SigninUser);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
