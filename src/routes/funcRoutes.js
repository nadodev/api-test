import { Router } from 'express';
import FuncionariosControllers from '../controllers/FuncionariosControllers';

const routes = Router();

routes.post('/', FuncionariosControllers.store);
routes.get('/:id', FuncionariosControllers.mostrar);
routes.get('/:id/edit', FuncionariosControllers.mostraUm);
routes.get('/mostrar/:id', FuncionariosControllers.mostraUm);
routes.get('/editar/', FuncionariosControllers.mostrar);
routes.put('/update/:id', FuncionariosControllers.update);

routes.delete('/delete/:id', FuncionariosControllers.delete);

export default routes;
