import { Expose, plainToInstance, Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class Product {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @Expose()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  price: number;

  @Expose()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  stock: number;

  static toInstance(data: Product) {
    return plainToInstance(Product, data, { excludeExtraneousValues: true });
  }
}
