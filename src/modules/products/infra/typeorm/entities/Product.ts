import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

import Category from '@modules/categories/infra/typeorm/entities/Category';
import ProductVariant from './ProductVariant';

@Entity('products')
class Product {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'products_categories',
    joinColumns: [{ name: 'product_id' }],
    inverseJoinColumns: [{ name: 'category_id' }],
  })
  categories: Category[];

  @OneToMany(() => ProductVariant, (productVariant) => productVariant.product)
  variants?: ProductVariant[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Product;
