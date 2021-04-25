import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/error/AppError';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

interface IRequest {
  product_id: string;
  user_id?: string;
}

@injectable()
class showProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ product_id, user_id }: IRequest): Promise<Product> {
    const user = user_id
      ? await this.usersRepository.findById(user_id)
      : undefined;

    const product = await this.productRepository.findById({
      product_id,
      admin: user ? user.admin : false,
    });

    if (!product) {
      throw new AppError('Product does not exist');
    }

    return classToClass(product);
  }
}

export default showProductService;
