// Funciones para consumir la API REST del backend
const API_URL = 'http://localhost:4000/api';

async function peticion(ruta, opciones = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(API_URL + ruta, {
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.mensaje || 'Error en la petición');
  return data;
}

export const registrar = (datos) =>
  peticion('/auth/register', { method: 'POST', body: JSON.stringify(datos) });

export const login = (datos) =>
  peticion('/auth/login', { method: 'POST', body: JSON.stringify(datos) });

export const obtenerPerfil = () => peticion('/users/perfil');

export const obtenerUsuarios = () => peticion('/users');
