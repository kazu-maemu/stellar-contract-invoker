import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1741797981842 implements MigrationInterface {
    name = 'Migrations1741797981842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "func" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "params" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2fceabad52ce1b66fedf79521ae" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "func"`);
    }

}
