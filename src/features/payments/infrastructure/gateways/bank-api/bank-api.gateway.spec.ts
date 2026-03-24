import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

import { BankGateway } from './bank-api.gateway';
import { Result } from 'src/data/core';
import { ISegmentedZoneVariables } from 'src/features/payments/domain/types/payment-gateway.type';

jest.mock('src/config/envs', () => ({
  envs: {
    JWT_SECRET: 'jwt.secret',
    PAY_GATEWAY_URL: 'http://api.example.com/api',
    PAY_GATEWAY_API_PUB_KEY: 'jwt.secret.key',
  },
}));

describe('BankGateway', () => {
  let service: BankGateway;
  let serviceHttpSpy: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankGateway,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockImplementation(() => of({})),
            post: jest.fn().mockImplementation(() => of({})),
          },
        },
      ],
    }).compile();

    service = module.get<BankGateway>(BankGateway);
    serviceHttpSpy = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should mock response from bank', async () => {
    const mockResponse: ISegmentedZoneVariables = {
      data: {
        id: 0,
        name: '',
        email: '',
        contact_name: '',
        phone_number: '',
        active: false,
        logo_url: null,
        legal_name: '',
        legal_id_type: '',
        legal_id: '',
        public_key: '',
        accepted_currencies: [],
        validated_legal_id: '',
        fraud_javascript_key: null,
        fraud_groups: [],
        accepted_payment_methods: [],
        payment_methods: [],
        presigned_acceptance: {
          acceptance_token: 'bank_tx_id',
          permalink: '',
          type: '',
        },
        presigned_personal_data_auth: {
          acceptance_token: '',
          permalink: '',
          type: '',
        },
        click_to_pay_dpa_id: null,
        mcc: null,
        acquirer_id: null,
      },
      meta: {},
    };
    (<jest.Mock>serviceHttpSpy.get).mockReturnValue(of({ data: mockResponse }));
    const sut = await service.sendPayment();

    expect(sut).toBeInstanceOf(Result);
    expect(serviceHttpSpy.get).toHaveBeenLastCalledWith(
      `http://api.example.com/api/merchants/jwt.secret.key`,
    );
    expect(sut.isOk).toBe(true);
    expect(sut.getData().acceptance_token).toBe('bank_tx_id');
  });
});
