import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveColumnsProductsColorAndStock1619249825107
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('products', [
      new TableColumn({ name: 'color', type: 'varchar' }),
      new TableColumn({ name: 'stock', type: 'numeric' }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'color',
        type: 'varchar',
      })
    );
  }
}
