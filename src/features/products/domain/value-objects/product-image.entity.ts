import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProductImage {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  url: string;

  static toInstance(data: ProductImage) {
    return plainToInstance(ProductImage, data, {
      excludeExtraneousValues: true,
    });
  }
}
