import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerPerfil, obtenerUsuarios } from '../api.js';

// Página PROTEGIDA: solo se ve con un token válido
export default function Dashboard() {
  const [perfil, setPerfil] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([obtenerPerfil(), obtenerUsuarios()])
      .then(([p, u]) => {
        setPerfil(p);
        setUsuarios(u);
      })
      .catch((err) => {
        // Token inválido o expirado -> se cierra la sesión
        setError(err.message);
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 2000);
      });
  }, [navigate]);

  if (error) return <p className="error card">{error}. Redirigiendo al login...</p>;
  if (!perfil) return <p className="card">Cargando...</p>;

  return (
    <div className="card wide">
      <h2>Bienvenido, {perfil.nombre}</h2>
      <p>Correo: {perfil.email}</p>
      <h3>Usuarios registrados ({usuarios.length})</h3>
      <table>
        <thead>
          <tr><th>Nombre</th><th>Correo</th><th>Fecha de registro</th></tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u._id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{new Date(u.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
