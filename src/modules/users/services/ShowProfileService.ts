import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/error/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Users does not authenticated', 401);
    }

    return classToClass(user);
  }
}

export default ShowProfileService;
