import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';

import { Result, to } from 'src/data/core';
import {
  TPaymentMerchantResponse,
  TPaymentParams,
  // TPaymentParams,
} from '../../../domain/types';
import { PaymentGateway } from '../../../domain/ports/payment.gateway';
import { envs } from 'src/config/envs';
import { ISegmentedZoneVariables } from 'src/features/payments/domain/types/payment-gateway.type';
import { CreateTransactionDto } from 'src/features/payments/application/dtos';

@Injectable()
export class BankGateway implements PaymentGateway {
  private readonly logger = new Logger('BankGateway');
  private readonly apiUrl = envs.PAY_GATEWAY_URL;
  private readonly apiKey = envs.PAY_GATEWAY_API_PUB_KEY;

  constructor(private readonly httpService: HttpService) {}

  async sendPayment(): Promise<Result<TPaymentMerchantResponse>> {
    const [response, error] = await to(
      firstValueFrom(
        this.httpService
          .get<ISegmentedZoneVariables>(
            `${this.apiUrl}/merchants/${this.apiKey}`,
          )
          .pipe(map((response) => response.data.data)),
      ),
    );

    if (error) {
      this.logger.error(error);
      return Result.failure(new Error(error.message));
    }

    return Result.success({
      accepted_currency: response.accepted_currencies?.at(0) || '',
      payment_methods: response.accepted_payment_methods,
      acceptance_token: response.presigned_acceptance.acceptance_token,
    });
  }

  async createPaymentTransaction(
    data: CreateTransactionDto,
  ): Promise<Result<TPaymentParams>> {
    const [response, error] = await to(
      firstValueFrom(
        this.httpService
          .post<TPaymentParams>(`${this.apiUrl}/transactions`, data, {
            headers: { Authorization: `Bearer ${this.apiKey}` },
          })
          .pipe(map((response) => response.data)),
      ),
    );

    if (error) {
      return Result.failure(new Error(error.message));
    }

    return Result.success(response);
  }
}
