import { ProductPgModel } from 'src/features/products/infrastructure/models';
import { ProductMapper } from './product.mapper';
import { Product } from 'src/features/products/domain/entities';

describe('ProductMapper', () => {
  const productPgModel: ProductPgModel = {
    id: 'prod1',
    title: 'Product 1',
    description: 'Desc 1',
    slug: 'prod-1',
    price: 100,
    stock: 10,
    images: [{ url: 'img1.jpg' } as any, { url: 'img2.jpg' } as any],
  };

  it('toProduct should convert ProductPgModel to Product', () => {
    const result = ProductMapper.toProduct(productPgModel);

    expect(result).toBeInstanceOf(Product);
  });

  it('toProduct should handle empty images array', () => {
    const result = ProductMapper.toProduct(productPgModel);

    expect(result.images).toEqual([]);
  });
});
