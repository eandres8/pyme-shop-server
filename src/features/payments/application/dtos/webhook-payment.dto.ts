import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class WebhookResponseDto {
  @IsUUID()
  paymentId: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
