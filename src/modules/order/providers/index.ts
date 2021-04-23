import { container } from 'tsyringe';

import OrderProductRepository from '../infra/typeorm/repositories/OrderProductRepository';
import IOrderProductRepository from '../repositories/IOrderProductRepository';

import OrderRepository from '../infra/typeorm/repositories/OrderRepository';
import IOrderRepository from '../repositories/IOrderRepository';

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository
);

container.registerSingleton<IOrderProductRepository>(
  'OrderProductRepository',
  OrderProductRepository
);
