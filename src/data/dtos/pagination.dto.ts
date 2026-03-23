import { Expose, Type } from 'class-transformer';
import { IsInt, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @IsInt()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  limit: number = 10;
}

export class PaginationResponseDto {
  @Expose()
  @IsInt()
  @IsPositive()
  total: number = 0;

  @Expose()
  @IsInt()
  @IsPositive()
  page: number = 0;

  @Expose()
  @IsInt()
  @IsPositive()
  limit: number = 0;

  @Expose()
  @IsInt()
  @IsPositive()
  totalPages: number = 0;
}
