import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  cat_name: string;
}

@injectable()
class ListProductCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}

  async execute({ cat_name }: IRequest): Promise<Product[]> {
    const findCategory = await this.categoryRepository.findByName(cat_name);

    if (!findCategory) {
      throw new AppError('Category does not exist');
    }

    const { products } = findCategory;

    if (!products) {
      throw new AppError('Product does not exist');
    }

    return products;
  }
}

export default ListProductCategoryService;
