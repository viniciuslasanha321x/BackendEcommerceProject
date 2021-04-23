import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

import Category from '@modules/categories/infra/typeorm/entities/Category';
import Image from './Images';

@Entity('products')
class Product {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  title: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column()
  description: string;

  @Column()
  color: string;

  @Column()
  stock: number;

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

  @ManyToMany(() => Image, (image) => image.products)
  @JoinTable({
    name: 'products_images',
    joinColumns: [{ name: 'product_id' }],
    inverseJoinColumns: [{ name: 'image_id' }],
  })
  images: Image[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Product;
