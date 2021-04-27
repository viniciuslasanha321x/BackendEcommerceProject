import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokenRepository {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
  findByTokenUserId(user_id: string): Promise<UserToken | undefined>;
  setInvalid(userToken: UserToken): Promise<void>;
}
