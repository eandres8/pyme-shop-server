import { Expose, plainToInstance } from 'class-transformer';

import { PaginationResponseDto } from 'src/data/dtos';

export class ProductListDto extends PaginationResponseDto {
  @Expose()
  data: string[];

  static toInstance(data: ProductListDto) {
    return plainToInstance(ProductListDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
