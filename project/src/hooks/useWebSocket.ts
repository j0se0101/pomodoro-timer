import { useState, useEffect, useRef } from 'react';

interface WebSocketMessage {
  type: 'sync' | 'notification' | 'update';
  data: any;
  timestamp: number;
}

export const useWebSocket = (url: string = 'ws://localhost:8080') => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Simulate WebSocket connection for demo purposes
    const simulateConnection = () => {
      setIsConnected(true);
      
      // Simulate periodic sync messages
      const interval = setInterval(() => {
        const message: WebSocketMessage = {
          type: 'sync',
          data: { timestamp: Date.now() },
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev.slice(-9), message]);
      }, 30000); // Every 30 seconds

      return () => {
        clearInterval(interval);
        setIsConnected(false);
      };
    };

    const cleanup = simulateConnection();
    return cleanup;
  }, [url]);

  const sendMessage = (message: Omit<WebSocketMessage, 'timestamp'>) => {
    if (isConnected) {
      const fullMessage: WebSocketMessage = {
        ...message,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev.slice(-9), fullMessage]);
    }
  };

  return {
    isConnected,
    messages,
    sendMessage,
  };
};