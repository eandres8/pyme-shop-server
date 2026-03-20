import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('store.products')
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

  @Column({ type: 'text', array: true })
  sizes: string[];

  @Column({ type: 'varchar', length: 20, nullable: false })
  gender: string;
}
