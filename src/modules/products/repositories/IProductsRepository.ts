import CreateProductDTO from '../dtos/ICreateProductsDTO';
import IFindAllProductDTO from '../dtos/IFindAllProductDTO';
import IResponseProductDTO from '../dtos/IResponseProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductRepository {
  save(product: Product): Promise<Product>;
  create(productData: CreateProductDTO): Promise<Product>;
  findById(id: string): Promise<Product | undefined>;
  findAll(find: IFindAllProductDTO): Promise<IResponseProductDTO | undefined>;
  remove(product: Product): Promise<void>;
}
