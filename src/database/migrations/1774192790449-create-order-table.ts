import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderTable1774192790449 implements MigrationInterface {
  name = 'CreateOrderTable1774192790449';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "store"."order_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderId" uuid NOT NULL, "productId" character varying NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "store"."orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" text NOT NULL, "total" numeric(10,2) NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "store"."order_items" ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES "store"."orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "store"."order_items" DROP CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d"`,
    );
    await queryRunner.query(`DROP TABLE "store"."orders"`);
    await queryRunner.query(`DROP TABLE "store"."order_items"`);
  }
}
