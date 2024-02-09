import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Folder } from "./Folder.entity";

@Entity()
export class SharedFolder {
    @PrimaryGeneratedColumn()
    sharedFolder_id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "email" })
    user: User;

    @ManyToOne(() => Folder)
    @JoinColumn({ name: "folder_id" })
    folder: Folder;
}
