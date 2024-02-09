import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { SharedFolder } from "./Shared.entity"; 
import { FileType } from "./FileType.entity";

@Entity('folders')
export class Folder {
  @PrimaryGeneratedColumn()
  folder_id: number;

  @Column()
  foldername: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;



  @OneToMany(() => SharedFolder, (sharedFolder) => sharedFolder.folder) 
  sharedFolders: SharedFolder[]; 

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
