import CreateUserDTO from '../dtos/CreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  save(user: User): Promise<User>;
  create(userData: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
