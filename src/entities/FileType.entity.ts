import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { File } from "./File.entity";


@Entity('fileTypes')
export class FileType {
    @PrimaryGeneratedColumn()
    fileType_id: number;

    @Column()
    name: string;

    @Column()
    description: string; 

    @OneToMany(() => File, file => file.fileType)
    files: File[]; 

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
