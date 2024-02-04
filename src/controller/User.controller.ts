import { UserService } from "../service/User.service";
import { Request, Response } from "express";

export class UserController {
  private secretJWT = process.env.JWT_SECRET_KEY || "";

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userService = new UserService();
      const { username, password, email, permission_id, permissionFile_id } = req.body;

      if (!username || !password || !email || !permission_id || !permissionFile_id) {
        res.status(400).json({
          message: "Missing required fields",
        });
        return;
      }

      const user = await userService.createUser(
        username,
        password,
        email,
        permission_id,
        permissionFile_id
      );
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const userService = new UserService();
      const token = await userService.authorization(email, password);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Authentication failed" });
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const userService = new UserService();
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).json({ message: "Token de autorização não fornecido" });
        return;
      }

      const users = await userService.getAllUser(token);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userService = new UserService();
      const user_id = parseInt(req.params.user_id, 10);

      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).json({ message: "Token de autorização não fornecido" });
        return;
      }

      await userService.deleteUser(user_id, token);
      res.status(204).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userService = new UserService();
      const user_id = parseInt(req.params.user_id, 10);
      const { username, password, email, permission_id, permissionFile_id } = req.body;

      const updatedUser = await userService.updateUser(user_id, username, password, email, permission_id, permissionFile_id);

      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }



  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userService = new UserService();
      const user_id = parseInt(req.params.user_id, 10);

      const user = await userService.getUserById(user_id);

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserController;
