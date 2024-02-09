import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertUser1707500187421 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO users (username, email, password, "permissionFile_id", permission_id) 
            VALUES 
            ('usuario1', 'usuario1@example.com', 'senha123', 1, 1),
            ('usuario2', 'usuario2@example.com', 'senha456', 2, 2),
            ('usuario3', 'usuario3@example.com', 'senha789', 3, 1),
            ('usuario4', 'usuario4@example.com', 'senhaabc', 1, 2),
            ('usuario5', 'usuario5@example.com', 'senhaxyz', 3, 2),
            ('usuario6', 'usuario6@example.com', 'senhajkl', 2, 1),
            ('usuario7', 'usuario7@example.com', 'senhawxyz', 1, 1),
            ('usuario8', 'usuario8@example.com', 'senha123abc', 2, 2),
            ('usuario9', 'usuario9@example.com', 'senha456xyz', 3, 1),
            ('usuario10', 'usuario10@example.com', 'senha789abc', 1, 2);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Adicione aqui o código para reverter a inserção, se necessário
    }


}
