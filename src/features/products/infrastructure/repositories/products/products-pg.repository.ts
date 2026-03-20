import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { to } from 'src/data/helpers';
import { ProductsRepository } from './products.repository';
import { ProductPgModel } from '../../models';
import { PaginationDto } from 'src/data/dtos';

@Injectable()
export class ProductsPgRepository implements ProductsRepository {
  constructor(
    @InjectRepository(ProductPgModel)
    private model: Repository<ProductPgModel>,
  ) {}

  listProducts(pagination: PaginationDto): any {
    return [pagination];
  }
}
