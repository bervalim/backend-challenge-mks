import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1716960824305 implements MigrationInterface {
    name = 'InitialMigration1716960824305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ADD "year" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "year"`);
    }

}
