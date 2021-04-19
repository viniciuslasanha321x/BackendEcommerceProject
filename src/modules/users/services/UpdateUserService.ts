import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/error/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IUserProps {
  id: string;
  name: string;
  email: string;
  old_password?: string;
  new_password?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({
    id,
    name,
    email,
    new_password,
    old_password,
  }: IUserProps): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not authenticated', 401);
    }

    if (new_password && !old_password) {
      throw new AppError('Enter the old password to continue');
    }

    if (new_password && old_password) {
      const verifyOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      );

      if (!verifyOldPassword) {
        throw new AppError('Old password invalid');
      }

      user.password = await this.hashProvider.generateHash(new_password);
    }

    if (user.email !== email) {
      const emailExit = await this.usersRepository.findByEmail(email);

      if (emailExit && emailExit.id !== user.id) {
        throw new AppError('Email is register field');
      }

      user.email = email;
    }

    user.name = name;

    await this.usersRepository.save(user);

    return classToClass(user);
  }
}

export default UpdateUserService;
