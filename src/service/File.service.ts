import { File } from "../entities/File.entity";
import { User } from "../entities/User.entity";
import { AppDataSource } from "../data-source";
import { FileType } from "../entities/FileType.entity";
import * as jwt from "jsonwebtoken";

class FileService {
  private userRepository = AppDataSource.getRepository(User);
  private fileRepository = AppDataSource.getRepository(File);
  private secretJWT = process.env.JWT_SECRET_KEY || "";
  private fileTypeRepository = AppDataSource.getRepository(FileType);

  async createFile(
    filename: string,
    path: string,
    size: number,
    user_id: number,
    fileType_id: number
  ): Promise<File> {
    try {
      const fileType = await this.fileTypeRepository.findOne({
        where: { fileType_id },
      });
      const user = await this.userRepository.findOne({
        where: { user_id },
        relations: ["permissionsFile"],
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      if (!fileType) {
        throw new Error("Tipo de arquivo não encontrado");
      }

      if (
        user.permissionsFile.permissionFile_id !== 1 &&
        user.permissionsFile.permissionFile_id !== 2
      ) {
        throw new Error("Permissão negada para criar um arquivo");
      }

      const fileRepository = AppDataSource.getRepository(File);
      const file = fileRepository.create({
        filename,
        path,
        size,
        user,
        fileType,
      });

      const savedFile = await fileRepository.save(file);

      return savedFile;
    } catch (error) {
      throw error;
    }
  }

  async getAllFiles(token: string): Promise<File[]> {
    const files = await this.fileRepository.find({
      relations: ["user", "fileType"],
    });
    return files;
  }

  async getFileById(file_id: number): Promise<File | undefined> {
    try {
      const file = await this.fileRepository.findOne({
        where: { file_id },
        relations: ['user', 'fileType'],
      });
  
      if (!file) {
        throw new Error('Arquivo não encontrado');
      }
  
      return file;
    } catch (error) {
     
      throw new Error('Internal server error');
    }
  }

  async deleteFile(file_id: number, token: string): Promise<void> {
    const fileId = await this.fileRepository.findOne({ where: { file_id } }); 

    if (!fileId) {
        throw new Error('Usuário não encontrado');
    }
   
    await this.fileRepository.delete(file_id);
}

async updateFile(file_id: number, filename: string, path: string, user_id: number, fileType_id: number): Promise<File | null> {
    const userRepository = AppDataSource.getRepository(User);
    const fileRepository = AppDataSource.getRepository(File);
    const fileTypeRepository = AppDataSource.getRepository(FileType);


    const updateFile = await fileRepository.findOne({ where: {file_id }, relations: ['user', 'fileType'] });

    if (!updateFile) {
        throw new Error('Arquivo não encontrado');
    }

    updateFile.filename = filename !== undefined ? filename : updateFile.filename;
    updateFile.path = path !== undefined ? path : updateFile.path;
    

    if (user_id !== undefined) {
        const userId = await userRepository.findOne({ where: { user_id } });
        if (!userId) {
            throw new Error('Permissão não encontrada');
        }
        updateFile.user = userId;
    }

    if (fileType_id !== undefined) {
        const fileTypeId = await fileTypeRepository.findOne({ where: { fileType_id } });
        if (!fileTypeId) {
            throw new Error('Permissão de arquivo não encontrada');
        }
        updateFile.fileType = fileTypeId;
    }

    await fileRepository.save(updateFile);

    return updateFile;
}

 
}

export default FileService;
