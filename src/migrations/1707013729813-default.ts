import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1707013729813 implements MigrationInterface {
    name = 'Default1707013729813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissionsFile" ("permissionFile_id" SERIAL NOT NULL, "name" character varying NOT NULL, "readfiles" boolean NOT NULL DEFAULT false, "writefiles" boolean NOT NULL DEFAULT false, "deletefiles" boolean NOT NULL DEFAULT false, "sharefiles" boolean NOT NULL DEFAULT false, "shareownfiles" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4bcceb334019d7c17efcd2b75f9" PRIMARY KEY ("permissionFile_id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("permission_id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1717db2235a5b169822e7f753b1" PRIMARY KEY ("permission_id"))`);
        await queryRunner.query(`CREATE TABLE "fileTypes" ("fileType_id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_31bafbc9f4d6852b1833076629d" PRIMARY KEY ("fileType_id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("file_id" SERIAL NOT NULL, "filename" character varying NOT NULL, "path" character varying NOT NULL, "size" integer NOT NULL,"user_id" integer, "fileType_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(),  CONSTRAINT "PK_a753eb40fcc8cd925fe9c9aded4" PRIMARY KEY ("file_id"))`);
        await queryRunner.query(`CREATE TABLE "folders" ("folder_id" SERIAL NOT NULL, "foldername" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_16824911a9dfe625e0b38d4c0d5" PRIMARY KEY ("folder_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "permissionFile_id" integer, "permission_id" integer, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_a7435dbb7583938d5e7d1376041" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_7c2a3b2ac096ceecd60a5cd51af" FOREIGN KEY ("fileType_id") REFERENCES "fileTypes"("fileType_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "folders" ADD CONSTRAINT "FK_71af7633de585b66b4db26734c9" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_2f5ea2d7d6b940ae557fd50cee3" FOREIGN KEY ("permissionFile_id") REFERENCES "permissionsFile"("permissionFile_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_4daed8ecfcce827ad3a6ba2587c" FOREIGN KEY ("permission_id") REFERENCES "permissions"("permission_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_4daed8ecfcce827ad3a6ba2587c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_2f5ea2d7d6b940ae557fd50cee3"`);
        await queryRunner.query(`ALTER TABLE "folders" DROP CONSTRAINT "FK_71af7633de585b66b4db26734c9"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_7c2a3b2ac096ceecd60a5cd51af"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_a7435dbb7583938d5e7d1376041"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "folders"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "fileTypes"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "permissionsFile"`);
    }

}
