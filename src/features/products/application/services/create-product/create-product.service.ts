import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateProductDto } from '../../dtos';
import { ProductsRepository } from 'src/features/products/infrastructure/repositories';

@Injectable()
export class CreateProduct {
  constructor(private readonly productRepository: ProductsRepository) {}

  async execute(product: CreateProductDto) {
    const result = await this.productRepository.createProduct(product);

    if (!result.isOk) {
      throw new BadRequestException(result.getError().message);
    }

    return result.getData();
  }
}
