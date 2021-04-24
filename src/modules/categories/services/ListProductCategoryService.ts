import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/error/AppError';

interface IRequest {
  cat_name: string;
  user_id?: string;
}

@injectable()
class ListProductCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ cat_name, user_id }: IRequest): Promise<Product[]> {
    const user = user_id
      ? await this.usersRepository.findById(user_id)
      : undefined;

    const findCategory = await this.categoryRepository.findByName({
      name: cat_name,
      admin: user ? user.admin : false,
    });

    if (!findCategory) {
      throw new AppError('Category does not exist');
    }

    const { products } = findCategory;

    if (!products) {
      throw new AppError('Product does not exist');
    }

    return classToClass(products);
  }
}

export default ListProductCategoryService;
