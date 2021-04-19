import CreateProductDTO from '../dtos/ICreateProductsDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductRepository {
  save(product: Product): Promise<Product>;
  create(productData: CreateProductDTO): Promise<Product>;
  findById(id: string): Promise<Product | undefined>;
  findAll(search?: string): Promise<Product[] | undefined>;
}
