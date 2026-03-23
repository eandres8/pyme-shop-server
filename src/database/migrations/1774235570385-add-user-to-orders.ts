import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserToOrders1774235570385 implements MigrationInterface {
  name = 'AddUserToOrders1774235570385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "store"."orders" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "store"."orders" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "store"."orders" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "store"."orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "store"."orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store"."orders" DROP COLUMN "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store"."orders" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store"."orders" DROP COLUMN "createdAt"`,
    );
  }
}
