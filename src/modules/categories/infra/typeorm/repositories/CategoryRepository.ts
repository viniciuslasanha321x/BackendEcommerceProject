import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';
import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import { getRepository, In, Repository } from 'typeorm';
import IFindProductCategoryDTO from '@modules/categories/dtos/IFindProductCategory';
import Category from '../entities/Category';

class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  async save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }

  async create(categoryData: ICreateProductsDTO): Promise<Category> {
    const category = this.ormRepository.create(categoryData);

    return this.ormRepository.save(category);
  }

  async findById(id: string): Promise<Category | undefined> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }

  async findAll(categories?: Array<string>): Promise<Category[] | undefined> {
    return this.ormRepository.find({
      where: categories
        ? {
            title: In(categories),
          }
        : {},
    });
  }

  async findByName({
    name,
    admin,
  }: IFindProductCategoryDTO): Promise<Category | undefined> {
    let query = this.ormRepository
      .createQueryBuilder('categories')
      .innerJoinAndSelect('categories.products', 'products')
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('products.categories', 'cate')
      .where({
        title: name,
      });

    if (!admin) {
      query = query.andWhere('products.status = true');
    }

    return query.getOne();
  }

  async remove(category: Category): Promise<void> {
    await this.ormRepository.remove(category);
  }
}

export default CategoryRepository;
