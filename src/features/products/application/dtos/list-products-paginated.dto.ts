import { Expose, plainToInstance, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { PaginationResponseDto } from 'src/data/dtos';
import { Product } from '../../domain/entities';

export class ListProductsPaginateDto extends PaginationResponseDto {
  @Expose()
  @Type(() => Product)
  @IsArray()
  @ValidateNested({ each: true })
  data: Product[];

  static toInstance(data: Product[], pagination: PaginationResponseDto) {
    return plainToInstance(
      ListProductsPaginateDto,
      {
        data,
        ...pagination,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
