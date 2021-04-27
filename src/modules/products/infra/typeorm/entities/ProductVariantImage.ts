import { Expose } from 'class-transformer';
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

import uploadConfig from '@config/upload';
import ProductVariant from './ProductVariant';

@Entity('products_variants_images')
class ProductVariantImage {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('uuid')
  variant_id: string;

  @Column()
  filename: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => ProductVariant, (product) => product.images)
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;

  @Expose({ name: 'url' })
  getUrl(): string | null {
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.API_BASE_URL}/files/${this.filename}`;
      case 's3':
        return `https://${uploadConfig.aws.bucket}.s3.amazonaws.com/${this.filename}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default ProductVariantImage;
