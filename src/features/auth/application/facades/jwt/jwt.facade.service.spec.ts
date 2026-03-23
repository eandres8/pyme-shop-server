import { Test, TestingModule } from '@nestjs/testing';
import { JwtFacade } from './jwt.facade.service';

describe('JwtFacadeService', () => {
  let service: JwtFacade;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtFacade],
    }).compile();

    service = module.get<JwtFacade>(JwtFacade);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
