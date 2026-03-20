import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './infrastructure/controllers';
import { ProductPgModel } from './infrastructure/models';
import { ListProductsPaginate } from './application/services';
import {
  ProductsRepository,
  ProductsPgRepository,
} from './infrastructure/repositories';

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
  ],
})
export class ProductsModule {}
