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

import User from '@modules/users/infra/typeorm/entities/User';

import { v4 as uuid } from 'uuid';
import OrderProduct from './OrderProduct';

@Entity('order')
class Order {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderProduct, (orderItem) => orderItem.order)
  items: OrderProduct[];

  @Column()
  status: string;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Order;
