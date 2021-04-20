import { container } from 'tsyringe';

import ProductRepository from '../infra/typeorm/repositories/ProductRepository';

import IProductRepository from '../repositories/IProductsRepository';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);
