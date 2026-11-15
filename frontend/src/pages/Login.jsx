import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api.js';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(form);
      localStorage.setItem('token', res.token); // guardamos el JWT
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card" onSubmit={enviar}>
      <h2>Iniciar sesión</h2>
      <input name="email" type="email" placeholder="Correo" value={form.email} onChange={cambiar} />
      <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={cambiar} />
      {error && <p className="error">{error}</p>}
      <button type="submit">Entrar</button>
      <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
    </form>
  );
}
