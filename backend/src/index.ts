import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import sessionsRouter from './routes/sessions.js';
import settingsRouter from './routes/settings.js';
import { WebSocketService } from './services/websocket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL || '',
  // Render genera URLs como: https://nombre-app.onrender.com
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Permitir requests sin origin (como herramientas de testing)
    if (!origin) return callback(null, true);
    
    // Permitir todos los subdominios de onrender.com en producción
    if (process.env.NODE_ENV === 'production' && origin.includes('.onrender.com')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Pomodoro Timer API',
    version: '1.0.0',
    status: 'running',
    environment: process.env.NODE_ENV,
    endpoints: {
      health: '/health',
      sessions: '/api/sessions',
      settings: '/api/settings',
      websocket: `wss://${req.get('host')}`
    }
  });
});

// API Routes
app.use('/api/sessions', sessionsRouter);
app.use('/api/settings', settingsRouter);

// Start server
const server = app.listen(PORT, () => {
  console.log('\n🚀 Backend server started successfully!\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📍 Server:      http://localhost:${PORT}`);
  console.log(`🏥 Health:      http://localhost:${PORT}/health`);
  console.log(`📊 Sessions:    http://localhost:${PORT}/api/sessions`);
  console.log(`⚙️  Settings:    http://localhost:${PORT}/api/settings`);
  console.log(`🔌 WebSocket:   ws://localhost:${PORT}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('Press Ctrl+C to stop the server\n');
});

// WebSocket setup
const wss = new WebSocketServer({ server });
const wsService = new WebSocketService(wss);

console.log('✅ WebSocket server initialized');
