import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { ProductsRepository } from '../../../domain/ports/products.repository';
import { ProductImagePgModel, ProductPgModel } from '../../models';
import { PaginationDto, PaginationResponseDto } from 'src/data/dtos';
import { CreateProductDto } from 'src/features/products/application/dtos';
import { to, Result } from 'src/data/core';
import { Product } from 'src/features/products/domain/entities';
import { ProductMapper } from 'src/features/products/application/mappers';

@Injectable()
export class ProductsPgRepository implements ProductsRepository {
  private readonly logger = new Logger('ProductsPgRepository');

  constructor(
    @InjectRepository(ProductPgModel)
    private readonly model: Repository<ProductPgModel>,

    @InjectRepository(ProductImagePgModel)
    private readonly modelImages: Repository<ProductImagePgModel>,
  ) {}

  async createProduct(
    product: CreateProductDto,
  ): Promise<Result<Product, Error>> {
    const productModel = this.model.create(product);

    const [newProduct, error] = await to(this.model.save(productModel));

    if (error) {
      const message =
        (error as any).code === '23505'
          ? `El producto ${product.slug} ya existe`
          : error.message;
      this.logger.error(message);
      return Result.failure(new Error(message));
    }

    return Result.success(ProductMapper.toProduct(newProduct));
  }

  async listProducts(pagination: PaginationDto): Promise<Result<Product[]>> {
    const [listProducts, error] = await to(
      this.model.find({
        take: pagination.limit,
        skip: (pagination.page - 1) * pagination.limit,
        relations: {
          images: true,
        },
      }),
    );

    if (error) {
      this.logger.error(error);
      return Result.failure(
        new NotFoundException('No se encontraron productos'),
      );
    }

    return Result.success(
      listProducts.map((product) => ProductMapper.toProduct(product)),
    );
  }

  async paginationProducts(
    pagination: PaginationDto,
  ): Promise<Result<PaginationResponseDto>> {
    const [total, error] = await to(this.model.count());

    if (error) {
      return Result.failure(
        new NotFoundException('No se encontraron productos'),
      );
    }

    const data: PaginationResponseDto = {
      total: total,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(total / pagination.limit),
    };

    return Result.success(data);
  }

  async findByIdList(ids: string[]): Promise<Result<Product[]>> {
    const [listProducts, error] = await to(this.model.findBy({ id: In(ids) }));

    if (error) {
      this.logger.error(error);
      return Result.failure(new BadRequestException(error.message));
    }

    return Result.success(
      listProducts.map((product) => ProductMapper.toProduct(product)),
    );
  }
}
