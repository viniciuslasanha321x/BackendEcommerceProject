import ICreateProductVariantDTO from '@modules/products/dtos/ICreateProductVariantDTO';
import IProductVariantRepository from '@modules/products/repositories/IProductVariantRepository';
import { getRepository, Repository } from 'typeorm';
import ProductVariant from '../entities/ProductVariant';

class ProductVariantRepository implements IProductVariantRepository {
  private ormRepository: Repository<ProductVariant>;

  constructor() {
    this.ormRepository = getRepository(ProductVariant);
  }

  async findById(variant_id: string): Promise<ProductVariant | undefined> {
    return this.ormRepository.findOne({ id: variant_id });
  }

  async save(data: ProductVariant): Promise<ProductVariant> {
    return this.ormRepository.save(data);
  }

  async create(data: ICreateProductVariantDTO): Promise<ProductVariant> {
    const variant = this.ormRepository.create(data);

    return this.ormRepository.save(variant);
  }

  async remove(variant: ProductVariant): Promise<void> {
    await this.ormRepository.remove(variant);
  }
}

export default ProductVariantRepository;
