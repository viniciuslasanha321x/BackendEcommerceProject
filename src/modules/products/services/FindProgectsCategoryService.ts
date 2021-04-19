import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import ICreateRepository from '../repositories/ICategoryRepository';
import IProductRepository from '../repositories/IProductsRepository';

interface IRequest {
  title: string;
  price: number;
  description: string;
  stock: string;
  link: string;
  categories: Array<string>;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute({
    title,
    price,
    description,
    stock,
    link,
    categories,
  }: IRequest): Promise<Product> {
    const projects = await this.pro.findAll(categories);

    if (!categoriesFind) {
      throw new AppError('Category does not exist');
    }

    const product = this.productRepository.create({
      title,
      price,
      description,
      stock,
      link,
      categories: categoriesFind,
    });

    return product;
  }
}

export default CreateProductService;
