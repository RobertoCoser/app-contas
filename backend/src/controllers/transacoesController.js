import { Transacao } from '../models/Transacao.js';

export async function getTransacoes(req, res) {
  try {
    const transacoes = await Transacao.findAll();
    res.json(transacoes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar transações' });
  }
}

export async function criarTransacao(req, res) {
  try {
    const nova = await Transacao.create(req.body);
    res.status(201).json(nova);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar transação' });
  }
}

export async function atualizarPago(req, res) {
  try {
    const { id } = req.params;
    const transacao = await Transacao.findByPk(id);
    if (!transacao) return res.status(404).json({ error: 'Transação não encontrada' });

    transacao.pago = !transacao.pago;
    await transacao.save();
    res.json(transacao);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar status de pagamento' });
  }
}
