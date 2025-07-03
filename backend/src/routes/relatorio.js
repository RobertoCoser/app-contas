import express from 'express';
import { Transacao } from '../models/Transacao.js';
import { fn, col } from 'sequelize';

const router = express.Router();

router.get('/resumo-mensal', async (req, res) => {
  try {
    const resultado = await Transacao.findAll({
      attributes: [
        [fn('MONTH', col('data')), 'mes'],
        'tipo',
        [fn('SUM', col('valor')), 'total']
      ],
      group: ['mes', 'tipo'],
      order: [['mes', 'ASC']]
    });

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao gerar resumo' });
  }
});

export default router;
