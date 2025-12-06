export interface PomodoroSession {
  id: string;
  user_id?: string;
  type: 'work' | 'shortBreak' | 'longBreak';
  duration: number;
  completed_at: string;
  created_at?: string;
}

export interface PomodoroSettings {
  id?: string;
  user_id?: string;
  work_duration: number;
  short_break_duration: number;
  long_break_duration: number;
  long_break_interval: number;
  updated_at?: string;
}

export interface WebSocketMessage {
  type: 'sync' | 'notification' | 'update' | 'connection';
  data: any;
  timestamp: number;
  userId?: string;
}
