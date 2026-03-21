import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaginationDto } from 'src/data/dtos';
import { CreateProductDto } from 'src/features/products/application/dtos';

import {
  CreateProduct,
  ListProductsPaginate,
} from 'src/features/products/application/services';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProduct: CreateProduct,
    private readonly listProductsPaginate: ListProductsPaginate,
  ) {}

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.createProduct.execute(body);
  }

  @Get()
  findAll(@Query() filters: PaginationDto) {
    return this.listProductsPaginate.execute(filters);
  }
}
