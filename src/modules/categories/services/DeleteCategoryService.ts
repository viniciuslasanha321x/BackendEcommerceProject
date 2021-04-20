import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  user_id: string;
  category_id: string;
}

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, category_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user || !user.admin) {
      throw new AppError('User does not have permission', 401);
    }

    const category = await this.categoryRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category does not exist');
    }

    await this.categoryRepository.remove(category);
  }
}

export default DeleteCategoryService;
