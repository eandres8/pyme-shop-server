import { Product } from '../../domain/entities';
import { ProductPgModel } from '../../infrastructure/models';

export class ProductMapper {
  static toProduct(product: ProductPgModel): Product {
    return Product.toInstance({
      id: product.id,
      title: product.title,
      description: product.description,
      slug: product.slug,
      price: product.price,
      stock: product.stock,
      images: product?.images?.map((image) => image.url) || [],
    });
  }
}
