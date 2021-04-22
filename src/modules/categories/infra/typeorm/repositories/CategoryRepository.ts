import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';
import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import { getRepository, In, Repository } from 'typeorm';
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

  async findByName(name: string): Promise<Category | undefined> {
    return this.ormRepository.findOne({
      where: {
        title: name,
      },
      relations: ['products', 'products.categories', 'products.images'],
    });
  }

  async remove(category: Category): Promise<void> {
    await this.ormRepository.remove(category);
  }
}

export default CategoryRepository;
