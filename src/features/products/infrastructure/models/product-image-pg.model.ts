import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProductPgModel } from './product-pg.model';

@Entity({ schema: 'store', name: 'product_images' })
export class ProductImagePgModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  url: string;

  @ManyToOne(() => ProductPgModel, (product) => product.images)
  product: ProductPgModel;
}
