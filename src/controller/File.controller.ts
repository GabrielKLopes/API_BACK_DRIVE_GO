import { Request, Response } from "express";
import FileService from "../service/File.service";

class FileController {
  static async createFile(req: Request, res: Response): Promise<void> {
    try {
      const fileService = new FileService();
      const { filename, path, size, fileType_id } = req.body;
      const user_id = (req as any).user_id;

      if (!user_id) {
        res.status(401).json({ message: "Acesso negado" });
        return;
      }
      const file = await fileService.createFile(
        filename,
        path,
        size,
        user_id,
        fileType_id
      );
      res.status(201).json(file);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  static async getFileById(req: Request, res: Response): Promise<void> {
    try {
        const fileService = new FileService();
        const file_id = parseInt(req.params.file_id, 10);
      
      const file = await fileService.getFileById(file_id);

      res.status(200).json(file);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAllFiles(req: Request, res: Response): Promise<void> {
    try {
      const fileService = new FileService();
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "Token de autorização não fornecido" });
        return;
      }
      const files = await fileService.getAllFiles(token);
      res.status(200).json(files);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async deleteFile(req: Request, res: Response): Promise<void> {
    try {
      const fileService = new FileService();
      const file_id = parseInt(req.params.user_id, 10);

      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).json({ message: "Token de autorização não fornecido" });
        return;
      }

      await fileService.deleteFile(file_id, token);
      res.status(204).json({ message: "Arquivo deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateFile(req: Request, res: Response): Promise<void> {
    try {
        const fileService = new FileService();
      const file_id = parseInt(req.params.file_id, 10);
      const { filename, path, user_id, fileType_id } = req.body;

      const updateFile = await fileService.updateFile(file_id, filename, path, user_id, fileType_id);

      if (!updateFile) {
        res.status(404).json({ error: 'file not found' });
        return;
      }

      res.status(200).json(updateFile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
export default FileController;
