import { getRepository, Repository } from 'typeorm';

import ICreateProductVariantImageDTO from '@modules/products/dtos/ICreateProductVariantImageDTO';
import IProductVariantImageRepository from '@modules/products/repositories/IProductVariantImageRepository';
import ProductVariantImage from '../entities/ProductVariantImage';

class ProductVariantImageRepository implements IProductVariantImageRepository {
  private ormRepository: Repository<ProductVariantImage>;

  constructor() {
    this.ormRepository = getRepository(ProductVariantImage);
  }

  async save(data: ProductVariantImage): Promise<ProductVariantImage> {
    return this.ormRepository.save(data);
  }

  async findById(image_id: string): Promise<ProductVariantImage | undefined> {
    return this.ormRepository.findOne({ id: image_id });
  }

  async create(
    data: ICreateProductVariantImageDTO
  ): Promise<ProductVariantImage> {
    const variantImage = this.ormRepository.create(data);

    return this.ormRepository.save(variantImage);
  }

  async remove(variantImage: ProductVariantImage): Promise<void> {
    await this.ormRepository.remove(variantImage);
  }
}

export default ProductVariantImageRepository;
