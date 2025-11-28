export interface PomodoroSession {
  id: string;
  type: 'work' | 'shortBreak' | 'longBreak';
  duration: number;
  completedAt: Date;
}

export interface PomodoroSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
}

export interface PomodoroState {
  currentTime: number;
  isRunning: boolean;
  currentType: 'work' | 'shortBreak' | 'longBreak';
  sessionsCompleted: number;
  totalSessions: PomodoroSession[];
}