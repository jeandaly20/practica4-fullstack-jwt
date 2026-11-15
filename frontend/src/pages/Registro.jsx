import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registrar } from '../api.js';

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const navigate = useNavigate();

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');
    try {
      const res = await registrar(form);
      setExito(res.mensaje + '. Redirigiendo al login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card" onSubmit={enviar}>
      <h2>Registro</h2>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={cambiar} />
      <input name="email" type="email" placeholder="Correo" value={form.email} onChange={cambiar} />
      <input name="password" type="password" placeholder="Contraseña (mín. 6)" value={form.password} onChange={cambiar} />
      {error && <p className="error">{error}</p>}
      {exito && <p className="exito">{exito}</p>}
      <button type="submit">Registrarse</button>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </form>
  );
}
