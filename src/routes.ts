import express from "express";
import UserServices from './services/UserServices'
import {verifyToken} from './authentication/Auth'

const routes = express.Router();

routes.post('/userRegister', UserServices.createUser);

routes.get('/listUsers', UserServices.listUsers);

routes.get('/getUserByName', UserServices.getUserByName);

routes.get('/getUserByEmail', UserServices.getUserByEmail);

routes.post('/login', UserServices.loginUser);

routes.put('/updatePassword', verifyToken, UserServices.updatePassword);

routes.post('/forgotPassword', UserServices.forgotPassword);

export default routes;
