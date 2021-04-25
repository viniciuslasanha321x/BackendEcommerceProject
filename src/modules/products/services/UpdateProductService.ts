import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

interface IRequest {
  user_id: string;
  product_id: string;
  title: string;
  price: number;
  description: string;
  categories: Array<string>;
  status: boolean;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    product_id,
    user_id,
    title,
    price,
    description,
    categories,
    status,
  }: IRequest): Promise<Product> {
    const user = await this.usersRepository.findById(user_id);

    if (!user || !user.admin) {
      throw new AppError('User does not have permission', 401);
    }

    const product = await this.productRepository.findById({
      product_id,
      admin: user.admin,
    });

    if (!product) {
      throw new AppError('Product does not exist');
    }

    const categoriesFind = await this.categoryRepository.findAll(categories);

    if (!categoriesFind || categoriesFind.length < 1) {
      throw new AppError('Category does not exist');
    }

    Object.assign(product, {
      title,
      price,
      description,
      categories: categoriesFind,
      status,
    });

    return this.productRepository.save(product);
  }
}

export default UpdateProductService;
