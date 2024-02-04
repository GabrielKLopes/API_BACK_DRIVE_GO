import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePermissionFile1707013866618 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO "permissionsFile" (name, readfiles, writefiles, deletefiles, sharefiles, shareownfiles)
        VALUES
            ('admin', true, true, true, true, true),
            ('creator', true, true, true, false, true),
            ('guest', false, false, false, false, false);
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
