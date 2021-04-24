import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnOrderProductColor1619270548970
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order_product',
      new TableColumn({
        name: 'color',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('order_product', 'color');
  }
}
