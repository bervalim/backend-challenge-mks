import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1716957969548 implements MigrationInterface {
    name = 'InitialMigration1716957969548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "name"`);
        await queryRunner.query(`CREATE TYPE "public"."genres_name_enum" AS ENUM('comedy', 'drama', 'action', 'horror', 'science_fiction')`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "name" "public"."genres_name_enum" NOT NULL DEFAULT 'comedy'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TYPE "public"."genres_name_enum"`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "name" character varying(255) NOT NULL DEFAULT 'comedy'`);
    }

}
