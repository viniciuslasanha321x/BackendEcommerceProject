import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';
import IProductRepository from '@modules/products/repositories/IProductsRepository';
import { getRepository, Like, Repository } from 'typeorm';
import Product from '../entities/Product';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  async create(productData: ICreateProductsDTO): Promise<Product> {
    const product = this.ormRepository.create(productData);
    return this.ormRepository.save(product);
  }

  async findById(id: string): Promise<Product | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
  }

  async findAll(search?: string): Promise<Product[] | undefined> {
    return this.ormRepository.find({
      where: search
        ? {
            title: Like(`%${search}%`),
          }
        : {},
      relations: ['categories'],
    });
  }
}

export default ProductRepository;
