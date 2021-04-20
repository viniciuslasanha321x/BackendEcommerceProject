import { inject, injectable } from 'tsyringe';

import AppError from '@shared/error/AppError';
import IResponseProductDTO from '../dtos/IResponseProductDTO';
import IProductRepository from '../repositories/IProductsRepository';

interface IRequest {
  search?: string;
  page?: number;
  limit?: number;
}

@injectable()
class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute({
    search,
    page,
    limit,
  }: IRequest): Promise<IResponseProductDTO | undefined> {
    const products = await this.productRepository.findAll({
      search,
      page,
      limit,
    });

    if (!products) {
      throw new AppError('Product does not exist');
    }

    return products;
  }
}

export default ListProductService;
