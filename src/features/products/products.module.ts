import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './infrastructure/controllers';
import { ProductImagePgModel, ProductPgModel } from './infrastructure/models';
import { ListProductsPaginate, CreateProduct } from './application/use-cases';
import { ProductsPgRepository } from './infrastructure/repositories';
import { AuthModule } from '../auth/auth.module';
import { ProductsRepository } from './domain/ports';
import { SearchProducts } from './application/use-cases/search-products/search-products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductPgModel, ProductImagePgModel]),
    AuthModule,
  ],
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
    SearchProducts,
  ],
})
export class ProductsModule {}
