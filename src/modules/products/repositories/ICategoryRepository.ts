import CreateProductDTO from '../dtos/ICreateProductsDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface ICreateRepository {
  save(category: Category): Promise<Category>;
  create(categoryData: CreateProductDTO): Promise<Category>;
  findById(id: string): Promise<Category | undefined>;
  findAll(search?: Array<string>): Promise<Category[] | undefined>;
}
