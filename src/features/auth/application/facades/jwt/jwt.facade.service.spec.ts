/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { JwtFacade } from './jwt.facade.service';
import { JwtPayloadDto } from '../../dtos';

describe('JwtFacadeService', () => {
  let service: JwtFacade;
  let jwtServiceSpy: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtFacade,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<JwtFacade>(JwtFacade);
    jwtServiceSpy = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a new token from a Dto', () => {
    const mockToken = 'mock-token';

    (<jest.Mock>jwtServiceSpy.sign).mockReturnValue(mockToken);

    const mockData = JwtPayloadDto.toInstance({
      email: 'test@test.com',
    });

    const sut = service.getJwtToken(mockData);

    expect(sut).toEqual(mockToken);
    expect(jwtServiceSpy.sign).toHaveBeenCalledWith(mockData.toPlain());
  });
});
