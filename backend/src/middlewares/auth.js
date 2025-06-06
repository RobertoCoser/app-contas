import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta';

export function autenticar(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ erro: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(403).json({ erro: 'Token inválido' });
  }
}
