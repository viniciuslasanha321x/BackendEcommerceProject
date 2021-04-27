import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import User from './User';

@Entity('users_tokens')
class UserToken {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column('uuid')
  user_id: string;

  @Column()
  token: string;

  @Column({ default: true })
  is_valid: boolean;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.token) {
      this.token = uuid();
    }
  }
}

export default UserToken;
