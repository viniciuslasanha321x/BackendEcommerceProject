import CreateProductDTO from '../dtos/ICreateProductsDTO';
import IFindAllProductDTO from '../dtos/IFindAllProductDTO';
import IFindProductDTO from '../dtos/IFindProductDTO';
import IResponseProductDTO from '../dtos/IResponseProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductRepository {
  save(product: Product): Promise<Product>;
  create(productData: CreateProductDTO): Promise<Product>;
  findById(find: IFindProductDTO): Promise<Product | undefined>;
  findAll(find: IFindAllProductDTO): Promise<IResponseProductDTO | undefined>;
  remove(product: Product): Promise<void>;
}
