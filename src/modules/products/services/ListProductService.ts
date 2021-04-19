import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductsRepository';

interface IRequest {
  category?: string;
}

@injectable()
class ListProductCategoryService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute({ category }: IRequest): Promise<Product[]> {
    let products = await this.productRepository.findAll();

    if (!products) {
      throw new AppError('Product does not exist');
    }

    if (category) {
      products = products.filter((product) =>
        product.categories.filter((cat) => cat.title === category)
      );
    }

    return products;
  }
}

export default ListProductCategoryService;
