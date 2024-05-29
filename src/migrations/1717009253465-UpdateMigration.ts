import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMigration1717009253465 implements MigrationInterface {
    name = 'UpdateMigration1717009253465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" RENAME COLUMN "description" TO "hour"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" RENAME COLUMN "hour" TO "description"`);
    }

}
