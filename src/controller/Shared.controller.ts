import { Request, Response } from "express";
import SharedFolderService from "../service/shared.service";

class SharedFolderController {
  

  static async createSharedFolder(req: Request, res: Response): Promise<void> {
    try {
        const sharedFolderService = new SharedFolderService();
        const { email } = req.body;
        const { folder_id } = req.params;
        const user_id = (req as any).user_id; 
      
      if ( !email) {
        res.status(400).json({ error: " Email do usuário destinatário são necessários." });
        return;
      }


      const sharedFolder = await sharedFolderService.createSharedFolder(parseInt(folder_id), email, req, user_id);
      
     
      res.status(201).json({ sharedFolder });
    } catch (error) {
      console.error("Erro ao criar compartilhamento de pasta:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async getAllSharedFolders(req: Request, res: Response): Promise<void> {
    try {
      const { user_id } = req.params;
      if (!user_id) {
        res.status(400).json({ error: "ID do usuário é necessário." });
        return;
      }

      const sharedFolderService = new SharedFolderService();
      const sharedFolders = await sharedFolderService.getAllSharedFolders(parseInt(user_id));
      
      res.status(200).json({ sharedFolders });
    } catch (error) {
      console.error("Erro ao obter pastas compartilhadas:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}


export default SharedFolderController;
