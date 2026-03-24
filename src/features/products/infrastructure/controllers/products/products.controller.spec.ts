import { Test, TestingModule } from '@nestjs/testing';

import { PaginationDto } from 'src/data/dtos';
import { CreateProductDto } from 'src/features/products/application/dtos';
import {
  CreateProduct,
  ListProductsPaginate,
  SearchProducts,
} from 'src/features/products/application/use-cases';
import { Product } from 'src/features/products/domain/entities';
import { ProductsController } from './products.controller';
import { ListProductsPaginateDto } from 'src/features/products/application/dtos/list-products-paginated.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let createProductService: jest.Mocked<CreateProduct>;
  let listProductsService: jest.Mocked<ListProductsPaginate>;
  let searchProductsService: jest.Mocked<SearchProducts>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: CreateProduct,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ListProductsPaginate,
          useValue: { execute: jest.fn() },
        },
        {
          provide: SearchProducts,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    createProductService = module.get(CreateProduct);
    listProductsService = module.get(ListProductsPaginate);
    searchProductsService = module.get(SearchProducts);

    jest.clearAllMocks();
  });

  const mockCreateDto: CreateProductDto = {
    title: 'Product 1',
    slug: 'prod-1',
    price: 100,
    description: '',
    stock: 0,
  };
  const mockPagination: PaginationDto = { page: 1, limit: 10 };
  const mockProduct: Product = { id: 'p1', title: 'Product 1' } as Product;
  const mockListProduct: ListProductsPaginateDto = {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call CreateProduct service and return result', async () => {
      createProductService.execute.mockResolvedValue(mockProduct);

      const result = await controller.create(mockCreateDto);

      expect(createProductService.execute).toHaveBeenCalledWith(mockCreateDto);
      expect(result).toBe(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should call ListProductsPaginate service and return result', async () => {
      listProductsService.execute.mockResolvedValue(mockListProduct);

      const result = await controller.findAll(mockPagination);

      expect(listProductsService.execute).toHaveBeenCalledWith(mockPagination);
      expect(result).toEqual(mockListProduct);
    });
  });

  describe('findProductsBy', () => {
    it('should call SearchProducts service and return result', async () => {
      searchProductsService.execute.mockResolvedValue(mockListProduct);

      const query = 'test';

      const result = await controller.findProductsBy(query, mockPagination);

      expect(searchProductsService.execute).toHaveBeenCalledWith(
        query,
        mockPagination,
      );
      expect(result).toEqual(mockListProduct);
    });
  });
});
