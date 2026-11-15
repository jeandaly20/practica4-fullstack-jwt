import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

dotenv.config();
dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ mensaje: 'API funcionando' }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Ruta no encontrada
app.use((req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada' }));

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err.message);
    process.exit(1);
  });
