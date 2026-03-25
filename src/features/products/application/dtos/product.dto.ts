import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsPositive,
  IsArray,
} from 'class-validator';

export class ProductDto {
  @ApiProperty({
    description: 'ID del producto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  price: number;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  stock: number;

  @IsArray()
  @Type(() => String)
  images: string[];
}
