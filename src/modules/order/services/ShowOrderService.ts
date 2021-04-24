import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/error/AppError';
import { classToClass } from 'class-transformer';
import Order from '../infra/typeorm/entities/Order';
import IOrderRepository from '../repositories/IOrderRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowOrderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('OrderRepository')
    private orderRepository: IOrderRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<Order> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not authenticated', 401);
    }

    const order = await this.orderRepository.findByUserId(user.id);

    if (!order) {
      throw new AppError('Order does not exist');
    }

    return classToClass(order);
  }
}

export default ShowOrderService;
