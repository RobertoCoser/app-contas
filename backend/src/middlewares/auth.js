import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'seuSegredo';

export const autenticar = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: 'Token não fornecido.' });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido.' });

    req.usuarioId = decoded.id;
    next();
  });
};
