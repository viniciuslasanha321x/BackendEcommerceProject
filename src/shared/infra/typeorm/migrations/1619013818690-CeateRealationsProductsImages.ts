import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CeateRealationsProductsImages1619013818690
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products_images',
        columns: [
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'image_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_product_image',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_image_product',
            referencedTableName: 'images',
            referencedColumnNames: ['id'],
            columnNames: ['image_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products_images');
  }
}
