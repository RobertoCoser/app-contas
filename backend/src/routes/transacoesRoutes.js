import express from 'express';
import { Transacao } from '../models/Transacao.js';
import { autenticar } from '../middlewares/auth.js';

const router = express.Router();

// Listar transações do usuário logado
router.get('/', autenticar, async (req, res) => {
  const transacoes = await Transacao.findAll({
    where: { usuarioId: req.usuario.id },
    order: [['data', 'DESC']]
  });
  res.json(transacoes);
});

// Criar nova transação
router.post('/', autenticar, async (req, res) => {
  const { descricao, valor, data, tipo, pago } = req.body;
  try {
    const transacao = await Transacao.create({
      descricao,
      valor,
      data,
      tipo,
      pago,
      usuarioId: req.usuario.id
    });
    res.status(201).json(transacao);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar transação.' });
  }
});

// Alternar status "pago"
router.patch('/:id/toggle', autenticar, async (req, res) => {
  const transacao = await Transacao.findOne({
    where: { id: req.params.id, usuarioId: req.usuario.id }
  });

  if (!transacao) return res.status(404).json({ erro: 'Transação não encontrada.' });

  transacao.pago = !transacao.pago;
  await transacao.save();

  res.json(transacao);
});

export default router;
