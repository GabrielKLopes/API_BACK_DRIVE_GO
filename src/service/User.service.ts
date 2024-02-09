
import { User } from "../entities/User.entity";

import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppDataSource } from "../data-source";
import { Permission } from "../entities/Permission.entity";
import { PermissionsFile } from "../entities/PermissionFile.entity";



export class UserService {
    private userRepository = AppDataSource.getRepository(User);
    private permissionFileRepository = AppDataSource.getRepository(PermissionsFile);
    private permission = AppDataSource.getRepository(Permission);
    private secretJWT = process.env.JWT_SECRET_KEY || "";

    async createUser(username: string, password: string, email: string, permission_id: number, permissionFile_id: number): Promise<User> {
        try {
            const permissionsFile = await this.permissionFileRepository.findOne({ where: { permissionFile_id } });
            const permission = await this.permission.findOne({ where: { permission_id } });
            const existingEmail = await this.userRepository.findOne({ where: { email } });
           
            if (existingEmail) {
                throw new Error('Email já cadastrado');
            }


            if (!permissionsFile) {
                throw new Error('Permissão de arquivo não encontrada');
            }
    
            if (!permission) {
                throw new Error('Permissão não encontrada');
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = this.userRepository.create({
                username,
                password:hashedPassword,
                email,
                permission,
                permissionsFile,
            });
    
            
    
            const savedUser = await this.userRepository.save(user);
    
            return savedUser;
        } catch (error) {
            throw error;
        }
    }
    

    async getAllUser(token: string): Promise<User[]> {
        const decodedToken: any = jwt.verify(token, this.secretJWT);
        const userId = decodedToken.userId;
      
        const users = await this.userRepository.find({
          relations: ['permission', 'permissionsFile'],  
        });
      
        return users;
      }


      async getUserById(user_id: number): Promise<User | undefined> {
        try {
          const user = await this.userRepository.findOne({
            where: { user_id },
            relations: ['permission', 'permissionsFile'],
          });
      
          if (!user) {
            throw new Error('Usuário não encontrado');
          }
      
          return user;
        } catch (error) {
         
          throw new Error('Internal server error');
        }
      }

    async deleteUser(user_id: number, token: string): Promise<void> {
        const userId = await this.userRepository.findOne({ where: { user_id } }); 

        if (!userId) {
            throw new Error('Usuário não encontrado');
        }
       
        await this.userRepository.delete(user_id);
    }

    async updateUser(user_id: number, username: string, password: string, email: string, permission_id: number, permissionFile_id: number): Promise<User | null> {
        const userRepository = AppDataSource.getRepository(User);
        const permissionRepository = AppDataSource.getRepository(Permission);
        const permissionsFileRepository = AppDataSource.getRepository(PermissionsFile);
    
       
        const existingUserWithEmail = await userRepository.findOne({ where: { email } });
        if (existingUserWithEmail && existingUserWithEmail.user_id !== user_id) {
            throw new Error('E-mail já cadastrado');
        }
    
        const updateUser = await userRepository.findOne({ where: { user_id }, relations: ['permission', 'permissionsFile'] });
    
        if (!updateUser) {
            throw new Error('Usuário não encontrado');
        }
    
        updateUser.username = username !== undefined ? username : updateUser.username;
        updateUser.email = email !== undefined ? email : updateUser.email;
    
       
      if (password !== undefined && password !== '') {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateUser.password = hashedPassword;
}
    
        if (permission_id !== undefined) {
            const permission = await permissionRepository.findOne({ where: { permission_id } });
            if (!permission) {
                throw new Error('Permissão não encontrada');
            }
            updateUser.permission = permission;
        }
    
        if (permissionFile_id !== undefined) {
            const permissionsFile = await permissionsFileRepository.findOne({ where: { permissionFile_id } });
            if (!permissionsFile) {
                throw new Error('Permissão de arquivo não encontrada');
            }
            updateUser.permissionsFile = permissionsFile;
        }
    
        await userRepository.save(updateUser);
    
        return updateUser;
    }
    
   
    async authorization(email: string, password: string) {
        try {
            const user = await this.userRepository.findOne({ 
                where: { email },
                relations: ['permission', 'permissionsFile'] // Carregar relacionamentos
            });
    
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
    
            const passwordMatch = await bcrypt.compare(password, user.password);
    
            if (passwordMatch) {
                const payload = {
                    email: user.email,
                    user_id: user.user_id,
                    username: user.username,
                    permission: user.permission,
                    permissionsFile: user.permissionsFile
                };
    
                return jwt.sign(payload, this.secretJWT, {
                    expiresIn: '1h'
                });
            }
            throw new Error('Usuário ou senha incorreto');
        } catch (error) {
            throw error;
        }
    }
}
