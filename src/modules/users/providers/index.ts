import { container } from 'tsyringe';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UserTokenRepository from '../infra/typeorm/repositories/UserTokenRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';
import IHashProvider from './HashProvider/models/IHashProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
