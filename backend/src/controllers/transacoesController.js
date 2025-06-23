import { Transacao } from '../models/Transacao.js';

export const listarTransacoes = async (req, res) => {
  try {
    const transacoes = await Transacao.findAll();
    res.json(transacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar transações.' });
  }
};

export const criarTransacao = async (req, res) => {
  const { descricao, valor, data, tipo, pago } = req.body;
  try {
    const nova = await Transacao.create({ descricao, valor, data, tipo, pago });
    res.status(201).json(nova);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar transação.' });
  }
};

export const atualizarTransacao = async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, data, tipo, pago } = req.body;
  try {
    const transacao = await Transacao.findByPk(id);
    if (!transacao) {
      return res.status(404).json({ error: 'Transação não encontrada.' });
    }
    await transacao.update({ descricao, valor, data, tipo, pago });
    res.json(transacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar transação.' });
  }
};

export const deletarTransacao = async (req, res) => {
  const { id } = req.params;
  try {
    const transacao = await Transacao.findByPk(id);
    if (!transacao) {
      return res.status(404).json({ error: 'Transação não encontrada.' });
    }
    await transacao.destroy();
    res.json({ message: 'Transação deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar transação.' });
  }
};
