import { container } from 'tsyringe';

import CategoryRepository from '../infra/typeorm/repositories/CategoryRepository';
import ICategoryRepository from '../repositories/ICategoryRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
);
