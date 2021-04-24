import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { v4 as uuid } from 'uuid';

import Order from '@modules/order/infra/typeorm/entities/Order';

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @Expose({ name: 'url' })
  getUrl(): string | null {
    if (!this.avatar) return null;

    return `http://localhost:3333/files/${this.avatar}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default User;
