import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { User } from "./User.entity";

@Entity('folders')

export class Folder{

    @PrimaryGeneratedColumn()
    folder_id: number;

    @Column()
    name: string;

  
    @ManyToOne(() => User, user => user.user_id)
    @JoinColumn({name: 'user_id'})
    user: User;


    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

}