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
import ProductVariant from '@modules/products/infra/typeorm/entities/ProductVariant';
import Order from './Order';

@Entity('order_products_variants')
class OrderProduct {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('uuid')
  order_id: string;

  @Column('uuid')
  variant_id: string;

  @Column()
  price: number;

  @Column()
  qtd: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => ProductVariant)
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default OrderProduct;
