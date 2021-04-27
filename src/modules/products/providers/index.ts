import { container } from 'tsyringe';

import ProductRepository from '../infra/typeorm/repositories/ProductRepository';
import ProductVariantImageRepository from '../infra/typeorm/repositories/ProductVariantImageRepository';
import ProductVariantRepository from '../infra/typeorm/repositories/ProductVariantRepository';

import IProductRepository from '../repositories/IProductRepository';
import IProductVariantImageRepository from '../repositories/IProductVariantImageRepository';
import IProductVariantRepository from '../repositories/IProductVariantRepository';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

container.registerSingleton<IProductVariantRepository>(
  'ProductVariantRepository',
  ProductVariantRepository
);

container.registerSingleton<IProductVariantImageRepository>(
  'ProductVariantImageRepository',
  ProductVariantImageRepository
);
