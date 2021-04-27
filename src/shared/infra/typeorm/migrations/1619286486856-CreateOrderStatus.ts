import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrderStatus1619286486856
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_status',
        columns: [
          {
            name: 'status',
            type: 'varchar(15)',
            isPrimary: true,
          },
        ],
      })
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('order_status')
      .values([
        {
          status: 'PENDING',
        },
        {
          status: 'SENT',
        },
        {
          status: 'RETURNED',
        },
        {
          status: 'CANCELED',
        },
        {
          status: 'FINISHED',
        },
        {
          status: 'APPROVED',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_status');
  }
}
