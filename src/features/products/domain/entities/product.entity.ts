import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

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

  @Expose()
  @IsArray()
  @Type(() => String)
  images: string[];

  static toInstance(data: Product) {
    return plainToInstance(Product, data, { excludeExtraneousValues: true });
  }
}
