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

import Category from './Category';

@Entity('product')
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
  stock: string;

  @Column()
  link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Category, (category) => category.product)
  @JoinTable({
    name: 'products_categories',
    joinColumns: [{ name: 'product_id' }],
    inverseJoinColumns: [{ name: 'category_id' }],
  })
  categories: Category[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Product;
