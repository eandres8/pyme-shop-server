import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './infrastructure/controllers';
import { ProductImagePgModel, ProductPgModel } from './infrastructure/models';
import { ListProductsPaginate } from './application/services';
import {
  ProductsRepository,
  ProductsPgRepository,
} from './infrastructure/repositories';
import { CreateProduct } from './application/services/create-product/create-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPgModel, ProductImagePgModel])],
  controllers: [
    // Ports
    ProductsController,
  ],
  providers: [
    ListProductsPaginate,
    CreateProduct,
    // Adapters
    {
      provide: ProductsRepository,
      useClass: ProductsPgRepository,
    },
  ],
})
export class ProductsModule {}
