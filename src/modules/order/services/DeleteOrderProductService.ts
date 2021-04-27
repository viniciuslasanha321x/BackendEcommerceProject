import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/error/AppError';
import IOrderProductRepository from '../repositories/IOrderProductRepository';
import IOrderRepository from '../repositories/IOrderRepository';

interface IRequest {
  user_id: string;
  order_item_id: string;
}

@injectable()
class DeleteOrderProductService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @inject('OrderProductRepository')
    private orderProductRepository: IOrderProductRepository
  ) {}

  async execute({ user_id, order_item_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not authenticated', 401);
    }

    const order = await this.orderRepository.findByUserId(user_id);

    if (!order) {
      throw new AppError('Order does not exist');
    }

    const orderProduct = order.items.find((item) => item.id === order_item_id);

    if (!orderProduct) {
      throw new AppError('Order Product does not exist');
    }

    await this.orderProductRepository.remove(orderProduct);

    order.items = order.items.filter((item) => item.id !== orderProduct.id);

    order.total = Number(
      order.items
        .reduce((ac, item) => {
          return ac + item.price * item.qtd;
        }, 0)
        .toFixed(2)
    );

    await this.orderRepository.save(order);
  }
}

export default DeleteOrderProductService;
