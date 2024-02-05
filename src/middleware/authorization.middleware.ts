import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import { User } from '../entities/User.entity';
import { AppDataSource } from '../data-source';

dotenv.config();

interface JwtPayload {
  email: string;
}

interface CustomRequest extends Request {
  user_id?: number;
}

const secretJWT = process.env.JWT_SECRET_KEY || "";

export async function authorizationMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send({ message: "Access denied" });
  }

  const tokenSplited = token.split('Bearer ');

  try {
    const decoded = Jwt.verify(tokenSplited[1], secretJWT) as JwtPayload;

    if (!decoded) {
      return res.status(401).send({ message: "Access denied" });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email: decoded.email }, relations: ['permission', 'permissionsFile'] });

    if (!user) {
      return res.status(403).send({ message: "Permission denied" });
    }

    if (req.url.includes('/file') && req.method !== 'GET' && user.permissionsFile.permissionFile_id === 3) {
      return res.status(403).send({ message: "Permission denied for file operations" });
    } else if (req.url.includes('/folder') && req.method !== 'GET' && user.permissionsFile.permissionFile_id === 3) {
      return res.status(403).send({ message: "Permission denied for folder operations" });
    } else {

      if (req.url.includes('/user') && req.method === 'DELETE' && user.permission.permission_id !== 1) {
        return res.status(403).send({ message: "Permission denied for deletion" });
      }

      if (req.url.includes('/user') && req.method === 'PUT' && user.permission.permission_id !== 1) {
        return res.status(403).send({ message: "Permission denied for update" });
      }
    }

    req.user_id = user.user_id;

    console.log('user_id no middleware:', req.user_id);

    next();
  } catch (error) {
    return res.status(401).send({ message: "Access denied" });
  }
}
