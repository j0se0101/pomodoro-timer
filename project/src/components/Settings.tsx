import React, { useState } from 'react';
import { PomodoroSettings } from '../types/pomodoro';
import { Settings as SettingsIcon, Save, X } from 'lucide-react';

interface SettingsProps {
  settings: PomodoroSettings;
  onUpdateSettings: (settings: PomodoroSettings) => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onUpdateSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleSave = () => {
    onUpdateSettings(tempSettings);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempSettings(settings);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <SettingsIcon size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Work Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={tempSettings.workDuration / 60}
                  onChange={(e) => setTempSettings(prev => ({
                    ...prev,
                    workDuration: parseInt(e.target.value) * 60
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Break Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={tempSettings.shortBreakDuration / 60}
                  onChange={(e) => setTempSettings(prev => ({
                    ...prev,
                    shortBreakDuration: parseInt(e.target.value) * 60
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Long Break Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={tempSettings.longBreakDuration / 60}
                  onChange={(e) => setTempSettings(prev => ({
                    ...prev,
                    longBreakDuration: parseInt(e.target.value) * 60
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Long Break Interval (work sessions)
                </label>
                <input
                  type="number"
                  min="2"
                  max="8"
                  value={tempSettings.longBreakInterval}
                  onChange={(e) => setTempSettings(prev => ({
                    ...prev,
                    longBreakInterval: parseInt(e.target.value)
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};