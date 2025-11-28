import { useState, useEffect, useCallback } from 'react';
import { PomodoroState, PomodoroSettings, PomodoroSession } from '../types/pomodoro';
import { useNotifications } from './useNotifications';
import { loadSettings, saveSettings, loadSessions, saveSessions } from './usePersistence';

const defaultSettings: PomodoroSettings = {
  workDuration: 25 * 60, // 25 minutes
  shortBreakDuration: 5 * 60, // 5 minutes
  longBreakDuration: 15 * 60, // 15 minutes
  longBreakInterval: 4, // Long break after 4 work sessions
};

export const usePomodoro = () => {
  const { notifySessionEnd } = useNotifications();

  const [settings, setSettings] = useState<PomodoroSettings>(() => loadSettings(defaultSettings));
  const [state, setState] = useState<PomodoroState>(() => {
    const persistedSettings = loadSettings(defaultSettings);
    const persistedSessions = loadSessions();
    return {
      currentTime: persistedSettings.workDuration,
      isRunning: false,
      currentType: 'work',
      sessionsCompleted: 0,
      totalSessions: persistedSessions,
    } as PomodoroState;
  });

  const getCurrentDuration = useCallback((type: 'work' | 'shortBreak' | 'longBreak') => {
    switch (type) {
      case 'work': return settings.workDuration;
      case 'shortBreak': return settings.shortBreakDuration;
      case 'longBreak': return settings.longBreakDuration;
    }
  }, [settings]);

  const getNextSessionType = useCallback((workSessionsCompletedAfter: number): 'work' | 'shortBreak' | 'longBreak' => {
    if (state.currentType === 'work') {
      return workSessionsCompletedAfter % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
    }
    return 'work';
  }, [state.currentType, settings.longBreakInterval]);

  const completeSession = useCallback(() => {
    const session: PomodoroSession = {
      id: Date.now().toString(),
      type: state.currentType,
      duration: getCurrentDuration(state.currentType),
      completedAt: new Date(),
    };

    const newSessionsCompleted = state.currentType === 'work' ? state.sessionsCompleted + 1 : state.sessionsCompleted;
    const nextType = getNextSessionType(newSessionsCompleted);
    
    setState(prev => {
      const updatedSessions = [...prev.totalSessions, session];
      // Persist sessions
      saveSessions(updatedSessions);
      return {
        ...prev,
        currentTime: getCurrentDuration(nextType),
        currentType: nextType,
        sessionsCompleted: newSessionsCompleted,
        totalSessions: updatedSessions,
        isRunning: false,
      };
    });

    // Notify user about end of current session
    notifySessionEnd(state.currentType);
  }, [state, getCurrentDuration, getNextSessionType]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.isRunning && state.currentTime > 0) {
      interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          currentTime: prev.currentTime - 1,
        }));
      }, 1000);
    } else if (state.currentTime === 0) {
      completeSession();
    }

    return () => clearInterval(interval);
  }, [state.isRunning, state.currentTime, completeSession]);

  const start = () => setState(prev => ({ ...prev, isRunning: true }));
  
  const pause = () => setState(prev => ({ ...prev, isRunning: false }));
  
  const reset = () => setState(prev => ({
    ...prev,
    currentTime: getCurrentDuration(prev.currentType),
    isRunning: false,
  }));

  const skip = () => {
    completeSession();
  };

  const updateSettings = (newSettings: PomodoroSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
    setState(prev => ({
      ...prev,
      currentTime:
        prev.currentType === 'work'
          ? newSettings.workDuration
          : prev.currentType === 'shortBreak'
          ? newSettings.shortBreakDuration
          : newSettings.longBreakDuration,
      isRunning: false,
    }));
  };

  return {
    state,
    settings,
    start,
    pause,
    reset,
    skip,
    updateSettings,
    getCurrentDuration,
  };
};