// src/models/index.js

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.localhost, // Ex: 'localhost'
    dialect: 'mysql',
    logging: false, // Desabilita logs de queries no terminal
  }
);

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com MySQL estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro na conexão com o banco de dados:', error);
  }
};
