import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICreateRepository from '../repositories/ICategoryRepository';

@injectable()
class FindProductCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICreateRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();

    if (!categories) {
      throw new AppError('Categories does not exist');
    }

    return categories;
  }
}

export default FindProductCategoryService;
