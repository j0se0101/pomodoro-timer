import React from 'react';
import { formatTime } from '../utils/timeFormat';

interface TimerProps {
  currentTime: number;
  totalTime: number;
  isRunning: boolean;
  type: 'work' | 'shortBreak' | 'longBreak';
}

export const Timer: React.FC<TimerProps> = ({ currentTime, totalTime, isRunning, type }) => {
  const progress = ((totalTime - currentTime) / totalTime) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const typeColors = {
    work: '#FF6B6B',
    shortBreak: '#4ECDC4',
    longBreak: '#45B7D1',
  };

  const typeLabels = {
    work: 'Focus Time',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 250 250">
          {/* Background circle */}
          <circle
            cx="125"
            cy="125"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="125"
            cy="125"
            r="120"
            stroke={typeColors[type]}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-in-out"
            style={{
              filter: isRunning ? 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.4))' : 'none',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold text-gray-800 dark:text-white mb-2">
            {formatTime(currentTime)}
          </div>
          <div 
            className="text-lg font-medium px-4 py-2 rounded-full"
            style={{ 
              backgroundColor: `${typeColors[type]}20`,
              color: typeColors[type]
            }}
          >
            {typeLabels[type]}
          </div>
          {isRunning && (
            <div className="mt-4">
              <div className="animate-pulse w-3 h-3 rounded-full" style={{ backgroundColor: typeColors[type] }}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};