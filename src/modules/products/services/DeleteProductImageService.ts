import { injectable, inject } from 'tsyringe';

import AppError from '@shared/error/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IProductRepository from '../repositories/IProductsRepository';
import IProductImageRepository from '../repositories/IProductsImagesRepository';

interface IUserAvarProps {
  user_id: string;
  product_id: string;
  image_id: string;
}

@injectable()
class DeleteProductImageService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('ProductImageRepository')
    private productImageRepository: IProductImageRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({
    user_id,
    product_id,
    image_id,
  }: IUserAvarProps): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user || !user.admin) {
      throw new AppError('User does not have permission', 401);
    }

    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product does not exist');
    }

    const file = product.images.find((image) => image.id === image_id);

    if (!file) {
      throw new AppError('Image does not exist');
    }

    await this.productImageRepository.remove(file);

    await this.storageProvider.deleteFile(file.filename);
  }
}

export default DeleteProductImageService;
