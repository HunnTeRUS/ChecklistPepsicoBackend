import express from "express";
import UserServices from './services/UserServices'
import {verifyToken} from './authentication/Auth'
import ChecklistCovidServices from './services/ChecklistCovidServices'
import ChecklistCarriageServices from './services/ChecklistCarriageServices'
import CompanyServices from './services/CompanyServices'

const routes = express.Router();

//USER SERVICES
routes.post('/userRegister', UserServices.createUser);

routes.get('/listUsers', UserServices.listUsers);

routes.delete('/removeUser', UserServices.removeUser);

routes.get('/getUserByName', UserServices.getUserByName);

routes.get('/getUserByEmail', UserServices.getUserByEmail);

routes.post('/login', UserServices.loginUser);

routes.put('/updatePassword', verifyToken, UserServices.updatePassword);

routes.post('/forgotPassword', UserServices.forgotPassword);
//-----------------

//CHECKLISTS SERVICES
routes.post('/createCovidChecklist', verifyToken, ChecklistCovidServices.createChecklist);

routes.post('/createSecurityChecklist', verifyToken, ChecklistCarriageServices.createChecklist);

routes.get('/listCovidChecklists', ChecklistCovidServices.listChecklist);

routes.get('/listCovidChecklists', ChecklistCovidServices.listChecklistByDate);

routes.get('/listSecurityChecklists', ChecklistCarriageServices.listChecklist);

routes.get('/listSecurityChecklistsByDate', ChecklistCarriageServices.listChecklistByDate);
//-------------------


//CARRIERS SERVICES
routes.post('/createCarrier', verifyToken, CompanyServices.createCarrier);

routes.get('/listCarriers', CompanyServices.listCarriers);

routes.get('/listCarriersById', CompanyServices.listCarriersById);

routes.get('/listCarriersByName', CompanyServices.listCarriersByName);

routes.delete('/removeCarrier', verifyToken, CompanyServices.removeCarrier);

routes.put('/updateCarrierName', verifyToken, CompanyServices.updateCarrierName);

routes.post('/insertUnity', verifyToken, CompanyServices.insertUnity);

routes.delete('/removeUnity', verifyToken, CompanyServices.removeUnity);
//------------------


export default routes;
