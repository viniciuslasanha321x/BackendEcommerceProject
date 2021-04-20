import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  user_id: string;
  title: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, title }: IRequest): Promise<Category> {
    const user = await this.usersRepository.findById(user_id);

    if (!user || !user.admin) {
      throw new AppError('User does not have permission', 401);
    }

    const categoriesFind = await this.categoryRepository.findAll([title]);

    if (categoriesFind && categoriesFind.length > 0) {
      throw new AppError('Category is exist');
    }

    const category = this.categoryRepository.create({
      title,
    });

    return category;
  }
}

export default CreateCategoryService;
