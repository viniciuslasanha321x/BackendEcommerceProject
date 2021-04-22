import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Exclude, Expose } from 'class-transformer';
import Product from './Product';

@Entity('images')
class Image {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  filename: string;

  @ManyToMany(() => Product, (product) => product.images)
  @Exclude()
  products: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'url' })
  getUrl(): string | null {
    return `http://localhost:3333/files/${this.filename}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Image;
