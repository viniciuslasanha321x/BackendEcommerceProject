import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({ email, name, password }: IRequest): Promise<User> {
    const userEmail = await this.userRepository.findByEmail(email);

    if (userEmail) {
      throw new AppError('Email is already exists');
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return classToClass(user);
  }
}

export default CreateUserService;
