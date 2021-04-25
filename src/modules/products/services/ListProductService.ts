import { inject, injectable } from 'tsyringe';

import AppError from '@shared/error/AppError';
import { classToClass } from 'class-transformer';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IResponseProductDTO from '../dtos/IResponseProductDTO';
import IProductRepository from '../repositories/IProductRepository';

interface IRequest {
  search?: string;
  category_id?: string;
  page?: number;
  limit?: number;
  user_id?: string;
}

@injectable()
class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    search,
    category_id,
    page,
    limit,
    user_id,
  }: IRequest): Promise<IResponseProductDTO | undefined> {
    const user = user_id
      ? await this.usersRepository.findById(user_id)
      : undefined;

    const products = await this.productRepository.findAll({
      search,
      category_id,
      page,
      limit,
      admin: user ? user.admin : false,
    });

    if (!products) {
      throw new AppError('Product does not exist');
    }

    return classToClass(products);
  }
}

export default ListProductService;
