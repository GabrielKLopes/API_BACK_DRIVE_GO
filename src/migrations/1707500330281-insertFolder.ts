import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertFolder1707500330281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO folders (foldername, user_id) 
            VALUES 
            ('folder1', 1),
            ('folder2', 2),
            ('folder3', 3),
            ('folder4', 4),
            ('folder5', 5),
            ('folder6', 6),
            ('folder7', 7),
            ('folder8', 8),
            ('folder9', 9),
            ('folder10', 10);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
    }
}
