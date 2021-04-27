import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import Product from './Product';
import ProductVariantImage from './ProductVariantImage';

@Entity('products_variants')
class ProductVariant {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('uuid')
  product_id: string;

  @Column()
  stock: number;

  @Column()
  color: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(() => ProductVariantImage, (variantImage) => variantImage.variant)
  images: ProductVariantImage[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default ProductVariant;
