import ICreateProductVariantDTO from '../dtos/ICreateProductVariantDTO';
import ProductVariant from '../infra/typeorm/entities/ProductVariant';

export default interface IProductVariantRepository {
  save(data: ProductVariant): Promise<ProductVariant>;
  create(data: ICreateProductVariantDTO): Promise<ProductVariant>;
  findById(variant_id: string): Promise<ProductVariant | undefined>;
  remove(variant: ProductVariant): Promise<void>;
}
