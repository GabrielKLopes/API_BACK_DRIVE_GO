import { Router } from 'express';
import UserController from '../controller/User.controller';


const userRoutes = Router();



userRoutes.post('/create', UserController.createUser);
userRoutes.post('/login', UserController.login);
userRoutes.get('/', UserController.getAllUsers)
userRoutes.delete('/:id', UserController.getAllUsers)
userRoutes.get('/:id', UserController.getUserById);
userRoutes.put('/:id', UserController.updateUser);
export default userRoutes;
