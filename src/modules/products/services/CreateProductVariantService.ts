import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

import ProductVariant from '../infra/typeorm/entities/ProductVariant';
import IProductRepository from '../repositories/IProductRepository';
import IProductVariantRepository from '../repositories/IProductVariantRepository';

interface IRequest {
  user_id: string;
  product_id: string;
  color: string;
  stock: number;
}

@injectable()
class CreateProductVariantService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProductVariantRepository')
    private productVariantRepository: IProductVariantRepository
  ) {}

  async execute({
    user_id,
    product_id,
    color,
    stock,
  }: IRequest): Promise<ProductVariant> {
    const user = await this.usersRepository.findById(user_id);

    if (!user || !user.admin) {
      throw new AppError('User does not have permission', 401);
    }
    const product = this.productRepository.findById({ product_id });

    if (!product) {
      throw new AppError('Product does not exist');
    }

    return this.productVariantRepository.create({
      product_id,
      color,
      stock,
    });
  }
}

export default CreateProductVariantService;
