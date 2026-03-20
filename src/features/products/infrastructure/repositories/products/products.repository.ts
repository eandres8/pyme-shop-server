import { PaginationDto } from 'src/data/dtos';

export abstract class ProductsRepository {
  abstract listProducts(pagination: PaginationDto): Promise<any>; // TODO: create Product domain entity
}
