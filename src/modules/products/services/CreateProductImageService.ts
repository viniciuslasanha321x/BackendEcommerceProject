import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/error/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IProductRepository from '../repositories/IProductsRepository';
import IProductImageRepository from '../repositories/IProductsImagesRepository';
import Image from '../infra/typeorm/entities/Images';

interface IUserAvarProps {
  user_id: string;
  product_id: string;
  filename: string;
}

@injectable()
class CreateProductImageService {
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
    filename,
  }: IUserAvarProps): Promise<Image> {
    const user = await this.usersRepository.findById(user_id);

    if (!user || !user.admin) {
      await this.storageProvider.deleteFile(filename);
      throw new AppError('User does not have permission', 401);
    }

    const product = await this.productRepository.findById(product_id);

    if (!product) {
      await this.storageProvider.deleteFile(filename);
      throw new AppError('Product does not exist');
    }

    const filenameOnSave = await this.storageProvider.saveFile(filename);

    const productImage = await this.productImageRepository.create({
      product,
      filename: filenameOnSave,
    });

    return classToClass(productImage);
  }
}

export default CreateProductImageService;
