import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePermission1707013858640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO permissions (name, type) VALUES ('admin', true), ('colaborator', false)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
