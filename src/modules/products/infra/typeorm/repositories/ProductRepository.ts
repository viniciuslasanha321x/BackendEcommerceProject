import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IFindAllProductsDTO from '@modules/products/dtos/IFindAllProductsDTO';
import IFindProductDTO from '@modules/products/dtos/IFindProductDTO';
import IFindProductVariantDTO from '@modules/products/dtos/IFindProductVariantDTO';
import IResponseProductDTO from '@modules/products/dtos/IResponseProductDTO';
import IProductRepository from '@modules/products/repositories/IProductRepository';
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

  async create(productData: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(productData);
    return this.ormRepository.save(product);
  }

  async findByVariantId({
    variant_id,
    admin,
  }: IFindProductVariantDTO): Promise<Product | undefined> {
    let query = this.ormRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.variants', 'variants')
      .andWhere('variants.id = :variantId', { variantId: variant_id });

    if (!admin) {
      query = query.where({
        status: true,
      });
    }

    return query.getOne();
  }

  async findById({
    product_id,
    admin,
  }: IFindProductDTO): Promise<Product | undefined> {
    return this.ormRepository.findOne({
      relations: ['categories', 'variants'],
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
      .leftJoinAndSelect('products.variants', 'variants')
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
