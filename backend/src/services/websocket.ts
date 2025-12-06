import { WebSocket, WebSocketServer } from 'ws';
import { WebSocketMessage } from '../types/index.js';

export class WebSocketService {
  private wss: WebSocketServer;
  private clients: Map<string, WebSocket> = new Map();

  constructor(wss: WebSocketServer) {
    this.wss = wss;
    this.setupWebSocket();
  }

  private setupWebSocket() {
    this.wss.on('connection', (ws: WebSocket) => {
      const clientId = this.generateClientId();
      this.clients.set(clientId, ws);

      console.log(`Client connected: ${clientId}`);

      // Send connection confirmation
      this.sendToClient(clientId, {
        type: 'connection',
        data: { clientId, status: 'connected' },
        timestamp: Date.now(),
      });

      ws.on('message', (message: string) => {
        try {
          const data: WebSocketMessage = JSON.parse(message.toString());
          this.handleMessage(clientId, data);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });

      ws.on('close', () => {
        console.log(`Client disconnected: ${clientId}`);
        this.clients.delete(clientId);
      });

      ws.on('error', (error) => {
        console.error(`WebSocket error for ${clientId}:`, error);
      });
    });
  }

  private handleMessage(clientId: string, message: WebSocketMessage) {
    // Broadcast to all other clients
    this.broadcast(message, clientId);
  }

  private sendToClient(clientId: string, message: WebSocketMessage) {
    const client = this.clients.get(clientId);
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  }

  private broadcast(message: WebSocketMessage, excludeClientId?: string) {
    this.clients.forEach((client, clientId) => {
      if (clientId !== excludeClientId && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }

  public broadcastToAll(message: WebSocketMessage) {
    this.broadcast(message);
  }

  private generateClientId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
