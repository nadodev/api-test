import dotenv from 'dotenv';

dotenv.config();
import './database';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { resolve } from 'path';
// Import Rotas
import routes from './routes/homeRoutes';
import tokensRoutes from './routes/tokensRoutes';
import funcRoutes from './routes/funcRoutes';
import uploadRoutes from './routes/uploadRoutes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve('upload')));
app.use(cors());
app.use(helmet());

// Middlewares Rotas
app.use('/', routes); // Rota de Rota inicial
app.use('/tokens', tokensRoutes); // Rota para gerar tokens
app.use('/func', funcRoutes); // Rota de funcionarios
app.use('/', uploadRoutes); // Rota de Upload

app.listen(8000, () => {
  console.log('app  online');
});
