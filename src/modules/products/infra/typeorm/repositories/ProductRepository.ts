import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';
import IFindAllProductsDTO from '@modules/products/dtos/IFindAllProductsDTO';
import IFindProductDTO from '@modules/products/dtos/IFindProductDTO';
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

  async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  async findAll({
    category_id,
    page = 1,
    limit = 8,
    admin = false,
    search,
  }: IFindAllProductsDTO): Promise<IResponseProductDTO | undefined> {
    let query = this.ormRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.categories', 'categories')
      .leftJoinAndSelect('products.images', 'images')
      .where({
        title: ILike(`%${search}%`),
        ...(!admin ? { status: true } : {}),
      })
      .take(limit)
      .skip(page - 1);

    if (category_id) {
      query = query.andWhere('categories.id = :categoryId', {
        categoryId: category_id,
      });
    }

    const result = await query.getManyAndCount();

    return {
      products: result[0],
      pages: {
        page,
        of: Math.ceil(result[1] / limit),
      },
    };
  }
}

export default ProductRepository;
