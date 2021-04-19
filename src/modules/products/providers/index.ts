import { container } from 'tsyringe';

import CategoryRepository from '../infra/typeorm/repositories/CategoryRepository';
import ProductRepository from '../infra/typeorm/repositories/ProductRepository';

import ICreateRepository from '../repositories/ICategoryRepository';
import IProductRepository from '../repositories/IProductsRepository';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

container.registerSingleton<ICreateRepository>(
  'CategoryRepository',
  CategoryRepository
);
