import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1741794241615 implements MigrationInterface {
    name = 'Migrations1741794241615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "key_pair" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "pub_key" character varying(255) NOT NULL, "sec_key" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7ff350a8546214b80dfdd52bcb2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "key_pair"`);
    }

}
