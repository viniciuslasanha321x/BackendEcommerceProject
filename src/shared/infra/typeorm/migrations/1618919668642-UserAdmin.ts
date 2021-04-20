import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuid } from 'uuid';

import BCrypt from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

const bcrypt = new BCrypt();

export default class UserAdmin1618919668642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const passwordHash = await bcrypt.generateHash('123456');
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({
        id: uuid(),
        name: 'Admin',
        email: 'admin@admin.com',
        admin: true,
        password: passwordHash,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('users')
      .where({
        email: 'admin@admin.com',
      })
      .execute();
  }
}
