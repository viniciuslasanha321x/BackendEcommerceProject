import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';
import ICreateRepository from '@modules/products/repositories/ICategoryRepository';
import { getRepository, Repository } from 'typeorm';
import Category from '../entities/Category';

class CategoryRepository implements ICreateRepository {
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
    return this.ormRepository.findOne({ id });
  }

  async findAll(): Promise<Category[] | undefined> {
    return this.ormRepository.find();
  }
}

export default CategoryRepository;
