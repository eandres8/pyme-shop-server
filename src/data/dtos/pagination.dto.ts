import { Expose } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsPositive()
  page: number = 1;

  @IsInt()
  @IsPositive()
  limit: number = 10;
}

export class PaginationResponseDto {
  @Expose()
  @IsInt()
  @IsPositive()
  total: number;

  @Expose()
  @IsInt()
  @IsPositive()
  page: number;

  @Expose()
  @IsInt()
  @IsPositive()
  limit: number;

  @Expose()
  @IsInt()
  @IsPositive()
  totalPages: number;
}
