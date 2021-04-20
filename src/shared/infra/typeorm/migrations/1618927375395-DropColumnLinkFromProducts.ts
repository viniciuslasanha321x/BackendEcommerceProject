import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class DropColumnLinkFromProducts1618927375395
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'link');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'link',
        type: 'varchar',
      })
    );
  }
}
