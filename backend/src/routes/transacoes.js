import express from 'express';
import {
  listarTransacoes,
  criarTransacao,
  atualizarTransacao,
  deletarTransacao
} from '../controllers/transacoesController.js';

const router = express.Router();

router.get('/', listarTransacoes);
router.post('/', criarTransacao);
router.put('/:id', atualizarTransacao);
router.delete('/:id', deletarTransacao);

export default router;
