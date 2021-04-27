import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import { getRepository, Repository, Raw } from 'typeorm';
import { format } from 'date-fns';

import UserToken from '../entities/UserToken';

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  findByTokenUserId(user_id: string): Promise<UserToken | undefined> {
    const dateNow = new Date();

    dateNow.setHours(dateNow.getHours() - 1);

    return this.ormRepository.findOne({
      where: {
        user_id,
        is_valid: true,
        created_at: Raw(
          (date) => `
          to_char(${date}, 'YYYY-MM-DD HH24') >= '${format(
            dateNow,
            'yyyy-MM-dd HH'
          )}'
        `
        ),
      },
    });
  }

  findByToken(token: string): Promise<UserToken | undefined> {
    const dateNow = new Date();

    dateNow.setHours(dateNow.getHours() - 1);

    return this.ormRepository.findOne({
      where: {
        token,
        is_valid: true,
        created_at: Raw(
          (date) => `
          to_char(${date}, 'YYYY-MM-DD HH24') >= '${format(
            dateNow,
            'yyyy-MM-dd HH'
          )}'
        `
        ),
      },
    });
  }

  async setInvalid(userToken: UserToken): Promise<void> {
    const token = userToken;

    token.is_valid = false;

    await this.ormRepository.save(token);
  }

  async generate(user_id: string): Promise<UserToken> {
    const token = this.ormRepository.create({
      user_id,
    });

    return this.ormRepository.save(token);
  }
}

export default UserTokenRepository;
