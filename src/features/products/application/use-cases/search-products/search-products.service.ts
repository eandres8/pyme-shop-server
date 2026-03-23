import { Injectable } from '@nestjs/common';

import { PaginationDto, PaginationResponseDto } from 'src/data/dtos';
import { ProductsRepository } from 'src/features/products/domain/ports';
import { ListProductsPaginateDto } from '../../dtos/list-products-paginated.dto';

@Injectable()
export class SearchProducts {
  constructor(private readonly productRepository: ProductsRepository) {}

  async execute(
    query: string,
    filters: PaginationDto,
  ): Promise<ListProductsPaginateDto> {
    const result = await this.productRepository.searchProducts(query, filters);
    const paginate = await this.productRepository.paginationProducts(
      filters,
      query,
    );

    const listProducts = result.isOk ? result.getData() : [];
    const pagination = paginate.isOk
      ? paginate.getData()
      : new PaginationResponseDto();

    return ListProductsPaginateDto.toInstance(listProducts, pagination);
  }
}
