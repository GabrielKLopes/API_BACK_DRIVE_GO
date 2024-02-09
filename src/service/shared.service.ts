import { SharedFolder } from "../entities/Shared.entity";
import { Folder } from "../entities/Folder.entity";
import { User } from "../entities/User.entity";
import { AppDataSource } from "../data-source";
import { Request } from 'express';

interface CustomRequest extends Request {
  user?: {
    permissionsFile?:{
        permissionFile_id: number;
    };
  }; 
}

class SharedFolderService {
  private sharedFolderRepository = AppDataSource.getRepository(SharedFolder);
  private folderRepository = AppDataSource.getRepository(Folder);
  private userRepository = AppDataSource.getRepository(User);

  async createSharedFolder(folder_id: number, email: string, req: CustomRequest, user_id:number): Promise<SharedFolder> {
   
    const folder = await this.folderRepository.findOne({ where: { folder_id } });

    if (!folder) {
      throw new Error("Folder não encontrado.");
    }
    
   
    const sharingUser = await this.userRepository.findOne({ where: { user_id } });
    if (!sharingUser) {
      throw new Error("Usuário que compartilha não encontrado.");
    }
    
    
   

    
    const permissionFileId = req.user?.permissionsFile?.permissionFile_id;
    console.log('PermissionFileId:', permissionFileId);
    console.log('Sharing user:', sharingUser);
    console.log('Folder:', folder);
   
    if (permissionFileId === 3) {
      throw new Error("Usuário não tem permissão para compartilhar pastas.");
    }

    // Crie a pasta compartilhada
    const sharedFolder = new SharedFolder();
    sharedFolder.folder = folder;
    sharedFolder.user = sharingUser;

    // Salve a pasta compartilhada no repositório
    const savedSharedFolder = await this.sharedFolderRepository.save(sharedFolder);
    console.log('Saved shared folder:', savedSharedFolder);
    
    return savedSharedFolder;
  }

  async getAllSharedFolders(user_id: number): Promise<SharedFolder[]> {
    const sharedFolders = await this.sharedFolderRepository.find({
        where: { user: { user_id } },
        relations: ['folder']
    });
    return sharedFolders;
}
}
export default SharedFolderService;
