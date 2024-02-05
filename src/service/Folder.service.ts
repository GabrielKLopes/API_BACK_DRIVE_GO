import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User.entity";
import { Folder } from "../entities/Folder.entity";

class FolderService {
  private userRepository = AppDataSource.getRepository(User);
  private folderRepository = AppDataSource.getRepository(Folder);

  async createFolder(
   name: string,
    user_id: number,
  
  ): Promise<Folder> {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id },
        relations: ["permissionsFile"],
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      if (
        user.permissionsFile.permissionFile_id !== 1 &&
        user.permissionsFile.permissionFile_id !== 2
      ) {
        throw new Error("Permissão negada para criar uma pasta");
      }

      const folderRepository = AppDataSource.getRepository(Folder);
      const folder = folderRepository.create({
        name,
        user
      });

      const savedFolder = await folderRepository.save(folder);

      return savedFolder;
    } catch (error) {
      throw error;
    }
  }

  async getAllFolder(token: string): Promise<Folder[]> {
    const folders = await this.folderRepository.find({
      relations: ["user"],
    });
    return folders;
  }

  async getFolderById(folder_id: number): Promise<Folder | undefined> {
    try {
        const folder = await this.folderRepository.findOne({where:{folder_id}, relations:['user']});

      if (!folder) {
        throw new Error('Arquivo não encontrado');
      }
  
      return folder;
    } catch (error) {
     
      throw new Error('Internal server error');
    }
  }
  async deleteFolder(folder_id: number, token: string): Promise<void> {
    const folderId = await this.folderRepository.findOne({ where: { folder_id } }); 

    if (!folderId) {
        throw new Error('Pasta não encontrado');
    }
   
    await this.folderRepository.delete(folder_id);
}

async updateFolder(folder_id: number, name:string,  user_id: number): Promise<Folder | null> {
    const userRepository = AppDataSource.getRepository(User);
    
    const updateFolder = await this.folderRepository.findOne({where:{folder_id}, relations:['user']});

    if (!updateFolder) {
        throw new Error('Arquivo não encontrado');
    }

    updateFolder.name = name !== undefined ? name : updateFolder.name;

    if (user_id !== undefined) {
        const userId = await userRepository.findOne({ where: { user_id } });
        if (!userId) {
            throw new Error('Permissão não encontrada');
        }
        updateFolder.user = userId;
    }


    await this.folderRepository.save(updateFolder);

    return updateFolder;
}

}
export default FolderService;

