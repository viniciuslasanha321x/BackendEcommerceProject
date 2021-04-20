import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  user_id: string;
  category_id: string;
  title: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, category_id, title }: IRequest): Promise<Category> {
    const user = await this.usersRepository.findById(user_id);

    if (!user || !user.admin) {
      throw new AppError('User does not have permission', 401);
    }

    const category = await this.categoryRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category does not exist');
    }

    if (title !== category.title) {
      const categoryName = await this.categoryRepository.findByName(title);

      if (categoryName && categoryName.id !== category_id) {
        throw new AppError('Category is exist');
      }
    }

    category.title = title;

    return this.categoryRepository.save(category);
  }
}

export default UpdateCategoryService;
