import express from 'express';
import cors from 'cors';
import { sequelize, testConnection } from './models/index.js';

import transacoesRoutes from './routes/transacoes.js';
import authRoutes from './routes/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/transacoes', transacoesRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  await testConnection();
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
})();
