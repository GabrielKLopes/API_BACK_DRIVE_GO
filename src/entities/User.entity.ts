import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PermissionsFile } from "./PermissionFile.entity";
import { Permission } from "./Permission.entity";
import { File } from "./File.entity";
import { Folder } from "./Folder.entity";



@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => PermissionsFile, permissionsFile => permissionsFile.permissionFile_id)
    @JoinColumn({ name: 'permissionFile_id' })
    permissionsFile: PermissionsFile;

    @ManyToOne(() => Permission, permission => permission.users)  
    @JoinColumn({ name: 'permission_id' })
    permission: Permission;

    @OneToMany(() => File, file => file.user)
    file: File[];

    @OneToMany(() => Folder, folder => folder.user)
    folder: Folder[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}

