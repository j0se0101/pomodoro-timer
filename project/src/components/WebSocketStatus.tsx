import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface WebSocketStatusProps {
  isConnected: boolean;
  messageCount: number;
}

export const WebSocketStatus: React.FC<WebSocketStatusProps> = ({ isConnected, messageCount }) => {
  return (
    <div className="fixed top-6 left-6 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
      {isConnected ? (
        <Wifi size={16} className="text-green-500" />
      ) : (
        <WifiOff size={16} className="text-red-500" />
      )}
      <span className="text-sm text-gray-600 dark:text-gray-300">
        {isConnected ? 'Connected' : 'Disconnected'}
        {messageCount > 0 && ` (${messageCount})`}
      </span>
    </div>
  );
};