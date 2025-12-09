---> Pomodoro Timer

Una aplicación moderna de temporizador Pomodoro con sincronización en tiempo real, persistencia de datos y estadísticas detalladas.




---> Componentes
<div align="center">
  
- Temporizador Pomodoro completo con sesiones de trabajo, descansos cortos y largos
- Sincronización en tiempo real vía WebSocket
- Persistencia local y en base de datos (Supabase)
  <div align="center">
  <img width="100%" max-width="800px" alt="image" src="https://github.com/user-attachments/assets/2a49d595-8861-4142-862b-b31817f733e0" />
  </div>
- Estadísticas detalladas de sesiones completadas
- Notificaciones del navegador y sonidos
  <div align="center">
  <img width="100%" max-width="800px" alt="image" src="https://github.com/user-attachments/assets/8b1d34c2-89d3-43c6-af08-b2ae5c15c5fe" />
  </div>
- Configuración personalizable de duraciones
- Interfaz moderna y responsive con Tailwind CSS
- Modo oscuro automático
  <div align="center">
  <img width="100%" max-width="800px" alt="image" src="https://github.com/user-attachments/assets/9f0a2de8-a8a7-4997-9d66-a552f2e4dcc5" />
  </div>
</div>

---> Stack Tecnológico
<div align="center">
  
Frontend
- React 18.3 - Librería UI
- TypeScript 5.5 - Tipado estático
- Vite 7.1 - Build tool ultrarrápido
- Tailwind CSS 3.4 - Estilos utility-first
- Lucide React - Iconos modernos
- Vitest - Testing framework

Backend
- Node.js 18+ - Runtime
- Express 4.18 - Framework web
- WebSocket (ws) - Comunicación en tiempo real
- Supabase - Base de datos PostgreSQL + Auth
- TzypeScript 5.5 - Tipado estático
- tsx - Ejecución de TypeScript en desarrollo

Base de Datos
- PostgreSQL (vía Supabase)
- Row Level Security (RLS) para seguridad
- Tablas: sessions, settings
</div>

---> Instalación 
<div align="center">
  
Prerrequisitos
- Node.js 18 o superior
- npm o pnpm
- Cuenta de Supabase (gratis)

   Clonar el repositorio
- git clone https://github.com/j0se0101/pomodoro-timer.git
- cd pomodoro-timer

Instalar todas las dependencias
- npm run install:all

Configurar Supabase
- Crea un proyecto en Supabase
- Ve a SQL Editor y ejecuta el archivo supabase-schema.sql
- Obtén tus credenciales en Project Settings > API

Configurar variables de entorno
- Backend (.env)
PORT=3001
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_KEY=tu_service_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

- Frontend (.env)VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key

Ejecutar el proyecto
- Desde la raíz del proyecto:
- npm run dev
</div>






