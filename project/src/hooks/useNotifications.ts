import { playNotificationSound, showNotification } from '../utils/notifications';

export type SessionType = 'work' | 'shortBreak' | 'longBreak';

const messages: Record<SessionType, string> = {
  work: 'Great work! Time for a break.',
  shortBreak: 'Break time is over. Ready to focus?',
  longBreak: "Long break finished. Let's get back to work!",
};

export const useNotifications = () => {
  const notifySessionEnd = (type: SessionType) => {
    showNotification(messages[type]);
    playNotificationSound();
  };

  return { notifySessionEnd };
};
