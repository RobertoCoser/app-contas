// src/models/Transacao.js
import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import { Usuario } from './Usuario.js';

export const Transacao = sequelize.define('Transacao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('receita', 'despesa'),
    allowNull: false
  },
  pago: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Associação
Transacao.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Transacao, { foreignKey: 'usuarioId' });
