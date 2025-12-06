# ✅ Checklist Pre-Deploy para Render

Verifica estos puntos antes de hacer deploy:

## 📋 Código

- [ ] ✅ `.gitignore` configurado (sin archivos `.env`)
- [ ] ✅ Todas las dependencias en `package.json`
- [ ] ✅ Scripts de build funcionando localmente
- [ ] ✅ Tests pasando (si aplica)
- [ ] ✅ Código commiteado a GitHub

## 🔑 Credenciales

- [ ] ✅ `SUPABASE_URL` correcta
- [ ] ✅ `SUPABASE_ANON_KEY` correcta (sin "rose")
- [ ] ✅ `SUPABASE_SERVICE_KEY` correcta
- [ ] ✅ Variables de entorno documentadas en `.env.example`

## 🗄️ Base de Datos

- [ ] ✅ Tablas creadas en Supabase (`sessions`, `settings`)
- [ ] ✅ Políticas RLS configuradas
- [ ] ✅ Índices creados
- [ ] ✅ Conexión funcionando localmente

## 🌐 Configuración Backend

- [ ] ✅ CORS configurado para `.onrender.com`
- [ ] ✅ `PORT` como variable de entorno
- [ ] ✅ Health check endpoint (`/health`)
- [ ] ✅ WebSocket funcionando
- [ ] ✅ Manejo de errores implementado

## 🎨 Configuración Frontend

- [ ] ✅ Variables de entorno con prefijo `VITE_`
- [ ] ✅ Build generando carpeta `dist`
- [ ] ✅ URLs dinámicas (no hardcodeadas)
- [ ] ✅ Responsive design verificado

## 🚀 Render

### Backend
- [ ] Root Directory: `backend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm start`
- [ ] Variables de entorno configuradas
- [ ] Health check path: `/health`

### Frontend
- [ ] Root Directory: `project`
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `dist`
- [ ] Variables de entorno configuradas

## 🔄 Después del Deploy

- [ ] ✅ Backend respondiendo en `/health`
- [ ] ✅ Frontend cargando correctamente
- [ ] ✅ WebSocket conectando (🟢 "Connected")
- [ ] ✅ Crear sesión de prueba funciona
- [ ] ✅ Stats mostrando datos
- [ ] ✅ `FRONTEND_URL` actualizada en backend

## 🧪 Tests Finales

```bash
# Backend
curl https://tu-backend.onrender.com/health

# Crear sesión de prueba
curl -X POST https://tu-backend.onrender.com/api/sessions/seed

# Ver sesiones
curl https://tu-backend.onrender.com/api/sessions
```

## ⚠️ Problemas Comunes

1. **Service tarda en despertar**: Normal en plan free (30-50s)
2. **WebSocket desconecta**: El servicio se durmió, espera a que despierte
3. **CORS error**: Verifica `FRONTEND_URL` en backend
4. **Build falla**: Revisa los logs en Render Dashboard

---

**¿Todo listo?** ¡Sigue las instrucciones del README.md para hacer deploy! 🚀
