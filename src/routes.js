import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import FileController from './app/controllers/FileController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import RespondController from './app/controllers/RespondController';

import auth from './app/middlewares/auth';

const uploads = multer(multerConfig);

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.post('/students/:studentId/checkins', CheckinController.store);
routes.get('/students/:studentId/checkins', CheckinController.index);

routes.post('/students/:studentId/help-orders', HelpOrderController.store);
routes.get('/students/:studentId/help-orders', HelpOrderController.index);

routes.use(auth);

routes.put('/users', UserController.update);

routes.post('/files', uploads.single('file'), FileController.store);

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);
routes.get('/students', StudentController.index);

routes.post('/plans', PlanController.store);
routes.put('/plans/:planId', PlanController.update);
routes.get('/plans', PlanController.index);
routes.delete('/plans/:planId', PlanController.delete);

routes.post('/registrations', RegistrationController.store);
routes.get('/registrations', RegistrationController.index);
routes.put('/registrations/:registrationId', RegistrationController.update);
routes.delete('/registrations/:registrationId', RegistrationController.delete);

routes.get('/help-orders/', RespondController.index);
routes.put('/help-orders/:helpOrderId/answer', HelpOrderController.update);

export default routes;
