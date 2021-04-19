import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductsRepository';

interface IRequest {
  category: string;
}

@injectable()
class FindProductCategoryService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute({ category }: IRequest): Promise<Product[]> {
    const productsFind = await this.productRepository.findAll();

    if (!productsFind) {
      throw new AppError('Product does not exist');
    }

    const products = productsFind.filter((product) =>
      product.categories.filter((cat) => cat.title === category)
    );

    return products;
  }
}

export default FindProductCategoryService;
