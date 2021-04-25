import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductsDTO';
import IFindAllProductsDTO from '../dtos/IFindAllProductsDTO';
import IFindProductDTO from '../dtos/IFindProductDTO';
import IResponseProductDTO from '../dtos/IResponseProductDTO';

export default interface IProductRepository {
  save(product: Product): Promise<Product>;
  create(productData: ICreateProductDTO): Promise<Product>;
  findById(find: IFindProductDTO): Promise<Product | undefined>;
  findAll(find: IFindAllProductsDTO): Promise<IResponseProductDTO | undefined>;
  remove(product: Product): Promise<void>;
}
