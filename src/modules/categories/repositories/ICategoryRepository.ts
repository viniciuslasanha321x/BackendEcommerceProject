import CreateProductDTO from '../dtos/ICreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoryRepository {
  save(category: Category): Promise<Category>;
  create(categoryData: CreateProductDTO): Promise<Category>;
  findById(id: string): Promise<Category | undefined>;
  findAll(categories?: Array<string>): Promise<Category[] | undefined>;
  findByName(name: string): Promise<Category | undefined>;
  remove(category: Category): Promise<void>;
}
