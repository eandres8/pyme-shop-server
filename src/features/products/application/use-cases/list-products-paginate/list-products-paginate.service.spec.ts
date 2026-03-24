import { Test, TestingModule } from '@nestjs/testing';

import { ListProductsPaginate } from './list-products-paginate.service';
import { PaginationDto, PaginationResponseDto } from 'src/data/dtos';
import { ProductsRepository } from 'src/features/products/domain/ports';
import { ListProductsPaginateDto } from '../../dtos/list-products-paginated.dto';

describe('ListProductsPaginate', () => {
  let service: ListProductsPaginate;
  let productRepo: jest.Mocked<ProductsRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListProductsPaginate,
        {
          provide: ProductsRepository,
          useValue: {
            listProducts: jest.fn(),
            paginationProducts: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ListProductsPaginate>(ListProductsPaginate);
    productRepo = module.get(ProductsRepository);

    jest.clearAllMocks();
  });

  const filters: PaginationDto = { page: 1, limit: 10 };
  const mockProducts = [{ id: 'p1', name: 'Product 1' }];
  const mockPagination = { page: 1, total: 1 };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list and pagination when both repos succeed', async () => {
    productRepo.listProducts.mockResolvedValue({
      isOk: true,
      getData: () => mockProducts,
    } as any);

    productRepo.paginationProducts.mockResolvedValue({
      isOk: true,
      getData: () => mockPagination,
    } as any);

    const toInstanceSpy = jest.spyOn(ListProductsPaginateDto, 'toInstance');

    const result = await service.execute(filters);

    expect(productRepo.listProducts).toHaveBeenCalledWith(filters);
    expect(productRepo.paginationProducts).toHaveBeenCalledWith(filters);
    expect(toInstanceSpy).toHaveBeenCalledWith(mockProducts, mockPagination);
    expect(result).toBeInstanceOf(ListProductsPaginateDto);
  });

  it('should return empty list if listProducts fails', async () => {
    productRepo.listProducts.mockResolvedValue({
      isOk: false,
      getError: () => new Error('List failed'),
    } as any);

    productRepo.paginationProducts.mockResolvedValue({
      isOk: true,
      getData: () => mockPagination,
    } as any);

    const toInstanceSpy = jest.spyOn(ListProductsPaginateDto, 'toInstance');

    await service.execute(filters);

    expect(toInstanceSpy).toHaveBeenCalledWith([], mockPagination);
  });

  it('should return empty pagination if paginationProducts fails', async () => {
    productRepo.listProducts.mockResolvedValue({
      isOk: true,
      getData: () => mockProducts,
    } as any);

    productRepo.paginationProducts.mockResolvedValue({
      isOk: false,
      getError: () => new Error('Pagination failed'),
    } as any);

    const toInstanceSpy = jest.spyOn(ListProductsPaginateDto, 'toInstance');

    await service.execute(filters);

    expect(toInstanceSpy).toHaveBeenCalledWith(
      mockProducts,
      expect.any(PaginationResponseDto),
    );
  });
});
