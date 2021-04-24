import { inject, injectable } from 'tsyringe';

import IProductRepository from '@modules/products/repositories/IProductsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/error/AppError';
import Order from '../infra/typeorm/entities/Order';
import IOrderProductRepository from '../repositories/IOrderProductRepository';
import IOrderRepository from '../repositories/IOrderRepository';

interface IRequest {
  user_id: string;
  product_id: string;
}

@injectable()
class RemoveOrderProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @inject('OrderProductRepository')
    private orderProductRepository: IOrderProductRepository
  ) {}

  async execute({ user_id, product_id }: IRequest): Promise<Order> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not authenticated', 401);
    }

    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product does not exist');
    }

    const order = await this.orderRepository.findByUserId(user_id);

    if (!order) {
      throw new AppError('Order does not exist');
    }

    const orderProduct = order.items.find(
      (item) => item.product_id === product.id
    );

    if (!orderProduct) {
      throw new AppError('Order Product does not exist');
    }

    if (Number(orderProduct.qtd) > 1) {
      orderProduct.qtd = Number(orderProduct.qtd) - 1;

      await this.orderProductRepository.save(orderProduct);

      order.items = order.items.filter((item) => {
        if (item.product_id === product_id) {
          return orderProduct;
        }
        return item;
      });
    } else {
      await this.orderProductRepository.remove(orderProduct);

      order.items = order.items.filter(
        (item) => item.product_id !== product.id
      );
    }

    order.total = Number(
      order.items
        .reduce((ac, item) => {
          return ac + item.price * item.qtd;
        }, 0)
        .toFixed(2)
    );

    return this.orderRepository.save(order);
  }
}

export default RemoveOrderProductService;
