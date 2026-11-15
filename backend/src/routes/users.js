import { Router } from 'express';
import User from '../models/User.js';
import verificarToken from '../middleware/auth.js';

const router = Router();

// Todas estas rutas están PROTEGIDAS: requieren token JWT

// GET /api/users/perfil -> datos del usuario logueado
router.get('/perfil', verificarToken, async (req, res) => {
  const usuario = await User.findById(req.usuario.id).select('-password');
  if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  res.json(usuario);
});

// GET /api/users -> consulta de todos los usuarios registrados
router.get('/', verificarToken, async (req, res) => {
  const usuarios = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(usuarios);
});

export default router;
