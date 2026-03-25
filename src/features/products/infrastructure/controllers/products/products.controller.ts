import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PaginationDto } from 'src/data/dtos';
import {
  CreateProductDto,
  ProductDto,
} from 'src/features/products/application/dtos';
import {
  CreateProduct,
  ListProductsPaginate,
  SearchProducts,
} from 'src/features/products/application/use-cases';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(
    private readonly createProduct: CreateProduct,
    private readonly listProductsPaginate: ListProductsPaginate,
    private readonly searchProducts: SearchProducts,
  ) {}

  @ApiOperation({
    summary: 'Crea un nuevo producto',
    security: [{ bearer: [] }],
  })
  @ApiResponse({
    status: 201,
    description: 'Successful created',
    type: ProductDto,
  })
  @ApiBearerAuth('access-token')
  @Post()
  @UseGuards(AuthGuard())
  create(@Body() body: CreateProductDto) {
    this.logger.log('[POST] /api/products');
    return this.createProduct.execute(body);
  }

  @Get()
  findAll(@Query() filters: PaginationDto) {
    this.logger.log('[GET] /api/products', filters);
    return this.listProductsPaginate.execute(filters);
  }

  @Get(':query')
  findProductsBy(
    @Param('query') query: string,
    @Query() filters: PaginationDto,
  ) {
    this.logger.log('[GET] /api/products/:query', query, filters);

    return this.searchProducts.execute(query, filters);
  }
}
