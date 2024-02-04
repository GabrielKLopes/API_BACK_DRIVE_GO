import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";


@Entity('permissionsFile')
export class PermissionsFile {
     @PrimaryGeneratedColumn()
    permissionFile_id: number;
    
    @Column()
    name: string;

    @Column({name: 'readfiles',default: false})
    readFiles: boolean;

    @Column({name: 'writefiles', default: false})
    writeFiles: boolean;

    @Column({name: 'deletefiles', default: false})
    deleteFiles: boolean;

    @Column({name: 'sharefiles', default: false})
    shareFiles: boolean;

    @Column({name: 'shareownfiles',default: false})
    shareOwnFiles: boolean;

    @OneToMany(() => User, user => user.permissionsFile)
    users: User[]; 

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
   
}
