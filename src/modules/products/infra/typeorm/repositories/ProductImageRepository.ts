import ICreateProductImageDTO from '@modules/products/dtos/ICreateProductImageDTO';
import IProductImageRepository from '@modules/products/repositories/IProductsImagesRepository';
import { getRepository, Repository } from 'typeorm';
import Image from '../entities/Images';

class ProductImageRepository implements IProductImageRepository {
  private ormRepository: Repository<Image>;

  constructor() {
    this.ormRepository = getRepository(Image);
  }

  async create({ product, filename }: ICreateProductImageDTO): Promise<Image> {
    const image = this.ormRepository.create({ filename, products: [product] });
    const result = await this.ormRepository.save(image);
    return result;
  }

  async remove(file: Image): Promise<void> {
    await this.ormRepository.remove(file);
  }
}

export default ProductImageRepository;
