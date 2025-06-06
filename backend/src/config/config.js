// src/config/config.js
require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: '',
    database: 'appcontas',
    host: 'localhost',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: '',
    database: 'appcontas_test',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: '',
    database: 'appcontas',
    host: 'localhost',
    dialect: 'mysql',
  },
};
