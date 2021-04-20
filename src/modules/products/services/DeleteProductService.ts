import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/error/AppError';
import IProductRepository from '../repositories/IProductsRepository';

interface IRequest {
  user_id: string;
  product_id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ product_id, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user || !user.admin) {
      throw new AppError('User does not have permission', 401);
    }

    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product does not exist');
    }

    await this.productRepository.remove(product);
  }
}

export default DeleteProductService;
