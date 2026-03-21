import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProductImagePgModel } from './product-image-pg.model';

@Entity({ schema: 'store', name: 'products' })
export class ProductPgModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  slug: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @OneToMany(
    () => ProductImagePgModel,
    (productImage) => productImage.product,
    { cascade: true },
  )
  images?: ProductImagePgModel[];
}
