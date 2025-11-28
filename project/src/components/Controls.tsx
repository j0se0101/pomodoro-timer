import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSkip,
}) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={isRunning ? onPause : onStart}
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center gap-3"
      >
        {isRunning ? <Pause size={24} /> : <Play size={24} />}
        {isRunning ? 'Pause' : 'Start'}
      </button>

      <button
        onClick={onReset}
        className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        title="Reset Timer"
      >
        <RotateCcw size={20} />
      </button>

      <button
        onClick={onSkip}
        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        title="Skip Session"
      >
        <SkipForward size={20} />
      </button>
    </div>
  );
};