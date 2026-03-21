import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './infrastructure/controllers';
import { ProductPgModel } from './infrastructure/models';
import { ListProductsPaginate } from './application/services';
import {
  ProductsRepository,
  ProductsPgRepository,
} from './infrastructure/repositories';
import { CreateProduct } from './application/services/create-product/create-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPgModel])],
  controllers: [
    // Ports
    ProductsController,
  ],
  providers: [
    ListProductsPaginate,
    // Adapters
    {
      provide: ProductsRepository,
      useClass: ProductsPgRepository,
    },
    CreateProduct,
  ],
})
export class ProductsModule {}
