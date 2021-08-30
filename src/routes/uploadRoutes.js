import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import UploadController from '../controllers/UploadController';

const routes = Router();

routes.post('/upload', loginRequired, UploadController.store);

export default routes;
