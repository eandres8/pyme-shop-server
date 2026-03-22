import { Result } from 'src/data/core';
import { PaginationDto, PaginationResponseDto } from 'src/data/dtos';
import { CreateProductDto } from 'src/features/products/application/dtos';
import { Product } from 'src/features/products/domain/entities';

export abstract class ProductsRepository {
  abstract createProduct(product: CreateProductDto): Promise<Result<Product>>;

  abstract listProducts(pagination: PaginationDto): Promise<Result<Product[]>>;

  abstract paginationProducts(
    pagination: PaginationDto,
  ): Promise<Result<PaginationResponseDto>>;

  abstract findByIdList(ids: string[]): Promise<Result<Product[]>>;
}
