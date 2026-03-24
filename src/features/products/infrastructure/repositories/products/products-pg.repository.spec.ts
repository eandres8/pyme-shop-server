import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, ILike, In } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

import { ProductsPgRepository } from './products-pg.repository';
import { PaginationDto } from 'src/data/dtos';
import { ProductMapper } from 'src/features/products/application/mappers';
import { Product } from 'src/features/products/domain/entities';
import { ProductPgModel } from '../../models';

describe('ProductsPgRepository', () => {
  let repository: ProductsPgRepository;
  let repo: jest.Mocked<Repository<ProductPgModel>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsPgRepository,
        {
          provide: getRepositoryToken(ProductPgModel),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            count: jest.fn(),
            findBy: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ProductsPgRepository>(ProductsPgRepository);
    repo = module.get(getRepositoryToken(ProductPgModel));

    jest.clearAllMocks();
  });

  const mockDto = { title: 'Prod 1', slug: 'prod-1', price: 100 };
  const mockProduct = { id: 'p1', ...mockDto } as Product;
  const mockProductModel: ProductPgModel = {
    id: 'p1',
    description: '',
    stock: 0,
    title: '',
    slug: '',
    price: 0,
  };

  describe('createProduct', () => {
    it('should create product successfully', async () => {
      jest.spyOn(ProductMapper, 'toProduct').mockReturnValue(mockProduct);

      repo.create.mockReturnValue(mockProductModel as any);
      repo.save.mockResolvedValue(mockProductModel);

      const result = await repository.createProduct(mockDto as any);

      expect(repo.create).toHaveBeenCalledWith(mockDto);
      expect(repo.save).toHaveBeenCalledWith(mockProductModel);
      expect(result.isOk).toBe(true);
      expect(result.getData()).toBe(mockProduct);
    });

    it('should return failure if save throws generic error', async () => {
      repo.create.mockReturnValue(mockProductModel as any);
      repo.save.mockRejectedValue(new Error('DB error'));

      const result = await repository.createProduct(mockDto as any);

      expect(result.isOk).toBe(false);
      expect(result.getError()).toBeInstanceOf(Error);
    });

    it('should return failure with duplicate slug message if code 23505', async () => {
      repo.create.mockReturnValue(mockProductModel as any);
      repo.save.mockRejectedValue({ code: '23505', message: 'duplicate' });

      const result = await repository.createProduct(mockDto as any);

      expect(result.isOk).toBe(false);
      expect(result.getError().message).toBe(
        `El producto ${mockDto.slug} ya existe`,
      );
    });
  });

  describe('listProducts', () => {
    const filters: PaginationDto = { page: 1, limit: 10 };

    it('should list products successfully', async () => {
      jest.spyOn(ProductMapper, 'toProduct').mockReturnValue(mockProduct);

      repo.find.mockResolvedValue([mockProductModel] as any);

      const result = await repository.listProducts(filters);

      expect(repo.find).toHaveBeenCalledWith({
        take: filters.limit,
        skip: 0,
        relations: { images: true },
      });

      expect(result.isOk).toBe(true);
      expect(result.getData()).toEqual([mockProduct]);
    });

    it('should return failure if find throws', async () => {
      repo.find.mockRejectedValue(new Error('DB error'));

      const result = await repository.listProducts(filters);

      expect(result.isOk).toBe(false);
      expect(result.getError()).toBeInstanceOf(NotFoundException);
    });
  });

  describe('paginationProducts', () => {
    const filters: PaginationDto = { page: 1, limit: 10 };

    it('should return pagination successfully', async () => {
      repo.count.mockResolvedValue(25 as any);

      const result = await repository.paginationProducts(filters);

      expect(repo.count).toHaveBeenCalledWith({});
      expect(result.isOk).toBe(true);
      expect(result.getData()).toEqual({
        total: 25,
        page: 1,
        limit: 10,
        totalPages: 3,
      });
    });

    it('should return failure if count throws', async () => {
      repo.count.mockRejectedValue(new Error('DB error'));

      const result = await repository.paginationProducts(filters);

      expect(result.isOk).toBe(false);
      expect(result.getError()).toBeInstanceOf(NotFoundException);
    });
  });

  describe('findByIdList', () => {
    it('should return products successfully', async () => {
      jest.spyOn(ProductMapper, 'toProduct').mockReturnValue(mockProduct);

      repo.findBy.mockResolvedValue([mockProductModel] as any);

      const result = await repository.findByIdList(['p1']);

      expect(repo.findBy).toHaveBeenCalledWith({ id: In(['p1']) });
      expect(result.isOk).toBe(true);
      expect(result.getData()).toEqual([mockProduct]);
    });

    it('should return failure if findBy throws', async () => {
      repo.findBy.mockRejectedValue(new Error('DB error'));

      const result = await repository.findByIdList(['p1']);

      expect(result.isOk).toBe(false);
      expect(result.getError()).toBeInstanceOf(BadRequestException);
    });
  });

  describe('searchProducts', () => {
    const filters: PaginationDto = { page: 1, limit: 10 };
    const query = 'test';

    it('should search products successfully', async () => {
      jest.spyOn(ProductMapper, 'toProduct').mockReturnValue(mockProduct);

      repo.find.mockResolvedValue([mockProductModel] as any);

      const result = await repository.searchProducts(query, filters);

      expect(repo.find).toHaveBeenCalledWith({
        where: { title: ILike(`%${query}%`) },
        take: filters.limit,
        skip: 0,
        relations: { images: true },
      });
      expect(result.isOk).toBe(true);
      expect(result.getData()).toEqual([mockProduct]);
    });

    it('should return failure if find throws', async () => {
      repo.find.mockRejectedValue(new Error('DB error'));

      const result = await repository.searchProducts(query, filters);

      expect(result.isOk).toBe(false);
      expect(result.getError()).toBeInstanceOf(BadRequestException);
    });
  });
});
