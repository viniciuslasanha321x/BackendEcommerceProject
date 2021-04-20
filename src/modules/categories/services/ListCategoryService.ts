import { inject, injectable } from 'tsyringe';

import AppError from '@shared/error/AppError';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

@injectable()
class ListCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();

    if (!categories) {
      throw new AppError('Category does not exist');
    }

    return categories;
  }
}

export default ListCategoryService;
