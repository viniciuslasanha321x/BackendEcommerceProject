import ICreateProductVariantImageDTO from '../dtos/ICreateProductVariantImageDTO';
import ProductVariantImage from '../infra/typeorm/entities/ProductVariantImage';

export default interface IProductVariantImageRepository {
  save(data: ProductVariantImage): Promise<ProductVariantImage>;
  findById(image_id: string): Promise<ProductVariantImage | undefined>;
  create(data: ICreateProductVariantImageDTO): Promise<ProductVariantImage>;
  remove(variantImage: ProductVariantImage): Promise<void>;
}
