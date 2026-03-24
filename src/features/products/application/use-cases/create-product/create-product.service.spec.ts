import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { CreateProduct } from './create-product.service';
import { ProductsRepository } from 'src/features/products/domain/ports';
import { CreateProductDto } from '../../dtos';

describe('CreateProduct', () => {
  let service: CreateProduct;
  let productRepo: jest.Mocked<ProductsRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProduct,
        {
          provide: ProductsRepository,
          useValue: {
            createProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateProduct>(CreateProduct);
    productRepo = module.get(ProductsRepository);

    jest.clearAllMocks();
  });

  const mockProductDto: CreateProductDto = {
    title: 'Product 1',
    price: 100,
    description: '',
    slug: '',
    stock: 0,
  };

  const mockProductData = { id: 'p1', ...mockProductDto };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create product successfully', async () => {
    productRepo.createProduct.mockResolvedValue({
      isOk: true,
      getData: () => mockProductData,
    } as any);

    const result = await service.execute(mockProductDto);

    expect(productRepo.createProduct).toHaveBeenCalledWith(mockProductDto);
    expect(result).toBe(mockProductData);
  });

  it('should throw BadRequestException if repository fails', async () => {
    productRepo.createProduct.mockResolvedValue({
      isOk: false,
      getError: () => new Error('DB error'),
    } as any);

    await expect(service.execute(mockProductDto)).rejects.toThrow(
      BadRequestException,
    );
  });
});
