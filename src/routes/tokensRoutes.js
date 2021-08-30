import { Router } from 'express';
import TokenController from '../controllers/TokenController';

const routes = Router();

routes.post('/', TokenController.store);

export default routes;
