import { Injectable } from '@nestjs/common';

import { PaginationDto, PaginationResponseDto } from 'src/data/dtos';
import { ProductsRepository } from 'src/features/products/infrastructure/repositories';
import { ListProductsPaginateDto } from '../../dtos/list-products-paginated.dto';

@Injectable()
export class ListProductsPaginate {
  constructor(private readonly productRepository: ProductsRepository) {}

  async execute(filters: PaginationDto): Promise<ListProductsPaginateDto> {
    const result = await this.productRepository.listProducts(filters);
    const paginate = await this.productRepository.paginationProducts(filters);

    const listProducts = result.isOk ? result.getData() : [];
    const pagination = paginate.isOk
      ? paginate.getData()
      : new PaginationResponseDto();

    return ListProductsPaginateDto.toInstance(listProducts, pagination);
  }
}
