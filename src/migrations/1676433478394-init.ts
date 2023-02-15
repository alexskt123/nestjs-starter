import { MigrationInterface, QueryRunner } from "typeorm"

export class init1676433478394 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('starter', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('starter', true);
  }

}
