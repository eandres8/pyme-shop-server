import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';

export class CreateTransactionDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  readonly amount_in_cents: number;

  @IsString()
  @IsNotEmpty()
  readonly reference: string;

  @IsString()
  @IsNotEmpty()
  readonly currency: string;

  @IsString()
  @IsNotEmpty()
  readonly customer_email: string;

  @Type(() => CustomerData)
  @ValidateNested()
  readonly customer_data: CustomerData;

  @Type(() => PaymentMethod)
  @ValidateNested()
  readonly payment_method: PaymentMethod;

  @IsString()
  @IsNotEmpty()
  readonly acceptance_token: string;
}

export class CustomerData {
  @IsString()
  @IsNotEmpty()
  readonly legal_id: string;

  @IsString()
  @IsNotEmpty()
  readonly full_name: string;

  @IsString()
  @IsNotEmpty()
  readonly phone_number: string;

  @IsString()
  @IsNotEmpty()
  readonly legal_id_type: string;
}

export class PaymentMethod {
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsString()
  @IsNotEmpty()
  readonly user_type: string;

  @IsString()
  @IsNotEmpty()
  readonly payment_description: string;

  @IsString()
  @IsNotEmpty()
  readonly sandbox_status: string;
}
