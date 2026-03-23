import { Expose, plainToInstance, Transform } from 'class-transformer';
import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class SendPaymentDto {
  @Expose()
  @IsUUID()
  orderId: string;

  @Expose()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  total: number;

  static toInstance(data: SendPaymentDto) {
    return plainToInstance(SendPaymentDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
