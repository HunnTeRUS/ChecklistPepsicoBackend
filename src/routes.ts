import express from "express";
import UserServices from './services/UserServices'
import {verifyToken} from './authentication/Auth'
import ChecklistCovidServices from './services/ChecklistCovidServices'
import ChecklistCarriageServices from './services/ChecklistCarriageServices'
import CompanyServices from './services/CompanyServices'
import ApiValidations from './utils/ApiValidations'

const routes = express.Router();

//USER SERVICES
routes.post('/userRegister', ApiValidations.validateUserInsertion(), UserServices.createUser);

routes.get('/listUsers', UserServices.listUsers);

routes.delete('/removeUser', verifyToken, ApiValidations.removeUser(), UserServices.removeUser);

routes.get('/getUserByName', ApiValidations.getUserByName(), UserServices.getUserByName);

routes.get('/getUserByEmail', ApiValidations.getUserByEmail(), UserServices.getUserByEmail);

routes.post('/login', ApiValidations.loginUser(), UserServices.loginUser);

routes.put('/updatePassword', ApiValidations.updatePassword(), verifyToken, UserServices.updatePassword);

routes.post('/forgotPassword', ApiValidations.forgotPassword(), UserServices.forgotPassword);

routes.post('/verifyToken', ApiValidations.verify(), verifyToken, UserServices.verify);

routes.post('/updateUserCarrier', ApiValidations.updateUserCarrier(), verifyToken, UserServices.updateCurrentCarrier);
//-----------------

//CHECKLISTS SERVICES
routes.post('/createCovidChecklist', ApiValidations.createCovidChecklist(), verifyToken, ChecklistCovidServices.createChecklist);

routes.post('/createSecurityChecklist', ApiValidations.createCarriageChecklist(), verifyToken, ChecklistCarriageServices.createChecklist);

routes.get('/listCovidChecklists', ApiValidations.listCovidChecklist(), ChecklistCovidServices.listChecklist);

routes.get('/listSecurityChecklists', ApiValidations.listCarriageChecklist(), ChecklistCarriageServices.listChecklist);

routes.get('/getCovidChecklistsById', ApiValidations.getChecklistByID(), ChecklistCovidServices.getChecklistByID);

routes.get('/getSecurityChecklistsById', ApiValidations.getCarriageChecklistById(), ChecklistCarriageServices.getChecklistById);

routes.get('/listSecurityChecklistsByDate', ApiValidations.listCarriageChecklistByDate(), ChecklistCarriageServices.listChecklistByDate);

routes.get('/listCovidChecklistsByDate', ApiValidations.listCovidChecklistByDate(), ChecklistCovidServices.listChecklistByDate);
//-------------------


//CARRIERS SERVICES
routes.post('/createCarrier', ApiValidations.createCarrier(), verifyToken, CompanyServices.createCarrier);

routes.get('/listCarriers', CompanyServices.listCarriers);

routes.get('/getCarrierById', ApiValidations.listCarriersById(), CompanyServices.listCarriersById);

routes.get('/listCarriersByName', ApiValidations.listCarriersByName(), CompanyServices.listCarriersByName);

routes.delete('/removeCarrier', ApiValidations.removeCarrier(), verifyToken, CompanyServices.removeCarrier);

routes.put('/updateCarrierName', ApiValidations.updateCarrierName(), verifyToken, CompanyServices.updateCarrierName);

routes.post('/insertUnity', ApiValidations.insertUnity(), verifyToken, CompanyServices.insertUnity);

routes.delete('/removeUnity', ApiValidations.removeUnity(), verifyToken, CompanyServices.removeUnity);

routes.put('/updateUnity', ApiValidations.updateUnit(), verifyToken, CompanyServices.updateUnit);

//------------------


export default routes;
