import { Router } from "express";
import UserController from "../controller/User.controller";
import { authorizationMiddleware } from "../middleware/authorization.middleware";
import FileController from "../controller/File.controller";
import FolderController from "../controller/Folder.controller";

import SharedFolderController from "../controller/Shared.controller";


export const routes = Router();



routes.post('/register/user', UserController.createUser);
routes.post('/session/authorization',UserController.login);
routes.delete('/session/user/:user_id', authorizationMiddleware, UserController.deleteUser);
routes.get('/session/user/:user_id',authorizationMiddleware, UserController.getUserById);
routes.put('/session/user/:user_id',authorizationMiddleware, UserController.updateUser);
routes.get('/session/user', authorizationMiddleware, UserController.getAllUsers);

routes.post('/session/file', authorizationMiddleware, FileController.createFile);
routes.get('/session/file/', authorizationMiddleware, FileController.getAllFiles);
routes.delete('/session/file/:file_id', authorizationMiddleware, FileController.deleteFile);
routes.get('/session/file/:file_id',authorizationMiddleware, FileController.getFileById);
routes.put('/session/file/:file_id',authorizationMiddleware, FileController.updateFile);

routes.post('/session/folder/', authorizationMiddleware, FolderController.createFolder);
routes.get('/session/folder/', authorizationMiddleware, FolderController.getAllFolder);
routes.get('/session/folder/:folder_id',authorizationMiddleware, FolderController.getFolderById);
routes.delete('/session/folder/:folder_id', authorizationMiddleware, FolderController.deleteFolder);
routes.put('/session/folder/:folder_id',authorizationMiddleware, FolderController.updateFolder);

routes.post('/session/shared-folder/:folder_id', authorizationMiddleware, SharedFolderController.createSharedFolder);
routes.get('/session/shared-folder/:user_id', authorizationMiddleware, SharedFolderController.getAllSharedFolders);

