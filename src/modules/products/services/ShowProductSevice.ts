import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductsRepository';

interface IRequest {
  product_id: string;
}

@injectable()
class showProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute({ product_id }: IRequest): Promise<Product> {
    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product does not exist');
    }

    return product;
  }
}

export default showProductService;
