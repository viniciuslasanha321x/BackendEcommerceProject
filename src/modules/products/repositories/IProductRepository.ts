import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IFindAllProductsDTO from '../dtos/IFindAllProductsDTO';
import IFindProductDTO from '../dtos/IFindProductDTO';
import IResponseProductDTO from '../dtos/IResponseProductDTO';
import IFindProductVariantDTO from '../dtos/IFindProductVariantDTO';

export default interface IProductRepository {
  save(product: Product): Promise<Product>;
  create(productData: ICreateProductDTO): Promise<Product>;
  findById(find: IFindProductDTO): Promise<Product | undefined>;
  findByVariantId(find: IFindProductVariantDTO): Promise<Product | undefined>;
  findAll(find: IFindAllProductsDTO): Promise<IResponseProductDTO | undefined>;
  remove(product: Product): Promise<void>;
}
