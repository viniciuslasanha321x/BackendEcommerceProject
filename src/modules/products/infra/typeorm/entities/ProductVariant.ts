import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import Product from './Product';

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

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default ProductVariant;
