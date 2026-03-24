import { Test, TestingModule } from '@nestjs/testing';

import { SearchProducts } from './search-products.service';
import { PaginationDto, PaginationResponseDto } from 'src/data/dtos';
import { ProductsRepository } from 'src/features/products/domain/ports';
import { ListProductsPaginateDto } from '../../dtos/list-products-paginated.dto';

describe('SearchProducts', () => {
  let service: SearchProducts;
  let productRepo: jest.Mocked<ProductsRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchProducts,
        {
          provide: ProductsRepository,
          useValue: {
            searchProducts: jest.fn(),
            paginationProducts: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SearchProducts>(SearchProducts);
    productRepo = module.get(ProductsRepository);

    jest.clearAllMocks();
  });

  const query = 'test';
  const filters: PaginationDto = { page: 1, limit: 10 };
  const mockProducts = [{ id: 'p1', name: 'Product 1' }];
  const mockPagination = { page: 1, total: 1 };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list and pagination when both repos succeed', async () => {
    productRepo.searchProducts.mockResolvedValue({
      isOk: true,
      getData: () => mockProducts,
    } as any);

    productRepo.paginationProducts.mockResolvedValue({
      isOk: true,
      getData: () => mockPagination,
    } as any);

    const toInstanceSpy = jest.spyOn(ListProductsPaginateDto, 'toInstance');

    const result = await service.execute(query, filters);

    expect(productRepo.searchProducts).toHaveBeenCalledWith(query, filters);
    expect(productRepo.paginationProducts).toHaveBeenCalledWith(filters, query);
    expect(toInstanceSpy).toHaveBeenCalledWith(mockProducts, mockPagination);
    expect(result).toBeInstanceOf(ListProductsPaginateDto);
  });

  it('should return empty list if searchProducts fails', async () => {
    productRepo.searchProducts.mockResolvedValue({
      isOk: false,
      getError: () => new Error('Search failed'),
    } as any);

    productRepo.paginationProducts.mockResolvedValue({
      isOk: true,
      getData: () => mockPagination,
    } as any);

    const toInstanceSpy = jest.spyOn(ListProductsPaginateDto, 'toInstance');

    await service.execute(query, filters);

    expect(toInstanceSpy).toHaveBeenCalledWith([], mockPagination);
  });

  it('should return empty pagination if paginationProducts fails', async () => {
    productRepo.searchProducts.mockResolvedValue({
      isOk: true,
      getData: () => mockProducts,
    } as any);

    productRepo.paginationProducts.mockResolvedValue({
      isOk: false,
      getError: () => new Error('Pagination failed'),
    } as any);

    const toInstanceSpy = jest.spyOn(ListProductsPaginateDto, 'toInstance');

    await service.execute(query, filters);

    expect(toInstanceSpy).toHaveBeenCalledWith(
      mockProducts,
      expect.any(PaginationResponseDto),
    );
  });
});
