import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';
import IFindProductDTO from '@modules/products/dtos/IFindProductDTO';
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

  async findById({
    product_id,
    admin,
  }: IFindProductDTO): Promise<Product | undefined> {
    return this.ormRepository.findOne({
      relations: ['categories', 'images'],
      where: { id: product_id, ...(!admin ? { status: true } : {}) },
    });
  }

  async findAll({
    search,
    page = 1,
    limit = 8,
    admin = false,
  }: IFindAllProductDTO): Promise<IResponseProductDTO | undefined> {
    const products = await this.ormRepository.findAndCount({
      relations: ['categories', 'images'],
      where: {
        ...(search ? { title: ILike(`%${search}%`) } : {}),
        ...(!admin ? { status: true } : {}),
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
