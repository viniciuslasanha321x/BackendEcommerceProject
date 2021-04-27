import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

import IProductVariantImageRepository from '../repositories/IProductVariantImageRepository';

interface IRequest {
  user_id: string;
  variant_image_id: string;
}

@injectable()
class DeleteProductVariantImageService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProductVariantImageRepository')
    private productVariantImageRepository: IProductVariantImageRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ user_id, variant_image_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user || !user.admin) {
      throw new AppError('User does not have permission', 401);
    }

    const productVariantImage = await this.productVariantImageRepository.findById(
      variant_image_id
    );

    if (!productVariantImage) {
      throw new AppError('Product Variant Image does not exist');
    }

    await this.productVariantImageRepository.remove(productVariantImage);

    await this.storageProvider.deleteFile(productVariantImage.filename);
  }
}

export default DeleteProductVariantImageService;
