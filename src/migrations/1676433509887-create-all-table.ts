import { MigrationInterface, QueryRunner, Table, TableColumnOptions } from "typeorm"

export class createAllTable1676433509887 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const commonFields = [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        generationStrategy: 'increment',
        isGenerated: true,
      },
      {
        name: 'createdAt',
        default: 'now()',
        type: 'timestamp with time zone',
      },
      {
        name: 'updatedAt',
        default: 'now()',
        type: 'timestamp with time zone',
      },
      {
        name: 'version',
        type: 'integer',
        default: 1,
      },
    ] as TableColumnOptions[];

    // Table with no FK
    await queryRunner.createTable(
      new Table({
        name: 'Warehouses',
        columns: [
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'location',
            type: 'varchar',
          },
          ...commonFields,
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'Countries',
        columns: [
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'code',
            type: 'varchar',
          },
          ...commonFields,
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'Goods',
        columns: [
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'quantity',
            type: 'integer',
          },
          {
            name: 'price',
            type: 'numeric',
          },
          {
            name: 'warehouseId',
            type: 'integer',
          },
          ...commonFields,
        ],
        foreignKeys: [
          {
            columnNames: ['warehouseId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Warehouses',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }

}
