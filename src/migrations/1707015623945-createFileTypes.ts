import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFileTypes1707015623945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`
            INSERT INTO "fileTypes" ("name", "description")
            VALUES 
                ('Arquivo Compactado ZIP', 'Arquivo ZIP'),
                ('Arquivo Compactado RAR', 'Arquivo RAR'),
                ('Arquivo Compactado tar', 'Arquivo tar'),
                ('Arquivo Compactado gzip', 'Arquivo gzip'),
                ('MP3', 'Áudio MP3'),
                ('MPEG', 'Áudio MPEG'),
                ('WAV', 'Áudio WAV'),
                ('.ogg', 'Áudio OGG'),
                ('.opus', 'Áudio OPUS'),
                ('JPEG', 'Imagem JPEG'),
                ('PNG', 'Imagem PNG'),
                ('GIF', 'Imagem GIF'),
                ('BMP', 'Imagem BMP'),
                ('TIFF', 'Imagem TIFF'),
                ('SVG', 'Imagem SVG'),
                ('.CSS', 'Código CSS'),
                ('.HTML', 'Código HTML'),
                ('.PHP', 'Código PHP'),
                ('.C', 'Código C'),
                ('.CPP', 'Código CPP'),
                ('.H', 'Código H'),
                ('.HPP', 'Código HPP'),
                ('.JS', 'Código JS'),
                ('.java', 'Código Java'),
                ('.py', 'Código Python'),
                ('.TXT', 'Arquivo de Texto'),
                ('WebM', 'Vídeo WebM'),
                ('.MPEG4', 'Vídeo MPEG4'),
                ('.3GPP', 'Vídeo 3GPP'),
                ('.MOV', 'Vídeo MOV'),
                ('.AVI', 'Vídeo AVI'),
                ('.MPEGPS', 'Vídeo MPEGPS'),
                ('.WMV', 'Vídeo WMV'),
                ('.FLV', 'Vídeo FLV'),
                ('.ogg', 'Vídeo OGG'),
                ('.DXF', 'Adobe AutoCad DXF'),
                ('.AI', 'Adobe Illustrator AI'),
                ('.PSD', 'Adobe Photoshop PSD'),
                ('.PDF', 'Documento PDF'),
                ('.EPS', 'PostScript EPS'),
                ('.PS', 'PostScript PS'),
                ('.SVG', 'SVG'),
                ('.TIFF', 'TIFF'),
                ('.TTF', 'TrueType TTF'),
                ('.XLS', 'Microsoft Excel XLS'),
                ('.XLSX', 'Microsoft Excel XLSX'),
                ('.PPT', 'Microsoft PowerPoint PPT'),
                ('.PPTX', 'Microsoft PowerPoint PPTX'),
                ('.DOC', 'Microsoft Word DOC'),
                ('.DOCX', 'Microsoft Word DOCX'),
                ('.XPS', 'XML Paper Specification XPS'),
                ('Senha', 'Microsoft Office protegido por senha');
        `);
    
    }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
