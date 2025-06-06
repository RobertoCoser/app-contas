import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta';

// Registro
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const hashed = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({ nome, email, senha: hashed });
    res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao registrar usuário.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(401).json({ erro: 'Usuário não encontrado' });

    const valido = await bcrypt.compare(senha, usuario.senha);
    if (!valido) return res.status(401).json({ erro: 'Senha inválida' });

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ erro: 'Erro no login.' });
  }
});

export default router;
