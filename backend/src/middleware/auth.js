import jwt from 'jsonwebtoken';

// Verifica que la petición traiga un token JWT válido
export default function verificarToken(req, res, next) {
  const header = req.headers.authorization; // "Bearer <token>"
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Acceso denegado: no se envió token' });
  }

  const token = header.split(' ')[1];
  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = datos; // { id, email }
    next();
  } catch {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
}
