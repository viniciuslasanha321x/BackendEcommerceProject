import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

import ProductVariantImage from '../infra/typeorm/entities/ProductVariantImage';
import IProductVariantImageRepository from '../repositories/IProductVariantImageRepository';
import IProductVariantRepository from '../repositories/IProductVariantRepository';

interface IRequest {
  user_id: string;
  variant_id: string;
  filename: string;
}

@injectable()
class CreateProductVariantImageService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProductVariantRepository')
    private productVariantRepository: IProductVariantRepository,

    @inject('ProductVariantImageRepository')
    private productVariantImageRepository: IProductVariantImageRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({
    user_id,
    variant_id,
    filename,
  }: IRequest): Promise<ProductVariantImage> {
    const user = await this.usersRepository.findById(user_id);

    if (!user || !user.admin) {
      await this.storageProvider.deleteFile(filename);
      throw new AppError('User does not have permission', 401);
    }

    const productVariant = await this.productVariantRepository.findById(
      variant_id
    );

    if (!productVariant) {
      await this.storageProvider.deleteFile(filename);
      throw new AppError('Product Variant does not exist');
    }

    const variantImage = await this.productVariantImageRepository.create({
      variant_id,
      filename,
    });

    await this.storageProvider.saveFile(variantImage.filename);

    return variantImage;
  }
}

export default CreateProductVariantImageService;
