import express from 'express';
import cookieParser from 'cookie-parser';
import { AppDataSource } from './data-source';

import { routes } from './Routes';

const app = express();

AppDataSource.initialize().then(() => {

  app.use(express.json());
  app.use(cookieParser());

  
  app.get('/', (req, res) => {
    return res.send('Aplicação rodando na porta 3000');
  });

  
  app.use(routes);

  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});

export default app;
