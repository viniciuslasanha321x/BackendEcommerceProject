import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductsRepository';

interface IRequest {
  categories?: string;
}

@injectable()
class ListProductCategoryService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute({ categories }: IRequest): Promise<Product[]> {
    const productsList = await this.productRepository.findAll();

    if (!productsList) {
      throw new AppError('Product does not exist');
    }

    return productsList;
  }
}

export default ListProductCategoryService;
