# Aplicación Full Stack con MongoDB y autenticación JWT

Práctica N.º 4 – Desarrollo Web (UNEMI). Aplicación web con registro e inicio de sesión de usuarios, contraseñas encriptadas y rutas protegidas mediante JSON Web Token (JWT).

## Tecnologías utilizadas
- **Front-End:** React 18 + Vite, React Router
- **Back-End:** Node.js, Express
- **Base de datos:** MongoDB (MongoDB Atlas) con Mongoose
- **Seguridad:** bcryptjs (hash de contraseñas), jsonwebtoken (JWT)

## Funcionalidades implementadas
- Registro de usuarios con validaciones (campos obligatorios, correo único, contraseña de mínimo 6 caracteres).
- Contraseñas guardadas de forma segura (hash con bcrypt, nunca en texto plano).
- Inicio de sesión que genera un JWT con expiración de 1 hora.
- Middleware que valida el token en el back-end.
- Rutas protegidas: perfil del usuario y consulta de usuarios registrados.
- En React: página de panel protegida; sin token redirige al login; token inválido cierra la sesión.
- Cierre de sesión.

## Estructura
```
backend/
  src/index.js            # servidor Express y conexión a MongoDB
  src/models/User.js      # modelo de usuario
  src/routes/auth.js      # registro e inicio de sesión
  src/routes/users.js     # rutas protegidas
  src/middleware/auth.js  # validación del JWT
frontend/
  src/api.js              # consumo de la API REST
  src/App.jsx             # rutas y ruta protegida
  src/pages/              # Registro, Login, Dashboard
```

## Endpoints de la API
| Método | Ruta | Protegida | Descripción |
|---|---|---|---|
| POST | /api/auth/register | No | Registrar usuario |
| POST | /api/auth/login | No | Iniciar sesión y obtener token |
| GET | /api/users/perfil | Sí | Datos del usuario logueado |
| GET | /api/users | Sí | Lista de usuarios registrados |

Las rutas protegidas requieren el encabezado `Authorization: Bearer <token>`.

## Cómo ejecutar
1. Back-end:
   ```bash
   cd backend
   npm install
   # copiar .env.example como .env y completar MONGO_URI y JWT_SECRET
   npm run dev
   ```
2. Front-end (en otra terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Abrir http://localhost:5173
