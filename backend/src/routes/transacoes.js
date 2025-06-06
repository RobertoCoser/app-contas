import express from 'express';
import { getTransacoes, criarTransacao, atualizarPago } from '../controllers/transacoesController.js';

const router = express.Router();

router.get('/', getTransacoes);
router.post('/', criarTransacao);
router.patch('/:id/pago', atualizarPago);

export default router;