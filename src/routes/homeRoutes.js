import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const routes = Router();

routes.post('/user', UserController.store);
routes.get('/:id', UserController.show);
routes.get('/', loginRequired, UserController.showAll);
routes.put('/update/:id', loginRequired, UserController.update);
routes.put('/editar/', loginRequired, UserController.editar);

export default routes;
