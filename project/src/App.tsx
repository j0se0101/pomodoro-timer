import React, { useEffect } from 'react';
import { Timer } from './components/Timer';
import { Controls } from './components/Controls';
import { Stats } from './components/Stats';
import { Settings } from './components/Settings';
import { WebSocketStatus } from './components/WebSocketStatus';
import { usePomodoro } from './hooks/usePomodoro';
import { useWebSocket } from './hooks/useWebSocket';
import { requestNotificationPermission } from './utils/notifications';
import { Atom as Tomato } from 'lucide-react';

function App() {
  const { state, settings, start, pause, reset, skip, updateSettings, getCurrentDuration } = usePomodoro();
  const { isConnected, messages, sendMessage } = useWebSocket();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    // Send WebSocket updates when state changes
    if (isConnected) {
      sendMessage({
        type: 'update',
        data: {
          currentTime: state.currentTime,
          isRunning: state.isRunning,
          currentType: state.currentType,
          sessionsCompleted: state.sessionsCompleted,
        },
      });
    }
  }, [state.currentTime, state.isRunning, state.currentType, state.sessionsCompleted, isConnected, sendMessage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <WebSocketStatus isConnected={isConnected} messageCount={messages.length} />
      <Settings settings={settings} onUpdateSettings={updateSettings} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg">
              <Tomato className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Pomodoro 
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Concéntrate durante 25 minutos y luego tómate un merecido descanso.
          </p>
        </div>

        {/* Main Timer Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
            <div className="flex flex-col items-center gap-8">
              <Timer
                currentTime={state.currentTime}
                totalTime={getCurrentDuration(state.currentType)}
                isRunning={state.isRunning}
                type={state.currentType}
              />
              <Controls
                isRunning={state.isRunning}
                onStart={start}
                onPause={pause}
                onReset={reset}
                onSkip={skip}
              />
            </div>
          </div>

          {/* Stats Section */}
          <Stats sessions={state.totalSessions} currentSessions={state.sessionsCompleted} />
        </div>

        {/* Recent Sessions */}
        {state.totalSessions.length > 0 && (
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Recent Sessions
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {state.totalSessions.slice(-10).reverse().map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: session.type === 'work' ? '#FF6B6B' : 
                                         session.type === 'shortBreak' ? '#4ECDC4' : '#45B7D1'
                        }}
                      />
                      <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {session.type === 'shortBreak' ? 'Short Break' : 
                         session.type === 'longBreak' ? 'Long Break' : 'Work'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {session.completedAt.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;