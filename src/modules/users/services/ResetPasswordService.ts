import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  token: string;
  new_password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository
  ) {}

  async create({ token, new_password }: IRequest): Promise<void> {
    const findToken = await this.userTokenRepository.findByToken(token);

    if (!findToken) {
      throw new AppError('Token is invalid');
    }

    const user = await this.usersRepository.findById(findToken.user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    user.password = await this.hashProvider.generateHash(new_password);

    await this.usersRepository.save(user);

    await this.userTokenRepository.setInvalid(findToken);
  }
}

export default ResetPasswordService;
