import { PomodoroSession, PomodoroSettings } from '../types/pomodoro';

const SETTINGS_KEY = 'pomodoro:settings';
const SESSIONS_KEY = 'pomodoro:sessions';

export const loadSettings = (fallback: PomodoroSettings): PomodoroSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      workDuration: typeof parsed.workDuration === 'number' ? parsed.workDuration : fallback.workDuration,
      shortBreakDuration: typeof parsed.shortBreakDuration === 'number' ? parsed.shortBreakDuration : fallback.shortBreakDuration,
      longBreakDuration: typeof parsed.longBreakDuration === 'number' ? parsed.longBreakDuration : fallback.longBreakDuration,
      longBreakInterval: typeof parsed.longBreakInterval === 'number' ? parsed.longBreakInterval : fallback.longBreakInterval,
    };
  } catch {
    return fallback;
  }
};

export const saveSettings = (settings: PomodoroSettings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore storage errors
  }
};

export const loadSessions = (): PomodoroSession[] => {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Array<{
      id: string;
      type: PomodoroSession['type'];
      duration: number;
      completedAt: string | number;
    }>;
    return parsed.map(s => ({
      ...s,
      completedAt: new Date(s.completedAt),
    }));
  } catch {
    return [];
  }
};

export const saveSessions = (sessions: PomodoroSession[]) => {
  try {
    const serializable = sessions.map(s => ({
      ...s,
      completedAt: s.completedAt instanceof Date ? s.completedAt.toISOString() : s.completedAt,
    }));
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(serializable));
  } catch {
    // ignore storage errors
  }
};
