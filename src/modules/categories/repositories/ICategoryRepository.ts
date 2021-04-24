import CreateProductDTO from '../dtos/ICreateCategoryDTO';
import IFindProductCategoryDTO from '../dtos/IFindProductCategory';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoryRepository {
  save(category: Category): Promise<Category>;
  create(categoryData: CreateProductDTO): Promise<Category>;
  findById(id: string): Promise<Category | undefined>;
  findAll(categories?: Array<string>): Promise<Category[] | undefined>;
  findByName(find: IFindProductCategoryDTO): Promise<Category | undefined>;
  remove(category: Category): Promise<void>;
}
