import { Usuario } from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'seuSegredo';

export const register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    const hash = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({ nome, email, senha: hash });

    res.status(201).json({ message: 'Usuário criado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, secret, {
      expiresIn: '7d'
    });

    res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
  } catch (error) {
    res.status(500).json({ error: 'Erro no login.' });
  }
};
