import { container } from 'tsyringe';
import ProductImageRepository from '../infra/typeorm/repositories/ProductImageRepository';

import ProductRepository from '../infra/typeorm/repositories/ProductRepository';
import IProductImageRepository from '../repositories/IProductsImagesRepository';

import IProductRepository from '../repositories/IProductsRepository';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

container.registerSingleton<IProductImageRepository>(
  'ProductImageRepository',
  ProductImageRepository
);
