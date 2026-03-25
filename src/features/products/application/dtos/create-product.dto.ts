import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Pistola de portales',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => value.toLowerCase().replaceAll(' ', '_'))
  slug: string;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  price: number;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  stock: number;
}
