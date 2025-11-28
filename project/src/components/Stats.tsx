import React from 'react';
import { PomodoroSession } from '../types/pomodoro';
import { Clock, Target, TrendingUp } from 'lucide-react';
import { formatDuration } from '../utils/timeFormat';

interface StatsProps {
  sessions: PomodoroSession[];
  currentSessions: number;
}

export const Stats: React.FC<StatsProps> = ({ sessions, currentSessions }) => {
  const today = new Date().toDateString();
  const todaySessions = sessions.filter(s => s.completedAt.toDateString() === today);
  const workSessions = sessions.filter(s => s.type === 'work');
  const totalWorkTime = workSessions.reduce((acc, s) => acc + s.duration, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <Target className="text-red-600 dark:text-red-400" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Today's Sessions</h3>
        </div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {todaySessions.filter(s => s.type === 'work').length}
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Work sessions completed
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Clock className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Total Focus Time</h3>
        </div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {Math.floor(totalWorkTime / 3600)}h {Math.floor((totalWorkTime % 3600) / 60)}m
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          All time focused
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Current Streak</h3>
        </div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {currentSessions}
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Work sessions in a row
        </p>
      </div>
    </div>
  );
};