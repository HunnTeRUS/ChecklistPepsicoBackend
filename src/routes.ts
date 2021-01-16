import express from "express";
import UserServices from './services/UserServices'
import {verifyToken} from './authentication/Auth'
import createPdf from './utils/GeneratePDF'
import ChecklistCovidServices from './services/ChecklistCovidServices'
import ChecklistCarriageServices from './services/ChecklistCarriageServices'

const routes = express.Router();

routes.post('/userRegister', UserServices.createUser);

routes.get('/listUsers', UserServices.listUsers);

routes.get('/getUserByName', UserServices.getUserByName);

routes.get('/getUserByEmail', UserServices.getUserByEmail);

routes.post('/login', UserServices.loginUser);

routes.put('/updatePassword', verifyToken, UserServices.updatePassword);

routes.post('/forgotPassword', UserServices.forgotPassword);

routes.post('/forgotPassword', UserServices.forgotPassword);

routes.post('/createCovidChecklist', ChecklistCovidServices.createChecklist);

routes.post('/createSecurityChecklist', ChecklistCarriageServices.createChecklist);

routes.get('/listCovidChecklists', ChecklistCovidServices.listChecklist);

routes.get('/listSecurityChecklists', ChecklistCarriageServices.listChecklist);

routes.get('/listSecurityChecklistsByDate', ChecklistCarriageServices.listChecklistByDate);

export default routes;
