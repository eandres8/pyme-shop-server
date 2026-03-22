import { Expose } from 'class-transformer';
import { IsInt, IsPositive, IsUUID, Min } from 'class-validator';

export class NewOrderitem {
  @Expose()
  @IsUUID()
  productId: string;

  @Expose()
  @IsInt()
  @IsPositive()
  @Min(1)
  quantity: number;
}
