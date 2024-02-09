import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1707488282784 implements MigrationInterface {
    name = 'Default1707488282784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shared_folder" ("sharedFolder_id" SERIAL NOT NULL, "email" integer, "folder_id" integer, CONSTRAINT "PK_76346ee27e8e470a6b11a1e8e22" PRIMARY KEY ("sharedFolder_id"))`);
        await queryRunner.query(`ALTER TABLE "shared_folder" ADD CONSTRAINT "FK_468edf6251dc709063af3e25d57" FOREIGN KEY ("email") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shared_folder" ADD CONSTRAINT "FK_247c7f8c30dfb341ab00b8740e4" FOREIGN KEY ("folder_id") REFERENCES "folders"("folder_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shared_folder" DROP CONSTRAINT "FK_247c7f8c30dfb341ab00b8740e4"`);
        await queryRunner.query(`ALTER TABLE "shared_folder" DROP CONSTRAINT "FK_468edf6251dc709063af3e25d57"`);
        await queryRunner.query(`DROP TABLE "shared_folder"`);
    }

}
