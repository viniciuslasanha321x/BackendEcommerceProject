import {
  Entity,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('categories')
class Category {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Category;
