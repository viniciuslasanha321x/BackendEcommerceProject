import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRelationsCategoryAndProducts1618843482062
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products_categories',
        columns: [
          {
            name: 'category_id',
            type: 'uuid',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'ICategoryProduct',
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            columnNames: ['category_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'IProductCategory',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('products_categories', 'ICategoryProduct');
    await queryRunner.dropForeignKey('products_categories', 'IProductCategory');

    await queryRunner.dropTable('products_categories');
  }
}
