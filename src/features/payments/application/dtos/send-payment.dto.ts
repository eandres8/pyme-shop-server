import { IsUUID } from 'class-validator';

export class SendPaymentDto {
  @IsUUID()
  orderId: string;
}
