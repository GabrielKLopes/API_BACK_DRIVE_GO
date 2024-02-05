import { Request, Response } from "express";
import FolderService from "../service/Folder.service";

class FolderController {
    static async createFolder(req: Request, res: Response): Promise<void> {
        try {
          const folderService = new FolderService();
          const { name} = req.body;
          const user_id = (req as any).user_id;

    
          if (!user_id) {
            res.status(401).json({ message: "Acesso negado" });
            return;
          }
          const file = await folderService.createFolder(
            name,
            user_id,
           
          );
          res.status(201).json(file);
        } catch (error) {
          console.log(error);
          res.status(500).json({
            message: "Internal server error",
          });
        }
      }

      static async getAllFolder(req: Request, res: Response): Promise<void> {
        try {
          const folderService = new FolderService();
          const token = req.headers.authorization?.split(" ")[1];
          if (!token) {
            res.status(401).json({ message: "Token de autorização não fornecido" });
            return;
          }
          const folders = await folderService.getAllFolder(token);
          res.status(200).json(folders);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
      }

      static async getFolderById(req: Request, res: Response): Promise<void> {
        try {
          const folderService = new FolderService();
          const folder_id = parseInt(req.params.folder_id, 10);
          const folder = await folderService.getFolderById(folder_id);
    
          if (!folder) {
            res.status(404).json({ message: 'Pasta não encontrada' });
            return;
          }
    
          res.status(200).json(folder);
        } catch (error) {
          console.log(error);
          res.status(500).json({
            message: 'Erro interno do servidor',
          });
        }
      }

      static async deleteFolder(req: Request, res: Response): Promise<void> {
        try {
          const folderService = new FolderService();
          const folder_id = parseInt(req.params.folder_id, 10);
      
         
      
          const token = req.headers.authorization?.split(" ")[1];
      
          if (!token) {
            res.status(401).json({ message: "Token de autorização não fornecido" });
            return;
          }
      
          await folderService.deleteFolder(folder_id, token);
          res.status(204).json({ message: "Pasta deletada com sucesso" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Erro interno do servidor" });
        }
      }

      static async updateFolder(req: Request, res: Response): Promise<void> {
        try {
        const folderService = new FolderService();
          const folder_id = parseInt(req.params.folder_id, 10);
          const {name,  user_id} = req.body;
    
          const updateFolder = await folderService.updateFolder(folder_id, name,  user_id);
    
          if (!updateFolder) {
            res.status(404).json({ error: 'file not found' });
            return;
          }
    
          res.status(200).json(updateFolder);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
        }
      }
      
}

export default FolderController;