import { Test, TestingModule } from '@nestjs/testing';

import { WompiGateway } from './wompi-api.gateway';

describe('WompiGateway', () => {
  let service: WompiGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WompiGateway],
    }).compile();

    service = module.get<WompiGateway>(WompiGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
