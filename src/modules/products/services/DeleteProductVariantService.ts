import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/error/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IProductVariantRepository from '../repositories/IProductVariantRepository';

interface IRequest {
  user_id: string;
  variant_id: string;
}

@injectable()
class DeleteProductVariantService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProductVariantRepository')
    private productVariantRepository: IProductVariantRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ user_id, variant_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user || !user.admin) {
      throw new AppError('User does not have permission', 401);
    }

    const productVariant = await this.productVariantRepository.findById(
      variant_id
    );

    if (!productVariant) {
      throw new AppError('Product Variant does not exist');
    }

    await this.productVariantRepository.remove(productVariant);

    productVariant.images.forEach(async (image) => {
      await this.storageProvider.deleteFile(image.filename);
    });
  }
}

export default DeleteProductVariantService;
