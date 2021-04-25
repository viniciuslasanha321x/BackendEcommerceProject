import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

interface IRequest {
  user_id: string;
  title: string;
  price: number;
  description: string;
  categories: Array<string>;
  status: boolean;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
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

    const categoriesFind = await this.categoryRepository.findAll(categories);

    if (!categoriesFind || categoriesFind.length < 1) {
      throw new AppError('Category does not exist');
    }

    const product = await this.productRepository.create({
      title,
      price,
      description,
      categories: categoriesFind,
      status,
    });

    return product;
  }
}

export default CreateProductService;
