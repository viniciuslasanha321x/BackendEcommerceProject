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
class AddOrderProductService {
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

    const stockVerify = (qtd: number, stock: number): void => {
      if (qtd >= stock) {
        throw new AppError('Stock does not disponible');
      }
    };

    if (order) {
      let orderItem = order.items.find(
        (item) => item.product_id === product.id
      );

      if (orderItem) {
        stockVerify(Number(orderItem.qtd), product.stock);
        orderItem.qtd = Number(orderItem.qtd) + 1;
        orderItem = await this.orderProductRepository.save(orderItem);
      } else {
        stockVerify(1, product.stock);
        orderItem = await this.orderProductRepository.create({
          order_id: order.id,
          product_id: product.id,
          price: product.price,
          qtd: 1,
        });

        order.items = [...order.items, orderItem];
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

    stockVerify(1, product.stock);

    const newOrder = await this.orderRepository.create({ user_id });

    const orderItem = await this.orderProductRepository.create({
      order_id: newOrder.id,
      product_id: product.id,
      price: product.price,
      qtd: 1,
    });

    newOrder.items = [orderItem];

    newOrder.total = orderItem.price;

    return this.orderRepository.save(newOrder);
  }
}

export default AddOrderProductService;
