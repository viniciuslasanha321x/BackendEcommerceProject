import { container } from 'tsyringe';

import ProductRepository from '../infra/typeorm/repositories/ProductRepository';
import ProductVariantRepository from '../infra/typeorm/repositories/ProductVariantRepository';

import IProductRepository from '../repositories/IProductRepository';
import IProductVariantRepository from '../repositories/IProductVariantRepository';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

container.registerSingleton<IProductVariantRepository>(
  'ProductVariantRepository',
  ProductVariantRepository
);
