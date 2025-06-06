// src/app.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, testConnection } from './models/index.js';
import transacoesRoutes from './routes/transacoes.js';
import transacoesRoutes from './routes/transacoesRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/transacoes', transacoesRoutes);

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Inicialização
(async () => {
    await testConnection();
    await sequelize.sync({ alter: true }); // sincronia com banco
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })();
