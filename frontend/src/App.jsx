import { Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import Registro from './pages/Registro.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';

// Componente que protege rutas: si no hay token, redirige al login
function RutaProtegida({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const navigate = useNavigate();
  useLocation(); // vuelve a dibujar el menú al cambiar de página
  const token = localStorage.getItem('token');

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <nav>
        <strong>Práctica JWT</strong>
        <div>
          {token ? (
            <>
              <Link to="/dashboard">Panel</Link>
              <button onClick={cerrarSesion}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/registro">Registrarse</Link>
            </>
          )}
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <RutaProtegida>
                <Dashboard />
              </RutaProtegida>
            }
          />
        </Routes>
      </main>
    </>
  );
}
