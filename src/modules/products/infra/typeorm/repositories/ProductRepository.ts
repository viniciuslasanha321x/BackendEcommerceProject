import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';
import IFindAllProductDTO from '@modules/products/dtos/IFindAllProductDTO';
import IResponseProductDTO from '@modules/products/dtos/IResponseProductDTO';
import IProductRepository from '@modules/products/repositories/IProductsRepository';
import { getRepository, ILike, Repository } from 'typeorm';
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
      relations: ['categories', 'images'],
    });
  }

  async findAll({
    search,
    page = 1,
    limit = 8,
  }: IFindAllProductDTO): Promise<IResponseProductDTO | undefined> {
    const products = await this.ormRepository.findAndCount({
      relations: ['categories', 'images'],
      where: {
        ...(search ? { title: ILike(`%${search}%`) } : {}),
      },
      order: {
        updated_at: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      products: products[0],
      pages: {
        page,
        of: Math.ceil(products[1] / limit),
      },
    };
  }

  async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }
}

export default ProductRepository;
