import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { FileType } from "./FileType.entity";
import { Folder } from "./Folder.entity";


@Entity('files')

export class File{
    @PrimaryGeneratedColumn()
    file_id: number;

    @Column()
    filename: string;

    @Column()
    path: string;
    
    @Column()
    size: number;

    @ManyToOne(()=> User, user => user.user_id)
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => FileType, fileType => fileType.fileType_id)
    @JoinColumn({name: 'fileType_id'})
    fileType: FileType;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

}
